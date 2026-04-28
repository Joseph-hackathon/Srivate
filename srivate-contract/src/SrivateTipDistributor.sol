// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SrivatePolicyRegistry.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title SrivateTipDistributor
 * @dev Handles multi-token tipping and automated distribution for the Srivate protocol.
 */
contract SrivateTipDistributor {
    SrivatePolicyRegistry public immutable registry;
    
    // Reentrancy guard state
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    uint256 public tipCount;

    struct Tip {
        address payer;
        address token; // address(0) for ETH
        uint256 amount;
        uint256 policyId;
        string context; // Agentic context/memo
        uint256 timestamp;
    }

    mapping(uint256 => Tip) public tips;
    mapping(address => mapping(address => uint256)) public claimable; // user => token => amount

    event TipCreated(
        uint256 indexed tipId,
        address indexed payer,
        address indexed token,
        uint256 amount,
        uint256 policyId,
        string context
    );

    event Allocation(uint256 indexed tipId, address indexed recipient, uint256 amount);
    event Claimed(address indexed recipient, address indexed token, uint256 amount);

    error TransferFailed();
    error InactivePolicy();
    error InsufficientBalance();
    error Reentrancy();

    modifier nonReentrant() {
        if (_status == _ENTERED) revert Reentrancy();
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    constructor(address _registry) {
        registry = SrivatePolicyRegistry(_registry);
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Create a tip using Native ETH
     */
    function tipETH(uint256 policyId, string calldata context) external payable nonReentrant {
        if (msg.value == 0) revert InsufficientBalance();
        _processTip(msg.sender, address(0), msg.value, policyId, context);
    }

    /**
     * @dev Create a tip using ERC20 tokens (e.g., USDC)
     */
    function tipERC20(address token, uint256 amount, uint256 policyId, string calldata context) external nonReentrant {
        if (amount == 0) revert InsufficientBalance();
        if (!IERC20(token).transferFrom(msg.sender, address(this), amount)) revert TransferFailed();
        _processTip(msg.sender, token, amount, policyId, context);
    }

    function _processTip(
        address payer,
        address token,
        uint256 amount,
        uint256 policyId,
        string memory context
    ) internal {
        (,, address[] memory recipients, uint256[] memory percentages, bool active) = registry.getPolicy(policyId);
        if (!active) revert InactivePolicy();

        uint256 tipId = ++tipCount;
        tips[tipId] = Tip({
            payer: payer,
            token: token,
            amount: amount,
            policyId: policyId,
            context: context,
            timestamp: block.timestamp
        });

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 share = (amount * percentages[i]) / 10000;
            claimable[recipients[i]][token] += share;
            emit Allocation(tipId, recipients[i], share);
        }

        emit TipCreated(tipId, payer, token, amount, policyId, context);
    }

    /**
     * @dev Claim accumulated tips for a specific token
     */
    function claim(address token) external nonReentrant {
        uint256 amount = claimable[msg.sender][token];
        if (amount == 0) revert InsufficientBalance();

        claimable[msg.sender][token] = 0;

        if (token == address(0)) {
            (bool success, ) = msg.sender.call{value: amount}("");
            if (!success) revert TransferFailed();
        } else {
            if (!IERC20(token).transfer(msg.sender, amount)) revert TransferFailed();
        }

        emit Claimed(msg.sender, token, amount);
    }

    receive() external payable {}
}
