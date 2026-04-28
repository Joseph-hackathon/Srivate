import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  { step: "01", title: "Define", desc: "Create TIP distribution policies for your staff or agents.", points: ["Multi-token splitting", "Flexible logic"] },
  { step: "02", title: "Plug", desc: "Integrate Srivate SDK into your terminal or agent.", points: ["Zero-config SDK", "Agent-native"] },
  { step: "03", title: "Stream", desc: "Tips flow atomically and trustlessly on-chain.", points: ["Instant Payouts", "Base L2 Finality"] }
];

export function UsingSrivateSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Heading (Across Style) */}
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="title-lg mb-6"
          >
            How to <br/> <span className="text-magenta-gradient">Integrate.</span>
          </motion.h2>
          <p className="text-lg text-white/40 max-w-xl font-medium">
            A streamlined journey from integration to automated settlement.
          </p>
        </div>

        {/* Steps Grid (Clean Across Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-primary/20 transition-all duration-500 relative"
            >
              <div className="text-4xl font-black text-white/5 mb-8 italic tracking-tighter group-hover:text-primary/10 transition-colors">
                {s.step}
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-base text-white/40 leading-relaxed font-medium">
                  {s.desc}
                </p>
                
                <ul className="space-y-3 pt-6 border-t border-white/5">
                  {s.points.map((p, pi) => (
                    <li key={pi} className="flex items-center gap-3 text-white/20 group-hover:text-white/40 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                      <span className="text-[12px] font-bold uppercase tracking-wider">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
