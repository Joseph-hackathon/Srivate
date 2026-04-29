import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DemoWidget } from './DemoWidget';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden">
      {/* Background Mesh (Across Style) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Zap className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Srivate Protocol v2.0 is live</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6 mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] text-white"
              >
                Trustless tipping <span className="text-magenta-gradient">for the agentic web.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg md:text-xl text-white/50 font-medium max-w-lg leading-relaxed"
              >
                The first x402-standard tipping infrastructure. 
                Frictionless, AI-driven, and 100% auditable settlements on Base L2.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Button asChild size="lg" className="btn-across h-14 px-12 text-lg">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Launch App
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-14 px-12 text-white/40 hover:text-white transition-all font-bold text-lg">
                <Link to="/docs">
                  Documentation
                </Link>
              </Button>
            </motion.div>

            {/* Sub Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 flex flex-wrap gap-12 text-white/20"
            >
               <div className="flex flex-col items-start">
                 <span className="text-2xl font-black text-white/60">10ms</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Settlement Latency</span>
               </div>
               <div className="w-[1px] h-10 bg-white/5 hidden md:block" />
               <div className="flex flex-col items-start">
                 <span className="text-2xl font-black text-white/60">100%</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Auditable Trust</span>
               </div>
               <div className="w-[1px] h-10 bg-white/5 hidden md:block" />
               <div className="flex flex-col items-start">
                 <span className="text-2xl font-black text-white/60">x402</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Micro-Protocol Standard</span>
               </div>
            </motion.div>
          </div>

          {/* Right Column: Demo Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <DemoWidget isEmbedded />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
