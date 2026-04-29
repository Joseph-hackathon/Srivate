import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Zap, Database, ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';

export function UberUseCase() {
  const [mode, setMode] = useState<'rider' | 'driver'>('rider');
  const [tipState, setTipState] = useState<'rating' | 'tipping' | 'processing' | 'success'>('rating');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const handleTip = () => {
    setTipState('processing');
    setTimeout(() => setTipState('success'), 2000);
  };

  const resetDemo = () => {
    setTipState('rating');
    setSelectedTip(null);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A10] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content (Left) */}
          <div className="text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
            >
              Mobility Use Case: <span className="text-white">Uber</span>
            </motion.h2>
            <p className="text-white/40 font-medium text-lg mb-10 max-w-lg">
              A native integration into the Uber flow. Riders tip seamlessly, and drivers receive 100% atomic payouts instantly via Base L2.
            </p>

            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full max-w-fit border border-white/10">
              <button 
                onClick={() => { setMode('rider'); resetDemo(); }}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${mode === 'rider' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Rider App
              </button>
              <button 
                onClick={() => { setMode('driver'); resetDemo(); }}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${mode === 'driver' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Driver App
              </button>
            </div>
          </div>

          {/* Mobile Mockup (Right) */}
          <div className="max-w-sm mx-auto w-full relative">
          {/* Mobile Phone Mockup */}
          <div className="relative bg-black rounded-[3rem] border-[8px] border-[#1f1f2e] overflow-hidden shadow-2xl aspect-[9/19] flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2">
               <div className="w-2 h-2 rounded-full bg-green-500/50" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>

            <AnimatePresence mode="wait">
              {mode === 'rider' ? (
                <motion.div 
                  key="rider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 bg-[#F6F6F6] flex flex-col relative"
                >
                  {/* Uber Map Background */}
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=15&size=600x800&maptype=roadmap&style=element:labels|visibility:off&style=feature:road|element:geometry|color:0xffffff&style=feature:landscape|element:geometry|color:0xeeeeee')] bg-cover bg-center" />
                  
                  {/* Header */}
                  <div className="absolute top-10 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10 cursor-pointer border border-gray-100">
                    <ArrowLeft className="w-5 h-5 text-black" />
                  </div>

                  {/* Uber Bottom Sheet */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col pb-8 pt-2 px-5"
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  >
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                    {tipState === 'rating' && (
                      <div className="text-center flex flex-col items-center">
                         <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-sm -mt-12 mb-3">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" alt="Driver" />
                         </div>
                         <h3 className="text-2xl font-bold text-black mb-1">How was your ride?</h3>
                         <p className="text-sm text-gray-500 mb-6">Rate Michael</p>
                         
                         <div className="flex gap-2 mb-8">
                           {[1, 2, 3, 4, 5].map((s) => (
                             <Star key={s} className="w-10 h-10 text-gray-200" onClick={() => setTipState('tipping')} />
                           ))}
                         </div>
                      </div>
                    )}

                    {tipState === 'tipping' && (
                      <div className="text-center">
                         <h3 className="text-xl font-bold text-black mb-1">Add a tip for Michael</h3>
                         <p className="text-xs text-gray-500 mb-6 flex items-center justify-center gap-1">
                           Powered by <Zap className="w-3 h-3 text-primary" /> Srivate (100% direct to driver)
                         </p>

                         <div className="grid grid-cols-3 gap-3 mb-6">
                           {[2, 5, 10].map(amt => (
                             <button
                               key={amt}
                               onClick={() => setSelectedTip(amt)}
                               className={`py-4 rounded-xl border-2 text-lg font-bold transition-all ${selectedTip === amt ? 'border-black bg-black text-white' : 'border-gray-100 bg-white text-black hover:border-gray-200'}`}
                             >
                               ${amt}
                             </button>
                           ))}
                         </div>

                         <button 
                           className="w-full py-4 bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors"
                           disabled={!selectedTip}
                           onClick={handleTip}
                         >
                           Done
                         </button>
                      </div>
                    )}

                    {tipState === 'processing' && (
                      <div className="py-10 text-center flex flex-col items-center">
                         <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4" />
                         <p className="text-black font-bold">Processing on Base L2...</p>
                      </div>
                    )}

                    {tipState === 'success' && (
                      <div className="py-6 text-center flex flex-col items-center">
                         <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                         <h3 className="text-xl font-bold text-black mb-2">Tip Sent!</h3>
                         <p className="text-sm text-gray-500 mb-6">Michael received 100% of your tip instantly via Srivate.</p>
                         <div className="bg-gray-50 rounded-xl p-4 w-full text-left">
                           <div className="flex justify-between mb-2">
                             <span className="text-xs text-gray-500 font-medium">Tx Hash</span>
                             <span className="text-xs font-mono text-black font-medium">0x2a9...11b</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-xs text-gray-500 font-medium">Verified by</span>
                             <span className="text-xs font-bold text-black flex items-center gap-1">0G Storage <Database className="w-3 h-3" /></span>
                           </div>
                         </div>
                         <button onClick={resetDemo} className="mt-6 text-sm font-bold text-black underline">Close</button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="driver"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 bg-black text-white flex flex-col relative"
                >
                  {/* Uber Driver Dark Map Background */}
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=600x800&maptype=roadmap&style=element:geometry|color:0x212121&style=element:labels.icon|visibility:off&style=element:labels.text.fill|color:0x757575&style=element:labels.text.stroke|color:0x212121')] bg-cover bg-center opacity-60" />

                  {/* Header Top Earnings */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 z-10 flex flex-col items-center shadow-2xl">
                    <span className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Today</span>
                    <span className="text-2xl font-bold text-white">$145.50</span>
                  </div>

                  {/* Online Go Button */}
                  <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] border-4 border-black text-2xl font-bold cursor-pointer">
                      GO
                    </div>
                  </div>

                  {/* Driver Bottom Menu */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-black border-t border-white/10 z-20 flex items-center justify-between px-8 pb-4">
                     <div className="flex flex-col items-center text-blue-500">
                        <div className="w-6 h-6 rounded border-2 border-blue-500 flex items-center justify-center mb-1"><span className="w-3 h-3 bg-blue-500 rounded-sm"/></div>
                     </div>
                     <div className="flex flex-col items-center opacity-50">
                        <div className="w-6 h-6 mb-1 rounded-full border-2 border-white"/>
                     </div>
                     <div className="flex flex-col items-center opacity-50">
                        <div className="w-6 h-1 mb-1 bg-white rounded-full mt-2"/>
                        <div className="w-6 h-1 bg-white rounded-full mt-1"/>
                     </div>
                  </div>

                  {/* Srivate Notification Popup */}
                  <motion.div 
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, type: "spring", damping: 20 }}
                    className="absolute bottom-28 left-4 right-4 bg-[#111] border border-white/10 rounded-2xl p-4 shadow-2xl z-30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                         <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-base">New Tip Received!</h4>
                        <p className="text-green-400 font-black text-xl mb-1">+$5.00</p>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                          Srivate atomic settlement verified on Base L2. 0% platform fee deducted.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Mobile Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-50" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
