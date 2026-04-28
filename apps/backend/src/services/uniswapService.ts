import axios from "axios";

/**
 * Uniswap Service
 * Integrated for ETHGlobal Open Agents hackathon.
 * Handles intelligent token swapping for flexible tipping settlement.
 */

const UNISWAP_API_URL = process.env.UNISWAP_API_URL || "https://trade-api.gateway.uniswap.org/v1";
const UNISWAP_API_KEY = process.env.UNISWAP_API_KEY;

export interface SwapQuote {
    quote: any;
    transaction: any;
}

/**
 * Gets a swap quote for converting tipped tokens to recipient's preferred token.
 */
export async function getSwapQuote(
    tokenIn: string,
    tokenOut: string,
    amount: string,
    chainId: number = 84532 // Base Sepolia
): Promise<SwapQuote | null> {
    if (!UNISWAP_API_KEY) {
        console.warn("Uniswap API Key missing");
        return null;
    }

    try {
        const response = await axios.get(`${UNISWAP_API_URL}/quote`, {
            params: {
                tokenIn,
                tokenOut,
                amount,
                chainId,
                routing: "universal-router"
            },
            headers: {
                "x-api-key": UNISWAP_API_KEY
            }
        });

        return response.data;
    } catch (error: any) {
        console.error("Uniswap quote failed:", error.response?.data || error.message);
        return null;
    }
}

/**
 * Executes an auto-swap. 
 * In a real scenario, this would use the quote to generate a transaction for the agent to sign.
 */
export async function executeAutoSwap(
    tokenIn: string,
    tokenOut: string,
    amount: string
) {
    console.log(`[Uniswap] Auto-swapping ${amount} from ${tokenIn} to ${tokenOut}`);
    // Simulated swap execution for the hackathon
    // In production, this would call getSwapQuote and then execute via a provider
    return {
        success: true,
        swappedAmount: amount, // Simplified for demo
        txHash: `0xuniswap_swap_${Date.now()}`
    };
}
