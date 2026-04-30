import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Database, GitMerge, Layers, Zap, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProtocolExecutionFlowProps {
  isComplete: boolean;
  txHash?: string;
  lightMode?: boolean;
}

export function ProtocolExecutionFlow({ isComplete, txHash, lightMode = false }: ProtocolExecutionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setCurrentStep(4);
      return;
    }
    
    // Simulate progression of backend tasks while waiting for on-chain tx
    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 2500);
    const timer3 = setTimeout(() => setCurrentStep(3), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isComplete]);

  const steps = [
    { icon: Layers, label: "Executing Srivate Contract on Base L2" },
    { icon: GitMerge, label: "Uniswap V3: Auto-swapping to USDC" },
    { icon: Zap, label: "Hyperlane: Cross-chain Keeper Verification" },
    { icon: Database, label: "0G Storage: Archiving Immutable Proof" }
  ];

  const bgColor = lightMode ? "bg-gray-50 border-gray-200" : "bg-[#0F0F1A] border-white/5";
  const textColor = lightMode ? "text-gray-800" : "text-white";
  const textMuted = lightMode ? "text-gray-400" : "text-white/40";
  const titleColor = lightMode ? "text-gray-500" : "text-white/40";

  return (
    <div className={cn("w-full rounded-2xl p-5 shadow-inner relative overflow-hidden border", bgColor)}>
      {!lightMode && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none" />
        </>
      )}
      
      <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-4 text-left", titleColor)}>Protocol Execution Log</h4>
      
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const isDone = currentStep > idx;
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-start gap-3 transition-all duration-500 text-left ${isActive ? 'opacity-100' : isDone ? 'opacity-80' : 'opacity-30'}`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className={cn("w-4 h-4", lightMode ? "text-green-500" : "text-secondary")} />
                ) : isActive ? (
                  <Loader2 className={cn("w-4 h-4 animate-spin", lightMode ? "text-blue-500" : "text-primary")} />
                ) : (
                  <div className={cn("w-4 h-4 rounded-full border", lightMode ? "border-gray-300" : "border-white/20")} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-xs font-bold truncate", isActive ? textColor : textMuted)}>{step.label}</p>
                {isActive && (
                  <motion.div 
                    initial={{ scaleX: 0 }} 
                    animate={{ scaleX: 1 }} 
                    transition={{ duration: 1.5 }}
                    className={cn("h-0.5 mt-1.5 w-full origin-left", lightMode ? "bg-gradient-to-r from-blue-400 to-transparent" : "bg-gradient-to-r from-primary to-transparent")}
                  />
                )}
                {isDone && idx === 3 && txHash && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <a 
                      href={`https://sepolia.basescan.org/tx/${txHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={cn(
                        "inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded transition-colors",
                        lightMode ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : "text-primary bg-primary/10 hover:bg-primary/20"
                      )}
                    >
                      <Database className="w-3 h-3" /> 0G Proof CID: {txHash.slice(0, 6)}...<ExternalLink className="w-2 h-2 ml-1" />
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
