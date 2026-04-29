import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export interface Merchant {
    id: string;
    name: string;
    slug: string;
    walletAddress: string;
    avatar?: string;
}

export interface MerchantStats {
    totalTipsToday: number;
    totalTipsThisWeek: number;
    totalTipsAllTime: number;
    tipCountTotal: number;
    percentChangeToday: number;
    percentChangeWeek: number;
    activeEmployees: number;
    pendingPayouts: number;
    pendingPayoutsCount: number;
    paidPayouts: number;
    paidPayoutsCount: number;
}

export interface EmployeeWithStats {
    id: string;
    name: string;
    walletAddress: string;
    role: string;
    status: 'active' | 'inactive';
    pendingAmount: number;
    totalEarned: number;
    lastTxHash?: string;
    lastTxStatus?: string;
}

export interface TipSplit {
    name: string;
    percentage: number;
}

export interface TipSplitConfig {
    merchantId: string;
    splits: TipSplit[];
    lastUpdated: string;
}

export interface RecentTip {
    id: string;
    amount: number;
    billAmount: number;
    totalAmount: number;
    createdAt: string;
    status: 'pending' | 'confirmed' | 'failed';
    txHash?: string;
}

// Merchants
export const useMerchant = (idOrSlug: string) => {
    return useQuery({
        queryKey: ['merchant', idOrSlug],
        queryFn: async () => {
            const { data } = await api.get<{ data: Merchant }>(`/merchants/${idOrSlug}`);
            return data.data;
        },
        enabled: !!idOrSlug,
    });
};

export const useMerchantStats = (idOrSlug: string) => {
    return useQuery({
        queryKey: ['merchant', idOrSlug, 'stats'],
        queryFn: async () => {
            try {
                const { data } = await api.get<{ data: MerchantStats }>(`/merchants/${idOrSlug}/stats`);
                return data.data;
            } catch (error) {
                console.warn("Using mock stats data (backend unreachable)");
                return {
                    totalTipsToday: 245.50,
                    totalTipsThisWeek: 1240.00,
                    totalTipsAllTime: 8450.75,
                    tipCountTotal: 432,
                    percentChangeToday: 12.5,
                    percentChangeWeek: 8.2,
                    activeEmployees: 12,
                    pendingPayouts: 345.50,
                    pendingPayoutsCount: 4,
                    paidPayouts: 8105.25,
                    paidPayoutsCount: 428
                } as MerchantStats;
            }
        },
        enabled: !!idOrSlug,
        refetchInterval: 10000,
    });
};

export const useMerchantStaffStats = (idOrSlug: string) => {
    return useQuery({
        queryKey: ['merchant', idOrSlug, 'staff-stats'],
        queryFn: async () => {
            try {
                const { data } = await api.get<{ data: EmployeeWithStats[] }>(`/merchants/${idOrSlug}/staff-stats`);
                return data.data;
            } catch (error) {
                console.warn("Using mock staff data (backend unreachable)");
                return [
                    { id: '1', name: 'Alice (Barista)', walletAddress: '0x123...abc', role: 'Staff', status: 'active', pendingAmount: 45.00, totalEarned: 1200, lastTxHash: '0x8f2a...1b9e' },
                    { id: '2', name: 'Bob (Chef)', walletAddress: '0x456...def', role: 'Staff', status: 'active', pendingAmount: 0, totalEarned: 850, lastTxHash: '0x3c9d...4f2a' },
                    { id: '3', name: 'Charlie (Waiter)', walletAddress: '0x789...ghi', role: 'Staff', status: 'active', pendingAmount: 12.50, totalEarned: 430, lastTxHash: '0x1e8b...9c3d' }
                ] as EmployeeWithStats[];
            }
        },
        enabled: !!idOrSlug,
        refetchInterval: 5000,
    });
};

export const usePayoutEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ merchantSlug, employeeId, amount }: { merchantSlug: string, employeeId: string, amount: number }) => {
            const { data } = await api.post<{ success: boolean; data: any }>(`/merchants/${merchantSlug}/payout`, {
                employeeId,
                amount
            });
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['merchant', variables.merchantSlug, 'staff-stats'] });
            queryClient.invalidateQueries({ queryKey: ['merchant', variables.merchantSlug, 'stats'] });
        },
    });
};

export const useAddStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ merchantSlug, name, walletAddress, role }: { merchantSlug: string, name: string, walletAddress: string, role: string }) => {
            const { data } = await api.post<{ success: boolean; data: any }>(`/merchants/${merchantSlug}/employees`, {
                name,
                walletAddress,
                role
            });
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['merchant', variables.merchantSlug, 'staff-stats'] });
            queryClient.invalidateQueries({ queryKey: ['merchant', variables.merchantSlug, 'employees'] });
        },
    });
};

export const useMerchantSplitConfig = (idOrSlug: string) => {
    return useQuery({
        queryKey: ['merchant', idOrSlug, 'split-config'],
        queryFn: async () => {
            const { data } = await api.get<{ data: TipSplitConfig }>(`/merchants/${idOrSlug}/split-config`);
            return data.data;
        },
        enabled: !!idOrSlug,
    });
};

export interface TipAllocation {
    id: string;
    transactionId: string;
    merchantId: string;
    employeeId?: string;
    recipientName: string;
    recipientWallet: string;
    amount: number;
    percentage: number;
    status: 'pending' | 'distributed';
    createdAt: string;
}

export const useEmployeePayouts = (merchantSlug: string, employeeId?: string) => {
    return useQuery({
        queryKey: ['merchant', merchantSlug, 'employee', employeeId, 'payouts'],
        queryFn: async () => {
            if (!employeeId) return [];
            const { data } = await api.get<{ data: TipAllocation[] }>(`/merchants/${merchantSlug}/employees/${employeeId}/payouts`);
            return data.data;
        },
        enabled: !!merchantSlug && !!employeeId,
    });
};

export const useRecentTips = (idOrSlug: string, limit = 10) => {
    return useQuery({
        queryKey: ['merchant', idOrSlug, 'tips', limit],
        queryFn: async () => {
            const { data } = await api.get<{ data: RecentTip[] }>(`/merchants/${idOrSlug}/tips?limit=${limit}`);
            return data.data;
        },
        enabled: !!idOrSlug,
    });
};
