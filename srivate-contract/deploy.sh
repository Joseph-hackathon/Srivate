#!/bin/bash
# Deploy Srivate Contracts to Base Sepolia
# Ensure PRIVATE_KEY is set in your environment
forge script script/Deploy.s.sol:Deploy --rpc-url https://sepolia.base.org --broadcast --verify --etherscan-api-key $BASESCAN_API_KEY -vvvv
