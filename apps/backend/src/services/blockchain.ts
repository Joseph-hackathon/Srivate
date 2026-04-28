import { ethers } from "ethers";

const RPC_URL = "https://sepolia.base.org";
const PRIVATE_KEY = process.env.SERVER_WALLET_PRIVATE_KEY!;
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS || "0x7B4BCF6BA16B15BD3EcA2c920F52D1447970C227";
const DISTRIBUTOR_ADDRESS = process.env.DISTRIBUTOR_ADDRESS || "0x6F6325F4f68ADE3faf5B27d8EE20E2fbb0Ddc23E";

if (!PRIVATE_KEY) {
    console.warn("Missing blockchain configuration (SERVER_WALLET_PRIVATE_KEY)");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

// Basic ABI for read-only checks
const SHARED_ABI = [
    "function tipCount() view returns (uint256)",
    "function policyCount() view returns (uint256)"
];

export const distributorContract = new ethers.Contract(DISTRIBUTOR_ADDRESS, SHARED_ABI, provider);
export const registryContract = new ethers.Contract(REGISTRY_ADDRESS, SHARED_ABI, provider);

export const payoutEmployee = async (employeeAddress: string, amount: number) => {
    try {
        console.log(`[Blockchain] Processing payout of $${amount} to ${employeeAddress} on Base`);

        // Real contract call would be:
        // const distributor = new ethers.Contract(DISTRIBUTOR_ADDRESS, ["function distribute(address,uint256)"], wallet);
        // const tx = await distributor.distribute(employeeAddress, ethers.parseUnits(amount.toString(), 6));
        // await tx.wait();

        // Simulated success for demo
        await new Promise(r => setTimeout(r, 2000));

        const mockTxHash = ethers.hexlify(ethers.randomBytes(32));

        return {
            success: true,
            txHash: mockTxHash,
            amount,
            recipient: employeeAddress
        };
    } catch (error: any) {
        console.error("Payout failed:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const getBlockchainStatus = async () => {
    try {
        const address = wallet ? await wallet.getAddress() : "Not Connected";
        return {
            status: "connected",
            walletAddress: address,
            network: "Base Sepolia",
            contracts: {
                distributor: DISTRIBUTOR_ADDRESS,
                registry: REGISTRY_ADDRESS
            }
        };
    } catch (error: any) {
        return {
            status: "error",
            message: error.message
        };
    }
};

export default {
    payoutEmployee,
    getBlockchainStatus
};
