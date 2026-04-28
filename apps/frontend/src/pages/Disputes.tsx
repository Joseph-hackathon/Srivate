import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Eye,
  MessageSquare,
  X,
  ShieldAlert,
  Zap,
  TrendingUp,
  History,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock disputes data
const disputesData = [
  {
    id: 'DSP-001',
    title: 'Tip not received',
    description: 'Customer claims tip was sent but merchant did not receive it.',
    amount: 15.00,
    currency: 'USDC',
    status: 'open',
    createdAt: '2024-01-15',
    from: '0x1234...5678',
    to: '0xabcd...efgh',
    txHash: '0x9876...5432',
    messages: [
      { from: 'customer', message: 'I sent a $15 tip but the merchant says they didnt receive it.', time: '2024-01-15 10:30' },
      { from: 'support', message: 'Were investigating this issue. Please provide the transaction hash.', time: '2024-01-15 11:00' },
    ],
  },
  {
    id: 'DSP-002',
    title: 'Wrong amount charged',
    description: 'Tip amount was higher than what the customer intended.',
    amount: 50.00,
    currency: 'USDC',
    status: 'pending',
    createdAt: '2024-01-14',
    from: '0xfedc...ba98',
    to: '0x1122...3344',
    txHash: '0xaaaa...bbbb',
    messages: [
      { from: 'customer', message: 'I meant to tip $5 but $50 was charged.', time: '2024-01-14 15:20' },
    ],
  },
  {
    id: 'DSP-003',
    title: 'Duplicate transaction',
    description: 'Customer was charged twice for the same tip.',
    amount: 10.00,
    currency: 'AVAX',
    status: 'resolved',
    createdAt: '2024-01-13',
    from: '0x5555...6666',
    to: '0x7777...8888',
    txHash: '0xcccc...dddd',
    resolution: 'Refund issued to customer wallet.',
    messages: [
      { from: 'customer', message: 'I was charged twice for a $10 tip.', time: '2024-01-13 09:00' },
      { from: 'support', message: 'We found the duplicate charge. Processing refund now.', time: '2024-01-13 10:30' },
      { from: 'support', message: 'Refund has been issued. Please check your wallet.', time: '2024-01-13 11:00' },
    ],
  },
];

const statusConfig = {
  open: { label: 'Open_Ticket', color: 'text-primary bg-primary/10 border-primary/20', icon: AlertTriangle, glow: 'glow-magenta' },
  pending: { label: 'In_Review', color: 'text-secondary bg-secondary/10 border-secondary/20', icon: Clock, glow: 'glow-cyan' },
  resolved: { label: 'Resolved', color: 'text-white/40 bg-white/5 border-white/10', icon: CheckCircle, glow: '' },
};

