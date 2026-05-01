import { Indexer, MemData } from "@0gfoundation/0g-ts-sdk";
import { ethers } from "ethers";

/**
 * 0G Storage Service
 * Integrated for ETHGlobal Open Agents hackathon.
 * Archives tip distribution proofs on a decentralized storage layer for transparency.
 */

const ZEROG_RPC_URL = process.env.ZEROG_RPC_URL || "https://evmrpc-testnet.0g.ai";
const ZEROG_INDEXER_URL = process.env.ZEROG_INDEXER_URL || "https://indexer-storage-testnet-turbo.0g.ai";
const SERVER_PRIVATE_KEY = process.env.SERVER_WALLET_ADDRESS; // Assuming this is the private key

/**
 * Uploads a tip distribution proof to 0G Storage.
 * @param data The proof data (JSON)
 */
export async function uploadTipProof(data: any): Promise<{ success: boolean; dataRoot?: string; error?: string }> {
    try {
        if (!SERVER_PRIVATE_KEY) {
            throw new Error("SERVER_WALLET_ADDRESS (Private Key) is missing in .env");
        }

        console.log("[0G] Archiving proof of distribution to real Storage...");
        
        const provider = new ethers.JsonRpcProvider(ZEROG_RPC_URL);
        const signer = new ethers.Wallet(SERVER_PRIVATE_KEY, provider);
        const indexer = new Indexer(ZEROG_INDEXER_URL);

        // Prepare data
        const dataString = JSON.stringify(data);
        const encodedData = new TextEncoder().encode(dataString);
        const memData = new MemData(encodedData);

        // Actual Upload
        const [rootHash, uploadErr] = await indexer.upload(memData, ZEROG_RPC_URL, signer);
        
        if (uploadErr) {
            throw uploadErr;
        }

        console.log(`[0G] Proof archived successfully at ${rootHash}`);
        
        return {
            success: true,
            dataRoot: rootHash
        };
    } catch (error: any) {
        console.error("0G upload failed:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
