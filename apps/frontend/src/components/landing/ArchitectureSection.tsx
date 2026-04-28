import { motion } from 'framer-motion';
import { Database, Shield, Zap, Cpu, ArrowRight } from 'lucide-react';

const techNodes = [
  { id: 'agent', title: "Autonomous Agents", icon: Cpu, label: "Intent Trigger", desc: "Agents or terminals generate TIP payout intents." },
  { id: 'srivate', title: "Srivate Protocol", icon: Shield, label: "Core Protocol", desc: "Settlement engine distributes TIPs atomically." },
  { id: 'settle', title: "Base / 0G Storage", icon: Database, label: "Execution Layer", desc: "Real-time on-chain settlement & proof archiving." }
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
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
           {techNodes.map((node, i) => (
             <div key={node.id} className="flex flex-col md:flex-row items-center gap-12 flex-1">
                <TechNode node={node} isCore={node.id === 'srivate'} />
                {i < techNodes.length - 1 && (
                  <div className="hidden md:flex flex-col items-center gap-2 opacity-20">
                     <ArrowRight className="w-8 h-8 text-white" />
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
