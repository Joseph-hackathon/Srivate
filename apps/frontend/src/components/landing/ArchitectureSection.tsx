import { motion } from 'framer-motion';
import { Database, Shield, Zap, Cpu, ArrowRight } from 'lucide-react';

const techNodes = [
  { id: 'init', title: "x402 Initiation", icon: Zap, label: "Frictionless UX", desc: "Widgets & terminals capture TIP intents seamlessly." },
  { id: 'ai', title: "AI Intelligence", icon: Cpu, label: "Context Engine", desc: "AI removes decision fatigue by recommending amounts." },
  { id: 'srivate', title: "Srivate Core", icon: Shield, label: "Trustless Split", desc: "Smart contracts distribute TIPs atomically." },
  { id: 'settle', title: "Base & 0G", icon: Database, label: "Execution & Trust", desc: "Real-time L2 settlement & immutable proof archiving." }
];

export function ArchitectureSection() {
  return (
    <section className="py-24 relative bg-black/40 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Section Heading (Across Style) */}
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="title-lg mb-6"
          >
            The modular <br/> <span className="text-magenta-gradient">trust infrastructure.</span>
          </motion.h2>
          <p className="text-lg text-white/40 font-medium">
            Srivate bridges the gap between agentic intent and verifiable on-chain settlement.
          </p>
        </div>

        {/* Linear tech flow (Clean Across Style) */}
        <div className="relative w-full mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
           {techNodes.map((node, i) => (
             <div key={node.id} className="flex flex-col xl:flex-row items-center gap-6 flex-1 w-full">
                <TechNode node={node} isCore={node.id === 'srivate'} />
                {i < techNodes.length - 1 && (
                  <div className="hidden xl:flex flex-col items-center gap-2 opacity-20 shrink-0">
                     <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                )}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}

function TechNode({ node, isCore }: { node: typeof techNodes[0], isCore?: boolean }) {
  const Icon = node.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative p-8 rounded-2xl bg-[#0F0F1A] border transition-all duration-500 w-full text-center md:text-left ${isCore ? 'border-primary/40 shadow-2xl shadow-primary/10' : 'border-white/5 hover:border-white/20'}`}
    >
      <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center mx-auto md:mx-0 ${isCore ? 'bg-primary/10 text-primary' : 'bg-white/5 text-white/40'}`}>
         <Icon className="w-6 h-6" />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block ${isCore ? 'text-primary' : 'text-white/20'}`}>
        {node.label}
      </span>
      <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
        {node.title}
      </h4>
      <p className="text-sm text-white/40 font-medium leading-relaxed">
        {node.desc}
      </p>
    </motion.div>
  );
}
