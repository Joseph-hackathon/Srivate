import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CodeBlock } from '@/components/ui/CodeBlock';

const codeContent = `// Srivate Agentic Settlement
const srivate = new SrivateClient({
  network: "base-sepolia",
  agentId: "agent_0x..."
});

// Trigger intelligent distribution
await srivate.distribute({
  amount: "0.1 ETH",
  policyId: "service_pool_12",
  intent: "Reward: high-quality analysis"
});`;

export function CodeMorphSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to width percentage (0% to 100%)
  const width = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const sliderX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Section Header */}
        <motion.div 
          style={{ opacity }}
          className="mb-16 text-center z-20"
        >
          <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Unveiling_The_Protocol</span>
          <h2 className="text-5xl md:text-7xl font-black italic text-white mt-4 tracking-tighter uppercase leading-none">
            FROM VISUAL <br/> TO <span className="text-primary text-glow">REALITY</span>
          </h2>
        </motion.div>

        {/* Image-Code Wrapper (Inspired by reference) */}
        <div className="relative w-full max-w-6xl aspect-video glass-premium rounded-[2rem] overflow-hidden group">
          
          {/* Layer 1: Visual/Image View (Bottom Layer) */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
             {/* Stylized Module Visual */}
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(circle, #CCFF00 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 border-[1px] border-primary/20 rounded-[3rem] relative flex items-center justify-center"
                >
                  <div className="w-48 h-48 border-[1px] border-primary/40 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/20 blur-xl rounded-full" />
                  </div>
                </motion.div>
                <div className="absolute bottom-10 left-10 text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">SYSTEM_ARCHITECTURE_XRAY</div>
             </div>
          </div>

          {/* Layer 2: Code View (Top Layer - Masked) */}
          <motion.div 
            style={{ width }}
            className="absolute inset-0 bg-[#0A0A0A] border-r border-primary/50 overflow-hidden z-10"
          >
            {/* The Code Content (Fixed width to prevent shrinking) */}
            <div className="absolute inset-0 w-[1152px] h-full flex items-center px-12 md:px-24">
               <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">srivate_protocol.ts</span>
                  </div>
                  <CodeBlock 
                    code={codeContent} 
                    language="typescript" 
                    className="bg-transparent border-none text-xl md:text-2xl font-medium leading-relaxed"
                    showLineNumbers={false}
                  />
               </div>
            </div>
          </motion.div>

          {/* Slider Handle (The glowing line) */}
          <motion.div 
            style={{ left: sliderX }}
            className="absolute top-0 bottom-0 w-[2px] bg-primary z-20 shadow-[0_0_20px_#CCFF00]"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-primary rounded-full flex items-center justify-center">
                <div className="w-1 h-3 bg-primary rounded-full mx-[1px]" />
                <div className="w-1 h-3 bg-primary rounded-full mx-[1px]" />
             </div>
          </motion.div>

          {/* Labels Overlay */}
          <div className="absolute top-8 left-8 z-30 flex gap-4 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">System_Visual</span>
            </div>
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
              className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
            >
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Active_Source_Code</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="mt-16 w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
           <motion.div 
             style={{ width }}
             className="absolute inset-0 bg-primary"
           />
        </div>
      </div>
    </section>
  );
}
