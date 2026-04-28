import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Book, 
  Code, 
  Zap, 
  Shield, 
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const sidebarSections = [
  {
    title: 'GETTING_STARTED',
    icon: Book,
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'quickstart', label: 'Quick Start' },
      { id: 'architecture', label: 'Architecture' },
    ],
  },
  {
    title: 'CORE_CONCEPTS',
    icon: Layers,
    items: [
      { id: 'atomic-payouts', label: 'Atomic Payouts' },
      { id: 'policy-registry', label: 'Policy Registry' },
      { id: 'non-custodial', label: 'Non-Custodial' },
    ],
  },
  {
    title: 'API_REFERENCE',
    icon: Code,
    items: [
      { id: 'widget-api', label: 'Widget API' },
      { id: 'rest-api', label: 'REST API' },
      { id: 'contract-abi', label: 'Contract ABI' },
    ],
  },
  {
    title: 'INFRASTRUCTURE',
    icon: Cpu,
    items: [
      { id: 'base-l2', label: 'Base L2 Integration' },
      { id: '0g-storage', label: '0G Proof Archiving' },
      { id: 'keeper-hub', label: 'KeeperHub Exec' },
    ],
  },
];

const quickStartCode = `// 1. Install the Srivate SDK
npm install @srivate/sdk

// 2. Configure for Base Sepolia
import { SrivateClient } from '@srivate/sdk';

const srivate = new SrivateClient({
  network: 'base-sepolia',
  apiKey: process.env.SRIVATE_API_KEY
});

// 3. Initiate a trustless TIP payout
const payout = await srivate.payouts.create({
  amount: '1.50',
  token: 'USDC',
  policyId: 'AGENT_NODE_01'
});

console.log(\`Settled: \${payout.txHash}\`);`;

const policyExample = `// Define a distribution policy on-chain
{
  "policyId": 1,
  "name": "Cafe_Staff_Pool",
  "recipients": [
    "0xStaff_A...", // 40%
    "0xStaff_B...", // 40%
    "0xAgent_C..."  // 20%
  ],
  "percentages": [4000, 4000, 2000],
  "active": true
}`;

const apiExample = `// GET /api/v1/stats/merchant/demo-cafe
{
  "success": true,
  "data": {
    "totalVolume": "1240.50",
    "payoutCount": 156,
    "activeAgents": 4,
    "lastSettlement": "2024-04-27T03:53:14Z"
  }
}`;