export default function Disputes() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDispute, setSelectedDispute] = useState<typeof disputesData[0] | null>(null);

  const filteredDisputes = disputesData.filter((dispute) => {
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: disputesData.length,
    open: disputesData.filter(d => d.status === 'open').length,
    pending: disputesData.filter(d => d.status === 'pending').length,
    resolved: disputesData.filter(d => d.status === 'resolved').length,
  };

  return (
    <Layout>
      <div className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-[#05050A]">
        {/* Across Mesh Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <ShieldAlert className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Protocol Safety</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="title-lg mb-6"
            >
              DISPUTE <br/> <span className="text-magenta-gradient">RESOLUTION.</span>
            </motion.h1>
            <p className="text-lg text-white/40 font-medium">
              Manage tip dispute cases and monitor settlement integrity. 
              Our protocol ensures every transaction is atomic and verifiable.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'TOTAL_CASES', value: stats.total, icon: History, color: 'text-white/20' },
              { label: 'OPEN_TICKETS', value: stats.open, icon: AlertTriangle, color: 'text-primary' },
              { label: 'IN_REVIEW', value: stats.pending, icon: Clock, color: 'text-secondary' },
              { label: 'RESOLVED', value: stats.resolved, icon: CheckCircle, color: 'text-white/10' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
                   <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Filters (Noir Style) */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search by ID or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-[#0F0F1A] border-white/5 text-white focus-visible:ring-primary rounded-xl font-medium"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-64 h-14 bg-[#0F0F1A] border-white/5 text-white/60 focus:ring-primary rounded-xl font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-3 text-white/20" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#05050A] border-white/5 text-white">
                <SelectItem value="all">ALL_STATUSES</SelectItem>
                <SelectItem value="open">OPEN_ONLY</SelectItem>
                <SelectItem value="pending">IN_REVIEW</SelectItem>
                <SelectItem value="resolved">RESOLVED_ONLY</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Disputes List */}
          <div className="space-y-6">
            {filteredDisputes.length === 0 ? (
              <div className="glass-premium rounded-3xl p-20 text-center border-white/5">
                <ShieldAlert className="h-16 w-16 text-primary/20 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-2 italic tracking-tighter uppercase">No_Cases_Detected.</h3>
                <p className="text-white/30 font-medium max-w-xs mx-auto">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Adjust filters to sync more data.'
                    : 'System integrity is at 100%. No disputes found.'}
                </p>
              </div>
            ) : (
              filteredDisputes.map((dispute, idx) => {
                const status = statusConfig[dispute.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <motion.div 
                    key={dispute.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-premium rounded-2xl border-white/5 hover:border-white/10 transition-all group overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-start gap-6">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border transition-all", status.color, status.glow)}>
                            <StatusIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-[10px] font-bold text-white/20 uppercase tracking-widest">{dispute.id}</span>
                              <Badge variant="outline" className={cn("px-3 py-0.5 font-bold uppercase tracking-widest text-[9px]", status.color)}>
                                {status.label}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{dispute.title}</h3>
                            <p className="text-sm text-white/30 font-medium mt-1 leading-relaxed">{dispute.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">Amount</span>
                                  <span className="text-sm font-black text-white italic tracking-tighter">${dispute.amount.toFixed(2)} {dispute.currency}</span>
                               </div>
                               <div className="flex flex-col border-l border-white/5 pl-6">
                                  <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">Timestamp</span>
                                  <span className="text-sm font-bold text-white/40">{dispute.createdAt}</span>
                               </div>
                               {dispute.messages.length > 0 && (
                                 <div className="flex flex-col border-l border-white/5 pl-6">
                                    <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">Comm_Link</span>
                                    <span className="text-sm font-bold text-primary flex items-center gap-1.5">
                                      <MessageSquare className="h-3.5 w-3.5" />
                                      {dispute.messages.length} Active
                                    </span>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="h-12 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] transition-all"
                          onClick={() => setSelectedDispute(dispute)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Inspect_Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Dispute Detail Modal (Noir Style) */}
        <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#05050A] border-white/5 text-white p-8 rounded-3xl selection:bg-primary/20">
            {selectedDispute && (
              <div className="space-y-8">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs font-bold text-white/20 uppercase tracking-widest">{selectedDispute.id}</span>
                    <Badge 
                      variant="outline" 
                      className={cn("px-4 py-1 font-bold uppercase tracking-widest text-[10px]", statusConfig[selectedDispute.status as keyof typeof statusConfig].color)}
                    >
                      {statusConfig[selectedDispute.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase leading-none">{selectedDispute.title}</DialogTitle>
                  <DialogDescription className="text-white/30 font-medium text-base mt-2">{selectedDispute.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-8">
                  {/* Transaction Details */}
                  <div className="p-6 rounded-2xl bg-[#0F0F1A] border border-white/5">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-6">Settlement_Data</h4>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                      <div>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Atomic_Amount</span>
                        <p className="text-xl font-black text-white italic tracking-tighter">${selectedDispute.amount.toFixed(2)} {selectedDispute.currency}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Cycle_Timestamp</span>
                        <p className="text-lg font-bold text-white/60">{selectedDispute.createdAt}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Origin_Node</span>
                        <p className="font-mono text-[10px] text-secondary truncate">{selectedDispute.from}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Target_Node</span>
                        <p className="font-mono text-[10px] text-secondary truncate">{selectedDispute.to}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Immutable_Hash</span>
                        <a 
                          href={`https://sepolia.basescan.org/tx/${selectedDispute.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-primary break-all hover:underline flex items-center gap-2 group/hash"
                        >
                          {selectedDispute.txHash}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/hash:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Resolution */}
                  {selectedDispute.resolution && (
                    <motion.div 
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 rounded-2xl border border-secondary/20 bg-secondary/5 relative overflow-hidden group cursor-pointer"
                      onClick={() => window.open(`https://sepolia.basescan.org/tx/${selectedDispute.txHash}`, "_blank")}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                         <ExternalLink className="w-12 h-12 text-secondary" />
                      </div>
                      <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        Official_Resolution
                      </h4>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-white font-medium leading-relaxed">{selectedDispute.resolution}</p>
                        <ExternalLink className="h-4 w-4 text-secondary/40 group-hover:text-secondary transition-colors shrink-0" />
                      </div>
                    </motion.div>
                  )}

                  {/* Messages */}
                  {selectedDispute.messages.length > 0 && (
                    <div className="space-y-10 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] shrink-0">Communication_Archive</h4>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <div className="space-y-6">
                        {selectedDispute.messages.map((msg, index) => (
                          <div
                            key={index}
                            className={cn(
                              "p-6 rounded-2xl border transition-all relative",
                              msg.from === 'support' 
                                ? 'bg-primary/5 border-primary/20 ml-12' 
                                : 'bg-white/[0.02] border-white/5 mr-12'
                            )}
                          >
                            {/* Connector Line */}
                            <div className={cn(
                              "absolute top-1/2 -translate-y-1/2 w-6 h-px bg-white/5",
                              msg.from === 'support' ? '-left-6' : '-right-6'
                            )} />
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={cn("w-1.5 h-1.5 rounded-full", msg.from === 'support' ? 'bg-primary' : 'bg-white/20')} />
                                <span className={cn("text-[10px] font-bold uppercase tracking-widest", msg.from === 'support' ? 'text-primary' : 'text-white/40')}>
                                  {msg.from === 'support' ? 'Protocol_Security' : 'Participant_Node'}
                                </span>
                              </div>
                              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">{msg.time}</span>
                            </div>
                            <p className="text-sm text-white/70 font-medium leading-relaxed">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button className="w-full h-14 btn-across uppercase tracking-widest text-xs font-bold" onClick={() => setSelectedDispute(null)}>
                    Archive & Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
