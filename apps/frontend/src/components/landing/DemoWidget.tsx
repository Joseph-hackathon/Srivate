import { useState, useEffect } from 'react';
import { Coffee, Check, Loader2, Sparkles, ChevronRight, ArrowLeft, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import { useAccount } from "wagmi";
import { toast } from 'sonner';
import { useCreateTip, usePolicyCount, useCreatePolicy } from '@/hooks/useSrivateContracts';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMerchantStaffStats } from '@/hooks/useSrivateApi';

const tipAmounts = [
  { value: 15, label: '15%' },
  { value: 18, label: '18%' },
  { value: 20, label: '20%' },
  { value: 25, label: '25%' },
];

export function DemoWidget({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [step, setStep] = useState<'bill' | 'tip' | 'success'>('bill');
  const [billAmount, setBillAmount] = useState<string>('24.50');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { address: accountAddress } = useAccount();
  const account = accountAddress ? { address: accountAddress } : null;

  // Fetch staff for the demo
  const { data: staffData } = useMerchantStaffStats('demo-cafe');

  const handleNext = async () => {
    if (!billAmount || parseFloat(billAmount) <= 0) return;

    setIsProcessing(true);
    try {
      const { data } = await api.post('/sessions', {
        merchantId: 'demo-cafe',
        billAmount: parseFloat(billAmount),
        currency: 'USDC'
      });

      if (data.success) {
        setSessionId(data.data.session.id);
        setStep('tip');
      } else {
        toast.error("Failed to start session");
      }
    } catch (error) {
      toast.error("Error creating session");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTipAmount = (percentage: number) => {
    const bill = parseFloat(billAmount) || 0;
    return (bill * percentage) / 100;
  };

  const handleSelectTip = (percentage: number) => {
    setSelectedTip(percentage);
  };

  const { data: policyCount, refetch: refetchPolicyCount } = usePolicyCount();
  const { createPolicy, isPending: isPolicyPending, isSuccess: isPolicySuccess } = useCreatePolicy();

  const handleInitPolicy = () => {
    if (!account?.address) {
      toast.error("Please connect your wallet");
      return;
    }
    // Create a demo policy: 50/50 split between manager and a demo address
    createPolicy(
      "Demo Cafe Policy", 
      [account.address, "0x0000000000000000000000000000000000000000"], 
      [50, 50]
    );
  };

  useEffect(() => {
    if (isPolicySuccess) {
      toast.success("Protocol Initialized! Policy ID 1 created.");
      refetchPolicyCount();
    }
  }, [isPolicySuccess]);

  const { createTip, isPending: isTxPending, isSuccess: isTxSuccess, hash: txHash } = useCreateTip();

  const handleConfirmTip = async () => {
    if (selectedTip === null || !sessionId) return;
    if (!account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (policyCount === BigInt(0)) {
       toast.error("Protocol not initialized. Please click the 'Initialize Protocol' button.");
       return;
    }

    const tipAmount = calculateTipAmount(selectedTip).toString();
    
    try {
      // 1. Update the session in backend first
      await api.patch(`/sessions/${sessionId}/tip`, {
        tipPercentage: selectedTip
      });

      // 2. Trigger real on-chain transaction
      // We use policy ID 1 for demo purposes
      createTip("1", tipAmount, `Srivate Tip: ${sessionId}`);
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate transaction");
    }
  };

  // Effect to handle transaction success
  useEffect(() => {
    if (isTxSuccess && step === 'tip' && sessionId) {
      // Once on-chain TX is successful, notify backend to update dashboard immediately
      api.post('/payments/simulate', {
        sessionId,
        payerAddress: account?.address || "0x000000000000000000000000000000000000dEaD",
        employeeId: selectedEmployee // Direct 100% tip to this employee
      }).then(() => {
        setStep('success');
        toast.success("Settlement successful on Base Sepolia!");
      }).catch(err => {
        console.error("Backend confirm error:", err);
        setStep('success'); // proceed anyway since on-chain succeeded
        toast.success("Settlement successful on Base Sepolia!");
      });
    }
  }, [isTxSuccess, step, sessionId, account?.address, selectedEmployee]);

  const isLoading = isProcessing || isTxPending;

  const resetDemo = () => {
    setStep('bill');
    setSelectedTip(null);
    setSelectedEmployee(null);
    setBillAmount('24.50');
    setSessionId(null);
  };

  const content = (
    <div className="max-w-xl mx-auto relative">
      <motion.div
        layout
        className="p-8 md:p-10 rounded-2xl bg-[#0F0F1A] border border-white/5 shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Coffee className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Srivate_Console</h3>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-0.5">Session_Active</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10">
             <Terminal className="w-3 h-3 text-white/20" />
             <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">v2.0</span>
          </div>
        </div>

        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            {step === 'bill' && (
              <motion.div
                key="bill"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Input Amount (USDC)</span>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-white/10">$</span>
                    <Input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="pl-12 h-16 text-2xl font-bold bg-white/[0.02] border-white/5 focus-visible:ring-primary/40 transition-all rounded-xl text-white"
                      placeholder="0.00"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  className="btn-across w-full h-14"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <>Next <ChevronRight className="ml-1 h-5 w-5" /></>}
                </Button>
              </motion.div>
            )}

            {step === 'tip' && (
              <motion.div
                key="tip"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                   <Button
                    variant="ghost"
                    onClick={() => setStep('bill')}
                    disabled={isProcessing}
                    className="text-white/30 hover:text-white uppercase font-bold tracking-widest text-[10px]"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">AI Distribution Active</span>
                  </div>
                </div>

                {/* Operator Selection */}
                <div className="space-y-3">
                   <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-2">Direct Tip (Optional)</span>
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                     <button
                        onClick={() => setSelectedEmployee(null)}
                        className={cn(
                          "whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-colors border",
                          selectedEmployee === null
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                        )}
                     >
                       All Staff (Protocol Split)
                     </button>
                     {staffData?.map((staff) => (
                        <button
                          key={staff.id}
                          onClick={() => setSelectedEmployee(staff.id)}
                          className={cn(
                            "whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-colors border",
                            selectedEmployee === staff.id
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                          )}
                        >
                          {staff.name}
                        </button>
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {tipAmounts.map((tip) => {
                    const amount = calculateTipAmount(tip.value);
                    return (
                      <button
                        key={tip.value}
                        onClick={() => handleSelectTip(tip.value)}
                        disabled={isLoading}
                        className={cn(
                          "p-6 rounded-xl border transition-all duration-300 text-left group",
                          selectedTip === tip.value
                            ? "border-primary bg-primary/10"
                            : "border-white/5 bg-white/[0.01] hover:border-white/10"
                        )}
                      >
                        <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                          {tip.label}
                        </div>
                        <div className="text-white/20 text-sm font-medium">
                          ${amount.toFixed(2)}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Total Due</p>
                    <p className="text-3xl font-black text-white">
                      ${(parseFloat(billAmount || '0') + calculateTipAmount(selectedTip || 0)).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {policyCount === BigInt(0) ? (
                      <Button
                        className="h-14 px-8 bg-secondary hover:bg-secondary/80 text-white font-bold uppercase tracking-widest text-[10px]"
                        onClick={handleInitPolicy}
                        disabled={isPolicyPending}
                      >
                        {isPolicyPending ? <Loader2 className="animate-spin" /> : <><ShieldAlert className="mr-2 h-4 w-4" /> Initialize Protocol</>}
                      </Button>
                    ) : (
                      <Button
                        className="btn-across h-14 px-10"
                        onClick={handleConfirmTip}
                        disabled={!selectedTip || isLoading}
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Settle'}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 glow-magenta">
                   <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Settlement Successful</h3>
                <p className="text-base text-white/30 font-medium mb-6 max-w-xs">
                  The protocol has distributed USDC via Base L2.
                </p>
                {isTxSuccess && txHash && (
                  <a 
                    href={`https://sepolia.basescan.org/tx/${txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold uppercase tracking-widest text-[10px] mb-10 bg-primary/5 px-4 py-2 rounded-lg border border-primary/20"
                  >
                    View on Explorer <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <Button onClick={resetDemo} variant="outline" className="h-12 px-8 rounded-xl border-white/5 text-white hover:bg-white/5">
                  New Session
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  if (isEmbedded) return content;

  return (
    <section className="py-24 relative bg-black/10">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="title-lg mb-4"
          >
            Interactive <br/> <span className="text-magenta-gradient">Terminal.</span>
          </motion.h2>
          <p className="text-base text-white/40 font-medium max-w-lg mx-auto">
            Experience the atomic settlement flow through our demo console.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
