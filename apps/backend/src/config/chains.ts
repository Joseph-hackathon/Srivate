export interface ChainConfig {
    chainId: number;
    networkString: string;
    usdc: string;
    explorer: string;
    rpc: string;
    name: string;
    contracts: {
        registry: string;
        distributor: string;
    };
}

export const baseSepolia: ChainConfig = {
    chainId: 84532,
    networkString: "base-sepolia",
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    explorer: "https://sepolia.basescan.org/",
    rpc: "https://sepolia.base.org",
    name: "Base Sepolia",
    contracts: {
        registry: process.env.REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000",
        distributor: process.env.DISTRIBUTOR_ADDRESS || "0x0000000000000000000000000000000000000000",
    }
}

export const CHAIN_CONFIG: Record<string, ChainConfig> = {
    mainnet: baseSepolia,
    testnet: baseSepolia
};

export type NetworkType = keyof typeof CHAIN_CONFIG;

/**
 * Retrieves the configuration for the blockchain network based on the environment's chain ID.
 */
export function getChainConfig(): ChainConfig {
    return baseSepolia;
}

export const USDC_DECIMALS = 6;

/**
 * Converts a USD amount into atomic units based on a fixed decimal scale.
 * The conversion assumes the USD value is represented in a number format
 * and applies the required scaling using the predefined USDC_DECIMALS constant.
 *
 * @param {number} usdAmount - The amount in USD to be converted into atomic units.
 * @return {bigint} The equivalent value in atomic units as a bigint.
 */
export function usdToAtomicUnits(usdAmount: number): bigint {
    return BigInt(Math.round(usdAmount * 10 ** USDC_DECIMALS));
}


/**
 * Converts a value in atomic units to its USD equivalent.
 *
 * @param atomicUnits - The value in atomic units as a bigint.
 * @return The equivalent value in USD as a number.
 */
export function atomicUnitsToUsd(atomicUnits: bigint): number {
    return Number(atomicUnits) / 10 ** USDC_DECIMALS;
}

/**
 * Formats the given number as a USD currency string.
 *
 * @param {number} amount - The numeric value to format as USD.
 * @return {string} The formatted USD currency string.
 */
export function formatUsdAmount(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}
