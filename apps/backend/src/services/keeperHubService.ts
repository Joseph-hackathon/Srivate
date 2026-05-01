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
        const payload: any = {
            network,
            recipientAddress: to,
            amount,
        };

        if (token && token.startsWith("0x")) {
            payload.tokenAddress = token;
        }

        console.log(`[KeeperHub] Requesting execution for ${amount} to ${to} on ${network}`);

        const response = await axios.post(`${KEEPERHUB_API_URL}/api/execute/transfer`, payload, {
            headers: {
                "Authorization": `Bearer ${KEEPERHUB_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const executionId = response.data.executionId;
        const status = response.data.status;

        console.log(`[KeeperHub] Execution ${executionId} status: ${status}`);

        // If completed or running, fetch the detailed status to get the transactionHash
        let txHash = executionId; // Fallback to executionId if txHash is missing
        try {
            const statusRes = await axios.get(`${KEEPERHUB_API_URL}/api/execute/${executionId}/status`, {
                headers: {
                    "Authorization": `Bearer ${KEEPERHUB_API_KEY}`,
                }
            });
            if (statusRes.data && statusRes.data.transactionHash) {
                txHash = statusRes.data.transactionHash;
            }
        } catch (statusError) {
            console.warn(`[KeeperHub] Could not fetch detailed status for ${executionId}`);
        }

        return {
            success: status === "completed" || status === "running",
            txHash,
            taskId: executionId
        };
    } catch (error: any) {
        console.error("KeeperHub execution failed:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.response?.data?.message || error.message
        };
    }
}
