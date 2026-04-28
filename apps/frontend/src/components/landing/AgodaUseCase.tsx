import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Zap, Database, ArrowLeft, Heart, Share, CheckCircle2 } from 'lucide-react';

export function AgodaUseCase() {
  const [tipState, setTipState] = useState<'rating' | 'tipping' | 'processing' | 'success'>('rating');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const handleTip = () => {
    setTipState('processing');
    setTimeout(() => setTipState('success'), 2500);
  };

  const resetDemo = () => {
    setTipState('rating');
    setSelectedTip(null);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A10] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Hospitality Use Case: <span className="text-[#5392F9]">Agoda</span>
          </motion.h2>
          <p className="text-white/40 font-medium text-lg mb-10">
            A native integration into hotel booking apps. Guests can tip housekeeping staff directly. Srivate ensures trustless distribution, completely bypassing hotel management.
          </p>

          <div className="flex items-center justify-center gap-2 bg-white/5 p-1.5 rounded-full max-w-fit mx-auto border border-white/10">
            <button 
              onClick={resetDemo}
              className="px-6 py-2.5 rounded-full font-bold text-sm bg-white text-black transition-all"
            >
              Guest App (Review Flow)
            </button>
          </div>
        </div>

        <div className="max-w-sm mx-auto relative">
          {/* Mobile Phone Mockup */}
          <div className="relative bg-white rounded-[3rem] border-[8px] border-[#1f1f2e] overflow-hidden shadow-2xl aspect-[9/19] flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2">
               <div className="w-2 h-2 rounded-full bg-green-500/50" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>

            {/* Agoda App Content */}
            <div className="flex-1 bg-gray-50 flex flex-col relative overflow-y-auto custom-scrollbar pb-10">
                {/* Header Image */}
                <div className="relative h-64 bg-[url('https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
                   <div className="absolute top-10 left-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
                      <ArrowLeft className="w-5 h-5 text-white" />
                   </div>
                   <div className="absolute top-10 right-4 flex gap-2">
                      <div className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Share className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                   </div>
                </div>

                <div className="bg-white -mt-6 rounded-t-3xl relative z-10 p-6 flex flex-col gap-6 shadow-sm">
                   {/* Hotel Info */}
                   <div>
                     <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" />
                     </div>
                     <h1 className="text-2xl font-bold text-[#333]">Le Meurice, Paris</h1>
                     <p className="text-sm text-gray-500 mt-1">228 Rue de Rivoli, 1st arr., Paris, France</p>
                     
                     <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-800 font-bold">Booking Completed</p>
                          <p className="text-[10px] text-blue-600">Oct 12 - Oct 15 • Room 402</p>
                        </div>
                        <div className="text-[#5392F9] bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          9.2 Superb
                        </div>
                     </div>
                   </div>

                   {/* Review / Tipping Section */}
                   <AnimatePresence mode="wait">
                     {tipState === 'rating' && (
                       <motion.div 
                         key="rating"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="border border-gray-200 rounded-2xl p-5 text-center"
                       >
                          <h3 className="text-lg font-bold text-[#333] mb-2">How was your stay?</h3>
                          <p className="text-xs text-gray-500 mb-4">Your review helps other travelers.</p>
                          <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-8 h-8 text-gray-200 cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => setTipState('tipping')} />
                            ))}
                          </div>
                       </motion.div>
                     )}

                     {tipState === 'tipping' && (
                       <motion.div 
                         key="tipping"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="bg-[#F9FAFC] border border-[#E5E9F2] rounded-2xl p-5 text-center relative overflow-hidden"
                       >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5392F9] to-primary" />
                          <h3 className="text-lg font-bold text-[#333] mb-2">Tip the Housekeeping?</h3>
                          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            Loved the clean room? Leave a tip for Maria (Room 402 Staff). <br/>
                            <span className="text-primary font-bold">Srivate ensures 100% goes to her directly.</span>
                          </p>

                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {[5, 10, 20].map(amt => (
                              <button
                                key={amt}
                                onClick={() => setSelectedTip(amt)}
                                className={`py-3 rounded-xl border font-bold transition-all ${selectedTip === amt ? 'border-[#5392F9] bg-[#5392F9]/10 text-[#5392F9]' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
                              >
                                €{amt}
                              </button>
                            ))}
                          </div>

                          <button 
                            className="w-full py-3.5 bg-[#5392F9] disabled:bg-gray-300 text-white rounded-xl font-bold transition-colors shadow-md shadow-blue-500/20"
                            disabled={!selectedTip}
                            onClick={handleTip}
                          >
                            Send Secure Tip
                          </button>
                       </motion.div>
                     )}

                     {tipState === 'processing' && (
                       <motion.div 
                         key="processing"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="border border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center"
                       >
                          <div className="w-10 h-10 border-4 border-gray-100 border-t-[#5392F9] rounded-full animate-spin mb-4" />
                          <p className="text-[#333] font-bold text-sm">Bypassing hotel management...</p>
                          <p className="text-[10px] text-gray-400 mt-1">Executing smart contract on Base L2</p>
                       </motion.div>
                     )}

                     {tipState === 'success' && (
                       <motion.div 
                         key="success"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="border border-green-200 bg-green-50/50 rounded-2xl p-6 text-center flex flex-col items-center"
                       >
                          <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                          <h3 className="text-lg font-bold text-green-800 mb-1">Tip Delivered!</h3>
                          <p className="text-xs text-green-600/80 mb-4">Maria's wallet received €{selectedTip} instantly.</p>
                          
                          <div className="w-full bg-white rounded-lg p-3 text-left border border-green-100">
                             <div className="flex justify-between items-center mb-1.5">
                               <span className="text-[10px] font-bold text-gray-400 uppercase">Settlement</span>
                               <span className="text-[10px] font-bold text-blue-600">Base L2</span>
                             </div>
                             <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-gray-400 uppercase">Proof Log</span>
                               <span className="text-[10px] font-bold text-primary flex items-center gap-1">0G Storage <Database className="w-3 h-3" /></span>
                             </div>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
            </div>
            
            {/* Mobile Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
