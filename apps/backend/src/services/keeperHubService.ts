import axios from "axios";

/**
 * KeeperHub Service
 * Integrated for ETHGlobal Open Agents hackathon.
 * Handles resilient execution of agent-initiated transactions.
 */

const KEEPERHUB_API_URL = process.env.KEEPERHUB_API_URL || "https://api.keeperhub.com";
const KEEPERHUB_API_KEY = process.env.KEEPERHUB_API_KEY;

export interface KeeperHubExecutionResult {
    success: boolean;
    txHash?: string;
    taskId?: string;
    error?: string;
}

/**
 * Executes a transaction using KeeperHub's Execution Layer.
 * Specifically for settling x402 payments via an AI Agent.
 */
export async function executeSettlement(
    to: string,
    amount: string,
    token: string,
    network: string = "base-sepolia"
): Promise<KeeperHubExecutionResult> {
    if (!KEEPERHUB_API_KEY) {
        console.warn("KeeperHub API Key missing, falling back to mock execution");
        return { success: true, txHash: `0xmock_keeperhub_${Date.now()}` };
    }

    try {
        const response = await axios.post(`${KEEPERHUB_API_URL}/api/execute/transfer`, {
            to,
            amount,
            token,
            network
        }, {
            headers: {
                "Authorization": `Bearer ${KEEPERHUB_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        return {
            success: true,
            txHash: response.data.txHash,
            taskId: response.data.taskId
        };
    } catch (error: any) {
        console.error("KeeperHub execution failed:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.message || error.message
        };
    }
}
