import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Star, Car, Wallet, ArrowRight, ShieldCheck, Zap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function UberUseCase() {
  const [mode, setMode] = useState<'rider' | 'driver'>('rider');
  const [tipState, setTipState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const handleTip = () => {
    setTipState('processing');
    setTimeout(() => setTipState('success'), 2000);
  };

  const resetDemo = () => {
    setTipState('idle');
    setSelectedTip(null);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A10] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase font-bold text-[10px] px-3 py-1 mb-6">
            Real-world Integration
          </Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Seamlessly embeds into <br />
            <span className="text-magenta-gradient">consumer apps.</span>
          </motion.h2>
          <p className="text-white/40 font-medium text-lg">
            See how Srivate transforms ride-sharing. Riders tip seamlessly, and drivers receive atomic, 100% trustless payouts via Base L2 without platform delays.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button 
              onClick={() => { setMode('rider'); resetDemo(); }}
              className={`h-12 px-8 rounded-full font-bold transition-all ${mode === 'rider' ? 'bg-white text-black hover:bg-white/90' : 'bg-white/5 text-white/40 hover:text-white'}`}
            >
              Rider App (User)
            </Button>
            <Button 
              onClick={() => { setMode('driver'); resetDemo(); }}
              className={`h-12 px-8 rounded-full font-bold transition-all ${mode === 'driver' ? 'bg-white text-black hover:bg-white/90' : 'bg-white/5 text-white/40 hover:text-white'}`}
            >
              Driver App (Manager)
            </Button>
          </div>
        </div>

        <div className="max-w-md mx-auto relative">
          {/* Mobile Phone Mockup */}
          <div className="relative bg-black rounded-[3rem] border-[8px] border-[#1f1f2e] overflow-hidden shadow-2xl aspect-[9/19] flex flex-col">
            {/* Dynamic Island / Notch area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-[#1f1f2e] rounded-b-3xl z-50" />

            <AnimatePresence mode="wait">
              {mode === 'rider' ? (
                <motion.div 
                  key="rider"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 bg-[#F6F6F6] flex flex-col"
                >
                  {/* Map Header */}
                  <div className="h-2/5 bg-gray-200 relative overflow-hidden flex flex-col justify-end p-6">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=600x300&maptype=roadmap&style=feature:all|element:labels|visibility:off')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F6F6F6] to-transparent" />
                    <div className="relative z-10 text-center">
                       <h3 className="text-3xl font-black text-black">You arrived</h3>
                       <p className="text-black/50 font-medium">124 Central Park West, NY</p>
                    </div>
                  </div>

                  {/* Rider Content */}
                  <div className="flex-1 px-6 pb-6 pt-2 flex flex-col">
                    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between mb-4 border border-black/5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-black/5">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Driver" className="w-10 h-10" />
                        </div>
                        <div>
                          <p className="font-bold text-black text-sm">Michael D.</p>
                          <div className="flex items-center text-xs font-bold text-black/40 gap-1">
                             5.0 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> • Toyota Camry
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-black/40 uppercase">Trip Fare</p>
                        <p className="font-black text-lg text-black">$24.50</p>
                      </div>
                    </div>

                    {/* Srivate Embedded Widget */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-primary/10 flex-1 relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                      
                      {tipState === 'idle' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-black text-black text-lg">Add a tip</h4>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-md text-primary">
                              <Zap className="w-3 h-3" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">Srivate x402</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-black/50 font-medium mb-4 leading-relaxed">
                            100% of your tip goes directly to Michael via <span className="font-bold text-blue-600">Base L2</span>. No platform fees.
                          </p>

                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {[15, 20, 25].map(pct => (
                              <button
                                key={pct}
                                onClick={() => setSelectedTip(pct)}
                                className={`py-3 rounded-xl border text-sm font-bold transition-all ${selectedTip === pct ? 'border-primary bg-primary/5 text-primary' : 'border-black/5 bg-white text-black hover:border-black/20'}`}
                              >
                                {pct}%
                              </button>
                            ))}
                          </div>

                          <Button 
                            className="w-full h-12 bg-black hover:bg-black/80 text-white rounded-xl font-bold mt-auto"
                            disabled={!selectedTip}
                            onClick={handleTip}
                          >
                            Send Trustless Tip
                          </Button>
                        </motion.div>
                      )}

                      {tipState === 'processing' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                           <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-4" />
                           <p className="text-black font-bold mb-1">Settling via Base...</p>
                           <p className="text-[10px] text-black/40 font-bold uppercase">Atomic Distribution</p>
                        </motion.div>
                      )}

                      {tipState === 'success' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                           <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                             <ShieldCheck className="w-7 h-7 text-green-600" />
                           </div>
                           <h4 className="font-black text-black text-xl mb-1">Tip Sent!</h4>
                           <p className="text-xs text-black/50 font-medium mb-6">Michael received funds instantly.</p>
                           
                           <div className="w-full bg-gray-50 rounded-lg p-3 text-left border border-black/5">
                             <div className="flex justify-between items-center mb-2">
                               <span className="text-[10px] font-bold text-black/40 uppercase">Tx Hash</span>
                               <span className="text-[10px] font-mono text-blue-600">0x8f...3a2b</span>
                             </div>
                             <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-black/40 uppercase">Proof</span>
                               <span className="text-[10px] font-mono text-primary flex items-center gap-1">0G Storage <Database className="w-3 h-3" /></span>
                             </div>
                           </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="driver"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 bg-black text-white flex flex-col"
                >
                  {/* Driver Header */}
                  <div className="px-6 pt-12 pb-6 bg-[#111]">
                     <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-bold">Earnings</h3>
                       <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Driver" className="w-8 h-8" />
                       </div>
                     </div>
                     <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">Today's Balance</p>
                     <h2 className="text-5xl font-black tracking-tighter mb-4">$145.50</h2>
                     <div className="flex items-center gap-2">
                       <Badge variant="outline" className="border-green-500/20 text-green-400 bg-green-500/10">
                         + $4.90 from Srivate
                       </Badge>
                     </div>
                  </div>

                  {/* Driver Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h4 className="font-bold text-lg mb-4">Recent Activity</h4>
                    
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="bg-[#111] p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <div className="flex justify-between items-start mb-2 pl-2">
                           <div>
                             <p className="font-bold text-sm">Trip #8482</p>
                             <p className="text-[10px] text-white/40 font-medium">Just now • Central Park West</p>
                           </div>
                           <p className="font-black text-primary">+$29.40</p>
                        </div>
                        <div className="pl-2 pt-3 border-t border-white/5 mt-3 flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/30 uppercase">Fare: $24.50</span>
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded text-primary text-[10px] font-bold uppercase">
                            <Zap className="w-3 h-3" /> Tip: $4.90
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <p className="font-bold text-sm">Trip #8481</p>
                             <p className="text-[10px] text-white/40 font-medium">2 hours ago • Brooklyn</p>
                           </div>
                           <p className="font-bold text-white">+$18.00</p>
                        </div>
                      </div>

                      <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <p className="font-bold text-sm">Trip #8480</p>
                             <p className="text-[10px] text-white/40 font-medium">4 hours ago • Queens</p>
                           </div>
                           <p className="font-bold text-white">+$32.50</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full h-12 mt-4 bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold rounded-xl" onClick={resetDemo}>
                      Refresh Wallet
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Mobile Home Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-50" />
          </div>
        </div>

      </div>
    </section>
  );
}
