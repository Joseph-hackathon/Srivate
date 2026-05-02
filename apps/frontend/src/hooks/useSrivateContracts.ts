import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import DistributionPolicyRegistryABI from '../abis/DistributionPolicyRegistry.json';
import TipDistributorABI from '../abis/TipDistributor.json';

// --- HARDCODED ADDRESSES FOR HACKATHON DEMO (BASE SEPOLIA) ---
// Registry: 0xb7C369CDfC0268735597095C8bDf2D29Cd05dD73
// Distributor: 0x686E2f32E323D38200D37791A85d680C3A57BCF4
const REGISTRY_ADDRESS = (import.meta.env.VITE_REGISTRY_ADDRESS || "0xb7C369CDfC0268735597095C8bDf2D29Cd05dD73") as `0x${string}`;
const DISTRIBUTOR_ADDRESS = (import.meta.env.VITE_DISTRIBUTOR_ADDRESS || "0x686E2f32E323D38200D37791A85d680C3A57BCF4") as `0x${string}`;

export function useTipCount() {
    return useReadContract({
        address: DISTRIBUTOR_ADDRESS,
        abi: TipDistributorABI.abi,
        functionName: "tipCount",
        args: []
    });
}

export function usePolicyCount() {
    return useReadContract({
        address: REGISTRY_ADDRESS,
        abi: DistributionPolicyRegistryABI.abi,
        functionName: "policyCount",
        args: []
    });
}

export function useCreatePolicy() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    
    const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const createPolicy = (name: string, recipients: string[], percentages: number[]) => {
        writeContract({
            address: REGISTRY_ADDRESS,
            abi: DistributionPolicyRegistryABI.abi,
            functionName: "createPolicy",
            args: [name, recipients, percentages.map(p => BigInt(p))]
        });
    };

    return { createPolicy, isPending: isPending || isWaiting, hash, error, isSuccess };
}

export function useCreateTip() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    
    const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const createTip = (policyId: string, amount: string, context: string = "Srivate Tip") => {
        // Scale down for demo: 0.15 USD -> 0.00015 ETH
        const demoAmount = (parseFloat(amount) / 1000).toString();
        writeContract({
            address: DISTRIBUTOR_ADDRESS,
            abi: TipDistributorABI.abi,
            functionName: "tipETH",
            args: [BigInt(policyId), context],
            value: parseEther(demoAmount)
        });
    };

    return { createTip, isPending: isPending || isWaiting, hash, error, isSuccess };
}

export function useTipERC20() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const tipERC20 = (token: `0x${string}`, amount: string, decimals: number, policyId: string, context: string = "Srivate ERC20 Tip") => {
        const atomicAmount = BigInt(Math.floor(parseFloat(amount) * 10**decimals));
        writeContract({
            address: DISTRIBUTOR_ADDRESS,
            abi: TipDistributorABI.abi,
            functionName: "tipERC20",
            args: [token, atomicAmount, BigInt(policyId), context]
        });
    };

    return { tipERC20, isPending: isPending || isWaiting, hash, error, isSuccess };
}

export function useClaim() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claim = (token: `0x${string}` = "0x0000000000000000000000000000000000000000") => {
        writeContract({
            address: DISTRIBUTOR_ADDRESS,
            abi: TipDistributorABI.abi,
            functionName: "claim",
            args: [token],
            gas: BigInt(500000), // Manually set gas limit to avoid RPC "exceeds max gas" error on revert
        });
    }

    return { claim, isPending: isPending || isWaiting, hash, error, isSuccess };
}
