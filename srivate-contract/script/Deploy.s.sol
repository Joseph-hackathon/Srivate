// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SrivatePolicyRegistry.sol";
import "../src/SrivateTipDistributor.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        SrivatePolicyRegistry registry = new SrivatePolicyRegistry();
        SrivateTipDistributor distributor = new SrivateTipDistributor(address(registry));

        vm.stopBroadcast();

        console.log("Srivate Policy Registry deployed at:", address(registry));
        console.log("Srivate Tip Distributor deployed at:", address(distributor));
    }
}
