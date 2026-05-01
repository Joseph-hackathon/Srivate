const fs = require('fs');
const solc = require('solc');
const path = require('path');
const { ethers } = require('ethers');

// Base Sepolia config
const RPC_URL = 'https://sepolia.base.org';
const PRIVATE_KEY = process.env.MANAGER_PRIVATE_KEY || 'REPLACE_WITH_NEW_PRIVATE_KEY_HERE';

async function deploy() {
    console.log("Compiling contracts...");
    const contractsDir = path.resolve(__dirname, '../../srivate-contract/src');
    const registrySource = fs.readFileSync(path.join(contractsDir, 'SrivatePolicyRegistry.sol'), 'utf8');
    const distributorSource = fs.readFileSync(path.join(contractsDir, 'SrivateTipDistributor.sol'), 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            'SrivatePolicyRegistry.sol': { content: registrySource },
            'SrivateTipDistributor.sol': { content: distributorSource }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object']
                }
            },
            optimizer: { enabled: true, runs: 200 }
        }
    };

    const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

    if (compiled.errors) {
        let hasError = false;
        compiled.errors.forEach(err => {
            console.error(err.formattedMessage);
            if (err.severity === 'error') hasError = true;
        });
        if (hasError) {
            console.error("Compilation failed.");
            process.exit(1);
        }
    }

    console.log("Compilation successful!");

    const registryContract = compiled.contracts['SrivatePolicyRegistry.sol'].SrivatePolicyRegistry;
    const distributorContract = compiled.contracts['SrivateTipDistributor.sol'].SrivateTipDistributor;

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Deploying from address:", wallet.address);

    const RegistryFactory = new ethers.ContractFactory(registryContract.abi, registryContract.evm.bytecode.object, wallet);
    console.log("Deploying SrivatePolicyRegistry...");
    const registry = await RegistryFactory.deploy();
    await registry.waitForDeployment();
    const registryAddress = await registry.getAddress();
    console.log("Registry deployed to:", registryAddress);

    const DistributorFactory = new ethers.ContractFactory(distributorContract.abi, distributorContract.evm.bytecode.object, wallet);
    console.log("Deploying SrivateTipDistributor...");
    const distributor = await DistributorFactory.deploy(registryAddress);
    await distributor.waitForDeployment();
    const distributorAddress = await distributor.getAddress();
    console.log("Distributor deployed to:", distributorAddress);

    console.log("=== DEPLOYMENT COMPLETE ===");
    console.log(`REGISTRY_ADDRESS = "${registryAddress}"`);
    console.log(`DISTRIBUTOR_ADDRESS = "${distributorAddress}"`);
}

deploy().catch(console.error);
