import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Banknote,
  Clock,
  FileText,
  Users,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useMerchantStats, useMerchantStaffStats, useAddStaff, usePayoutEmployee } from '@/hooks/useSrivateApi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Hardcoded for demo/MVP
const DEMO_MERCHANT_SLUG = 'demo-cafe';

export function ManagerDashboard() {
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffAddress, setNewStaffAddress] = useState('');

  const { data: stats, isLoading: isStatsLoading } = useMerchantStats(DEMO_MERCHANT_SLUG);
  const { data: staffList, isLoading: isStaffLoading } = useMerchantStaffStats(DEMO_MERCHANT_SLUG);

  const addStaffMutation = useAddStaff();
  const payoutMutation = usePayoutEmployee();

  const handleAddStaff = () => {
    if (!newStaffName || !newStaffAddress) return;

    addStaffMutation.mutate({
      merchantSlug: DEMO_MERCHANT_SLUG,
      name: newStaffName,
      walletAddress: newStaffAddress,
      role: "Staff" // Default role
    }, {
      onSuccess: () => {
        setIsAddStaffOpen(false);
        setNewStaffName('');
        setNewStaffAddress('');
        toast.success("Staff added successfully");
      },
      onError: () => {
        toast.error("Failed to add staff");
      }
    });
  };

  const handlePayout = (employeeId: string, amount: number) => {
    payoutMutation.mutate({
      merchantSlug: DEMO_MERCHANT_SLUG,
      employeeId,
      amount
    }, {
      onSuccess: (data) => {
        toast.success(`Payout of $${amount} initiated! Tx: ${data.data.txHash.slice(0, 10)}...`);
      },
      onError: () => {
        toast.error("Payout failed");
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Stats Row (Across Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'DAILY_TIPS', value: stats ? `$${stats.totalTipsToday.toLocaleString()}` : '-', sub: stats?.percentChangeToday ? `+${stats.percentChangeToday}%` : null, icon: TrendingUp, color: 'text-primary' },
          { label: 'WEEKLY_VOLUME', value: stats ? `$${stats.totalTipsThisWeek.toLocaleString()}` : '-', sub: stats?.percentChangeWeek ? `${stats.percentChangeWeek > 0 ? '+' : ''}${stats.percentChangeWeek}%` : null, icon: Zap, color: 'text-secondary' },
          { label: 'ALL_TIME_EARNED', value: stats ? `$${stats.totalTipsAllTime.toLocaleString()}` : '-', sub: null, icon: CreditCard, color: 'text-primary' },
          { label: 'ACTIVE_STAFF', value: stats ? stats.activeEmployees : '-', sub: null, icon: Users, color: 'text-white/20' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
               <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              {isStatsLoading ? (
                <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg" />
              ) : (
                <div className="flex items-end gap-3">
                   <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none">{stat.value}</h3>
                   {stat.sub && <span className="text-[10px] font-bold text-secondary pb-1">{stat.sub}</span>}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Staff Payout Status (Across Style) */}
      <div className="glass-premium rounded-3xl p-8 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent pointer-events-none" />
        
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight italic uppercase">Settlement_Overview.</h3>
            <p className="text-xs text-white/20 font-bold uppercase tracking-widest mt-1">Real-time distribution metrics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
             <div className="w-1.5 h-1.5 rounded-full bg-secondary glow-cyan" />
             <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">L2_Synced</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Payouts Bar */}
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                 <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Pending_Settlement</p>
                <p className="text-base font-bold text-white">{stats?.pendingPayoutsCount || 0} Nodes_Active</p>
              </div>
            </div>
            <p className="text-2xl font-black text-primary italic tracking-tighter">${stats?.pendingPayouts.toLocaleString() || '0'}</p>
          </div>

          {/* Paid Out Bar */}
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-between group hover:border-secondary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                 <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Distributed_Total</p>
                <p className="text-base font-bold text-white">{stats?.paidPayoutsCount || 0} Cycles_Complete</p>
              </div>
            </div>
            <p className="text-2xl font-black text-secondary italic tracking-tighter">${stats?.paidPayouts.toLocaleString() || '0'}</p>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight italic uppercase">Operator_Fleet.</h3>
            <p className="text-xs text-white/20 font-bold uppercase tracking-widest mt-1">Authorized protocol participants</p>
          </div>

          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="btn-across h-12 px-8">
                <Plus className="mr-2 w-4 h-4" /> Add Operator
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#05050A] border-white/5 text-white sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold italic uppercase">Authorize_New</DialogTitle>
                <DialogDescription className="text-white/30 text-xs uppercase font-bold tracking-widest">
                  Deploy a new agent operator to the fleet.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Operator Name</Label>
                  <Input
                    id="name"
                    placeholder="Fleet ID / Name"
                    className="h-12 bg-white/[0.02] border-white/5 text-white focus-visible:ring-primary rounded-xl"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallet" className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Target Address</Label>
                  <Input
                    id="wallet"
                    placeholder="0x..."
                    className="h-12 bg-white/[0.02] border-white/5 text-white focus-visible:ring-primary rounded-xl"
                    value={newStaffAddress}
                    onChange={(e) => setNewStaffAddress(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="btn-across w-full h-12"
                  onClick={handleAddStaff}
                  disabled={addStaffMutation.isPending}
                >
                  {addStaffMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Confirm Authorization
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-[#0F0F1A] rounded-2xl border border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20 py-4">OPERATOR</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20">PENDING</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20">LAST_TX</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-white/20">STATUS</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-white/20 pr-8">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isStaffLoading ? (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell colSpan={5} className="text-center py-12 text-white/10 uppercase font-black italic tracking-widest">
                    Synchronizing_Fleet_Data...
                  </TableCell>
                </TableRow>
              ) : staffList?.length === 0 ? (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell colSpan={5} className="text-center py-12 text-white/10 uppercase font-black italic tracking-widest">
                    Zero_Nodes_Detected.
                  </TableCell>
                </TableRow>
              ) : (
                staffList?.map((staff) => (
                  <TableRow key={staff.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group">
                    <TableCell className="font-bold text-white py-6">{staff.name}</TableCell>
                    <TableCell className="text-white font-mono tracking-tighter text-lg">${staff.pendingAmount.toFixed(2)}</TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {staff.lastTxHash ? (
                        <a 
                          href={`https://sepolia.basescan.org/tx/${staff.lastTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-secondary hover:text-secondary/80 hover:underline transition-all group/link"
                        >
                          {`${staff.lastTxHash.slice(0, 6)}...${staff.lastTxHash.slice(-4)}`}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <span className="text-white/10">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {staff.pendingAmount > 0 ? (
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-primary glow-magenta" />
                           <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Awaiting</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-secondary glow-cyan" />
                           <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Complete</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button
                        size="sm"
                        className={cn(
                          "h-10 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                          staff.pendingAmount > 0 
                            ? "bg-white text-black hover:bg-primary hover:text-white"
                            : "bg-white/5 text-white/10 cursor-not-allowed border border-white/5"
                        )}
                        disabled={staff.pendingAmount <= 0 || payoutMutation.isPending}
                        onClick={() => handlePayout(staff.id, staff.pendingAmount)}
                      >
                        {payoutMutation.isPending && payoutMutation.variables?.employeeId === staff.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          "Execute_Payout"
                        )}
                      </Button>
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
