import { getChainConfig } from "./chains";

export function createPaymentRequirements(
    sessionId: string,
    amount: number,
    merchantAddress: string,
    description: string = "Srivate Protocol Tip Payment"
): object {
    const chainConfig = getChainConfig();

    return {
        x402Version: 1,
        scheme: "exact",
        network: chainConfig.networkString,
        maxAmountRequired: (amount * 1e6).toString(),
        resource: `/api/payments/settle/${sessionId}`,
        description,
        mimeType: "application/json",
        payTo: merchantAddress,
        maxTimeoutSeconds: 300,
        asset: chainConfig.usdc,
        extra: {
            name: "USD Coin",
            version: "2",
            chainId: chainConfig.chainId,
        },
    };
}

export class MockFacilitator {
    async supported(options?: any): Promise<any> {
        return {
            schemes: ["exact"],
            networks: ["base-sepolia"],
            tokens: [
                {
                    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
                    symbol: "USDC",
                    decimals: 6,
                    chainId: 84532,
                },
            ]
        };
    }
    
    async verify(paymentPayload: string, _paymentRequirements: object): Promise<{ isValid: boolean; invalidReason?: string }> {
        return { isValid: true };
    }
    async settle(paymentPayload: string, _paymentRequirements: object): Promise<{ success: boolean; txHash?: string; networkId?: string; error?: string }> {
        const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
        return { success: true, txHash: mockTxHash, networkId: "base-sepolia" };
    }
}

let _facilitatorInstance: MockFacilitator | null = null;

export function getFacilitator(): MockFacilitator {
    if (!_facilitatorInstance) {
        _facilitatorInstance = new MockFacilitator();
    }
    return _facilitatorInstance;
}