export default function Docs() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-[#05050A]">
        {/* Across Mesh Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar (Across Style) */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-32 space-y-10">
                {/* Search - Noir Style */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-[#0F0F1A] border-white/5 text-white focus-visible:ring-primary rounded-xl font-medium"
                  />
                </div>

                {/* Navigation */}
                <nav className="space-y-10">
                  {sidebarSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <section.icon className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{section.title}</span>
                      </div>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => setActiveSection(item.id)}
                              className={cn(
                                "w-full text-left text-sm py-2.5 px-4 rounded-xl transition-all font-medium",
                                activeSection === item.id
                                  ? "text-white bg-primary italic font-black shadow-lg shadow-primary/20"
                                  : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                              )}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 min-w-0">
              <div className="max-w-4xl">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/20 mb-10">
                  <Link to="/" className="hover:text-primary transition-colors">SRIVATE</Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-white/40">{activeSection.replace('-', ' ')}</span>
                </div>

                <AnimatePresence mode="wait">
                  {/* Introduction Section */}
                  {activeSection === 'introduction' && (
                    <motion.div 
                      key="intro"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="space-y-6">
                        <h1 className="title-lg">
                          PROTOCOL <br/> <span className="text-magenta-gradient">PHILOSOPHY.</span>
                        </h1>
                        <p className="text-xl text-white/40 font-medium leading-relaxed">
                          SRIVATE is the world's first **Trustless TIP Infrastructure** designed for the autonomous agentic economy. 
                          We solve the "payroll overhead" problem for AI agents by enabling atomic, non-custodial distributions of micro-payouts.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { title: 'The_Need_For_Trustless', desc: 'In a world of autonomous agents, centralized custody is a liability. Srivate ensures funds are distributed atomically without a middleman.', icon: Shield },
                          { title: 'Base_L2_Efficiency', desc: 'Built on Base to provide sub-cent transaction costs and instant finality, essential for micro-settlements.', icon: Zap },
                        ].map((feat, i) => (
                          <div key={i} className="p-8 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-primary/20 transition-all group">
                             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feat.icon className="w-6 h-6 text-primary" />
                             </div>
                             <h3 className="text-lg font-bold text-white mb-2 uppercase italic tracking-tighter">{feat.title}</h3>
                             <p className="text-sm text-white/30 font-medium leading-relaxed">{feat.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-8 bg-white/[0.02] p-10 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-bold text-white italic tracking-tighter uppercase">Why_Srivate?</h2>
                        <div className="grid gap-8">
                          <div>
                             <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">Non-Custodial Payments</h4>
                             <p className="text-white/40 text-sm leading-relaxed">Merchants never touch the staff's 팁. The Srivate contract splits payments at the source, ensuring staff are paid instantly and fairly.</p>
                          </div>
                          <div>
                             <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">AI-Agent Ready</h4>
                             <p className="text-white/40 text-sm leading-relaxed">Agents can receive and distribute funds autonomously using our SDK, enabling self-sustaining agentic networks.</p>
                          </div>
                          <div>
                             <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">Verifiable Proofs</h4>
                             <p className="text-white/40 text-sm leading-relaxed">Every distribution is logged on 0G Storage, providing an immutable audit trail for all parties.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Core Concepts */}
                  {activeSection === 'atomic-payouts' && (
                    <motion.div 
                      key="atomic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="space-y-6">
                        <h1 className="title-lg uppercase italic">Atomic_ <span className="text-magenta-gradient">Payouts.</span></h1>
                        <p className="text-xl text-white/40 font-medium leading-relaxed">
                          Atomic payouts ensure that a single transaction handles multiple distributions. 
                          When a customer tips $5.00, the smart contract calculates and assigns shares to all recipients in the same block.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white italic tracking-tighter uppercase">The_Workflow.</h2>
                        <ol className="space-y-6">
                          {[
                            { t: "Intent Trigger", d: "An agent or terminal initiates a payment session with a specific policy ID." },
                            { t: "Policy Lookup", d: "The Srivate Protocol fetches the distribution rules from the Policy Registry." },
                            { t: "Atomic Split", d: "Funds are distributed to recipient's claimable balances on-chain." },
                            { t: "Verified Log", d: "The transaction receipt and distribution proof are archived on 0G Storage." }
                          ].map((step, i) => (
                            <li key={i} className="flex gap-6 items-start">
                              <span className="text-4xl font-black text-white/5 italic">0{i+1}</span>
                              <div>
                                <h4 className="text-white font-bold mb-1 uppercase tracking-tighter italic">{step.t}</h4>
                                <p className="text-white/30 text-sm leading-relaxed">{step.d}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'policy-registry' && (
                    <motion.div 
                      key="policy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="space-y-6">
                        <h1 className="title-lg uppercase italic text-magenta-gradient">Policy_Registry.</h1>
                        <p className="text-xl text-white/40 font-medium leading-relaxed">
                          The Policy Registry is the brain of the protocol. It stores immutable rules for how funds should be distributed. 
                          Policies can be managed by DAO governance or specific merchant roles.
                        </p>
                      </div>
                      <CodeBlock code={policyExample} language="json" title="OnChain_Policy_Object" />
                    </motion.div>
                  )}

                  {/* REST API Section */}
                  {activeSection === 'rest-api' && (
                    <motion.div 
                      key="rest"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="space-y-6">
                        <h1 className="title-lg text-magenta-gradient uppercase italic">Rest_API.</h1>
                        <p className="text-xl text-white/40 font-medium leading-relaxed">
                          Access the protocol programmatically via our high-performance REST endpoints. 
                          Synchronize tip history and manage fleet settings at scale.
                        </p>
                      </div>

                      <div className="glass-premium rounded-2xl p-8 border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 italic tracking-tighter">AUTHENTICATION</h2>
                        <p className="text-white/40 mb-8 font-medium">
                          All requests require a valid Bearer token from your management console.
                        </p>
                        <CodeBlock code={apiExample} language="json" title="Stats_Response" />
                      </div>

                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white italic tracking-tighter uppercase">Endpoint_Catalog.</h2>
                        <div className="bg-[#0F0F1A] rounded-2xl border border-white/5 overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-white/[0.02]">
                              <tr className="border-b border-white/5">
                                <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-white/20">Method</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-white/20">Path</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-white/20">Description</th>
                              </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                              {[
                                { m: 'GET', p: '/v1/tips', d: 'Retrieve settlement history', c: 'text-secondary' },
                                { m: 'GET', p: '/v1/stats/:merchant', d: 'Fetch aggregate volume stats', c: 'text-secondary' },
                                { m: 'POST', p: '/v1/sessions', d: 'Initialize terminal session', c: 'text-primary' },
                                { m: 'POST', p: '/v1/payouts', d: 'Initiate fleet distribution', c: 'text-primary' },
                              ].map((row, idx) => (
                                <tr key={idx} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                                  <td className={cn("py-6 px-6 font-black italic", row.c)}>{row.m}</td>
                                  <td className="py-6 px-6 font-mono text-white/60">{row.p}</td>
                                  <td className="py-6 px-6 text-white/30">{row.d}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Start */}
                  {activeSection === 'quickstart' && (
                    <motion.div 
                      key="quick"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <h1 className="title-lg uppercase italic">Quick_ <span className="text-magenta-gradient">Start.</span></h1>
                      <p className="text-xl text-white/40 font-medium leading-relaxed">
                        Start integrating Srivate in less than 5 minutes. Our SDK handles the complex on-chain logic, leaving you to focus on your agent's core capabilities.
                      </p>
                      <CodeBlock code={quickStartCode} language="typescript" title="Integration_Example" showLineNumbers />
                    </motion.div>
                  )}

                  {/* Fallback for other sections */}
                  {!['introduction', 'rest-api', 'atomic-payouts', 'policy-registry', 'quickstart'].includes(activeSection) && (
                    <motion.div 
                      key="fallback"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <h1 className="title-lg text-white/20 uppercase italic">{activeSection.replace('-', '_')}.</h1>
                      <div className="glass-premium rounded-3xl p-16 text-center border-white/5">
                         <Terminal className="h-16 w-16 text-primary/20 mx-auto mb-8 animate-pulse" />
                         <h2 className="text-2xl font-bold text-white mb-4 italic tracking-tighter uppercase">Compiling_Docs...</h2>
                         <p className="text-white/30 max-w-sm mx-auto font-medium">
                           This section is currently being archived into the protocol registry. 
                           Check back after the next block sync.
                         </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
