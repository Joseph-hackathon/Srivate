import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, CheckCircle2, Clock, AlertTriangle, Cpu, TrendingUp } from 'lucide-react';
import { useMerchantStaffStats, useEmployeePayouts } from '@/hooks/useSrivateApi';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useClaim } from '@/hooks/useSrivateContracts';
import { Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface EmployeePortalProps {
  walletAddress?: string;
}

// Hardcoded for demo
const DEMO_MERCHANT_SLUG = 'demo-cafe';

export function EmployeePortal({ walletAddress }: EmployeePortalProps) {
  const { data: staffList, isLoading: isStaffLoading } = useMerchantStaffStats(DEMO_MERCHANT_SLUG);

  // Find current employee based on connected wallet
  const currentEmployee = staffList?.find(
    e => e.walletAddress.toLowerCase() === walletAddress?.toLowerCase()
  );

  const { data: payouts, isLoading: isPayoutsLoading } = useEmployeePayouts(
    DEMO_MERCHANT_SLUG,
    currentEmployee?.id
  );

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : 'Not Connected';

  if (!walletAddress) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-16 text-center border border-white/5 rounded-3xl bg-[#0F0F1A] shadow-2xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
           <Wallet className="h-8 w-8 text-white/20" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 uppercase italic tracking-tighter">Gateway_Locked.</h3>
        <p className="text-white/30 font-medium">Please connect your authorized wallet to sync node data.</p>
      </motion.div>
    );
  }

  if (isStaffLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center text-white/20">
        <div className="animate-spin h-10 w-10 border-2 border-primary/20 border-t-primary rounded-full mb-6" />
        <p className="text-xs font-bold uppercase tracking-[0.3em]">Synchronizing_Profile...</p>
      </div>
    );
  }

  if (!currentEmployee) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-16 text-center border border-white/5 rounded-3xl bg-[#0F0F1A] shadow-2xl"
      >
        <AlertTriangle className="h-12 w-12 mb-6 text-primary glow-magenta" />
        <h3 className="text-2xl font-bold text-white mb-4 uppercase italic tracking-tighter">Unauthorized_Node.</h3>
        <p className="max-w-md mx-auto text-white/30 font-medium leading-relaxed">
          The address <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded mx-1">{shortAddress}</span> is not registered in this fleet.
          <br /><br />
          Contact your system administrator to authorize this terminal.
        </p>
      </motion.div>
    );
  }

  const { claim, isPending: isClaimPending, isSuccess: isClaimSuccess, hash: txHash } = useClaim();

  useEffect(() => {
    if (isClaimSuccess && txHash) {
      toast.success("Funds successfully claimed on Base Sepolia!", {
        description: "View the atomic payout proof on explorer.",
        action: {
          label: "View Transaction",
          onClick: () => window.open(`https://sepolia.basescan.org/tx/${txHash}`, "_blank")
        }
      });
    }
  }, [isClaimSuccess, txHash]);

  const handleClaim = () => {
    if (currentEmployee.pendingAmount <= 0) {
      toast.error("No funds available to claim");
      return;
    }
    // Claim native ETH
    claim("0x0000000000000000000000000000000000000000");
  };

  return (
    <div className="space-y-8">
      {/* Header / Profile Card (Across Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl bg-[#0F0F1A] border border-white/5 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <Cpu className="w-8 h-8 text-white/20" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{currentEmployee.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{currentEmployee.role}</span>
                 <div className="w-1 h-1 rounded-full bg-white/10" />
                 <span className="text-[10px] font-mono text-white/20 tracking-tighter">ID: {currentEmployee.id.slice(0, 12)}</span>
              </div>
           </div>
        </div>
        <Badge className={cn(
          "px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[9px]",
          currentEmployee.status === 'active' ? 'bg-secondary text-black glow-cyan' : 'bg-primary text-white glow-magenta'
        )}>
          {currentEmployee.status === 'active' ? 'Node_Online' : 'Node_Offline'}
        </Badge>
      </motion.div>

      {/* Earnings Overview Card (Across Inspired) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-premium rounded-3xl p-10 relative overflow-hidden border-white/5"
      >
        {/* Mesh Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/5 rounded-full blur-[80px] -ml-30 -mb-30" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                 <TrendingUp className="h-4 w-4 text-white/40" />
              </div>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Lifecycle_Earnings</span>
            </div>
            <div className="flex items-end gap-12">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Awaiting_Settlement</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">
                  ${currentEmployee.pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <Button 
                onClick={handleClaim}
                disabled={currentEmployee.pendingAmount <= 0 || isClaimPending}
                className={cn(
                  "h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                  currentEmployee.pendingAmount > 0 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {isClaimPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Claim_All_Funds"}
              </Button>
            </div>
          </div>

          <div className="text-right w-full md:w-auto">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Payout_Terminal: {shortAddress}</p>
            <div className="flex flex-col items-end">
              <span className="text-7xl font-black text-white italic tracking-tighter leading-none mb-2">
                ${currentEmployee.totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                 <CheckCircle2 className="w-3 h-3 text-secondary" />
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Total_Distributed</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payout History (Across Style Table) */}
      <div className="space-y-6 pt-6">
        <div>
          <h3 className="text-2xl font-bold text-white italic tracking-tighter uppercase">Transfer_Log.</h3>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Verified settlement history</p>
        </div>

        <div className="bg-[#0F0F1A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20 py-4 pl-8">TIMESTAMP</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20">MERCHANT</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20">NET_PAYOUT</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-white/20 pr-8">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPayoutsLoading ? (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-12 text-white/10 uppercase font-black italic tracking-widest">
                    Retrieving_History...
                  </TableCell>
                </TableRow>
              ) : !payouts || payouts.length === 0 ? (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-12 text-white/10 uppercase font-black italic tracking-widest">
                    Zero_Transfers_Recorded.
                  </TableCell>
                </TableRow>
              ) : (
                payouts.map((payout, idx) => (
                  <TableRow key={payout.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group">
                    <TableCell className="font-bold text-white py-6 pl-8">
                      {new Date(payout.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-white/40 font-medium">Srivate_Demo_Cafe</TableCell>
                    <TableCell className={cn(
                      "font-mono text-lg tracking-tighter",
                      payout.status === 'pending' ? 'text-primary' : 'text-secondary'
                    )}>
                      ${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      {payout.status === 'pending' ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                          <Clock className="h-3.5 w-3.5" />
                          Pending
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Complete
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
