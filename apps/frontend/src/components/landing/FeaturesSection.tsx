import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ShieldCheck, Cpu, Zap, Database, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/CodeBlock';

const features = [
  { icon: Zap, title: 'x402 Initiation', desc: 'One-click embedded widgets removing all user friction.', color: 'primary' },
  { icon: Cpu, title: 'AI Intelligence', desc: 'Context-aware engines to eliminate decision fatigue.', color: 'secondary' },
  { icon: ShieldCheck, title: 'Trustless Split', desc: 'Instant on-chain distribution with zero counterparty risk.', color: 'primary' },
  { icon: Database, title: 'Auditable Proof', desc: 'Permanent distribution tracking via 0G storage.', color: 'secondary' }
];

const developerCode = `const tip = await srivate.payouts.distribute({
  amount: '1.50',
  currency: 'USDC',
  policyId: 'TIP_POOL_A',
  recipients: ['agent_0x1', 'staff_0x2']
});`;

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sliderWidth = useTransform(smoothProgress, [0.3, 0.6], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Heading (Across Style) */}
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="title-lg mb-6"
          >
            Trustless <br/> 
            <span className="text-magenta-gradient">TIP Infrastructure.</span>
          </motion.h2>
          <p className="text-lg text-white/40 max-w-xl font-medium">
            Srivate tackles structural friction in modern payments, providing an atomic layer that turns tipping into a transparent, frictionless, and verifiable infrastructure for the agentic economy.
          </p>
        </div>

        {/* Feature Grid (Clean Across Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-primary/40 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${f.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h4>
              <p className="text-white/30 text-sm font-medium leading-relaxed group-hover:text-white/50 transition-colors">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Developer Reveal (Across Style) */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="title-lg">
                Built for <br/> 
                <span className="text-magenta-gradient">Developers.</span>
              </h3>
              <p className="text-lg text-white/40 leading-relaxed max-w-lg font-medium">
                Our lightweight SDK and intent-based API allow any agent to start settling payments in under 5 minutes.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Idempotent Transaction Logic",
                "Real-time Distribution Hooks",
                "Native Base L2 Optimization"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,0,128,0.4)]" />
                  <span className="text-base font-semibold text-white/30 group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="link" className="text-primary p-0 h-auto font-bold uppercase tracking-widest text-xs group flex items-center gap-2">
              <Link to="/docs" className="flex items-center gap-2">
                View API Reference <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Reveal Slider Window (Clean Across Style) */}
          <div className="relative aspect-[16/10] bg-[#0F0F1A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 p-8">
               <div className="flex items-center justify-between mb-8 opacity-20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">srivate_agent.ts</span>
               </div>

               {/* Before/After Slider Reveal */}
               <motion.div 
                 style={{ width: sliderWidth }}
                 className="absolute inset-0 bg-[#1A1A2E] border-r-2 border-primary z-10 overflow-hidden shadow-2xl"
               >
                  <div className="absolute inset-0 w-[800px] p-8 pt-20">
                    <CodeBlock 
                      code={developerCode} 
                      language="typescript" 
                      className="bg-transparent border-none text-base font-mono leading-relaxed"
                      showLineNumbers={false}
                    />
                  </div>
               </motion.div>

               {/* Hint Overlay */}
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/5 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]"
                  >
                    Scroll to reveal code
                  </motion.div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
