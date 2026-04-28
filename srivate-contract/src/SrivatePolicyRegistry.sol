// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SrivatePolicyRegistry
 * @dev Manages tipping distribution policies for merchants and AI agents.
 */
contract SrivatePolicyRegistry {
    struct Policy {
        string name;
        address manager;
        address[] recipients;
        uint256[] percentages; // Basis points (100 = 1%)
        bool active;
        uint256 createdAt;
    }

    uint256 public policyCount;
    mapping(uint256 => Policy) public policies;

    event PolicyCreated(uint256 indexed policyId, string name, address indexed manager);
    event PolicyStatusChanged(uint256 indexed policyId, bool active);

    error InvalidParameters();
    error Unauthorized();
    error PolicyNotFound();

    function createPolicy(
        string calldata name,
        address[] calldata recipients,
        uint256[] calldata percentages
    ) external returns (uint256 policyId) {
        if (recipients.length == 0 || recipients.length != percentages.length) {
            revert InvalidParameters();
        }

        uint256 total;
        for (uint256 i = 0; i < percentages.length; i++) {
            total += percentages[i];
        }
        if (total != 10000) revert InvalidParameters();

        policyId = ++policyCount;
        policies[policyId] = Policy({
            name: name,
            manager: msg.sender,
            recipients: recipients,
            percentages: percentages,
            active: true,
            createdAt: block.timestamp
        });

        emit PolicyCreated(policyId, name, msg.sender);
    }

    function togglePolicy(uint256 policyId) external {
        Policy storage policy = policies[policyId];
        if (policy.manager == address(0)) revert PolicyNotFound();
        if (msg.sender != policy.manager) revert Unauthorized();
        
        policy.active = !policy.active;
        emit PolicyStatusChanged(policyId, policy.active);
    }

    function getPolicy(uint256 policyId) external view returns (
        string memory name,
        address manager,
        address[] memory recipients,
        uint256[] memory percentages,
        bool active
    ) {
        Policy storage policy = policies[policyId];
        if (policy.manager == address(0)) revert PolicyNotFound();
        return (
            policy.name,
            policy.manager,
            policy.recipients,
            policy.percentages,
            policy.active
        );
    }
}
