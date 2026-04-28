import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileCode, Book, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const iframeCode = `<!-- Add this to your HTML -->
<iframe
  src="https://widget.srivate.io/tip?
    merchant=YOUR_MERCHANT_ID&
    theme=dark"
  width="100%"
  height="400"
  frameborder="0"
  allow="payment"
></iframe>`;

const iframeAdvancedCode = `<!-- Advanced configuration -->
<iframe
  src="https://widget.srivate.io/tip?
    merchant=YOUR_MERCHANT_ID&
    theme=dark&
    currency=USDC&
    network=base&
    suggested_tip=5&
    show_ai_suggestions=true"
  width="100%"
  height="450"
  frameborder="0"
  allow="payment"
  style="border-radius: 12px;"
></iframe>

<script>
  // Listen for tip events
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://widget.srivate.io') return;
    
    if (event.data.type === 'TIP_COMPLETE') {
      console.log('Tip received:', event.data.amount);
    }
  });
</script>`;

const reactInstallCode = `npm install @srivate/react-widget`;

const reactUsageCode = `import { SrivateWidget } from '@srivate/react-widget';

function TipPage() {
  const handleTipComplete = (tip) => {
    console.log('Tip received:', tip);
  };

  return (
    <SrivateWidget
      merchantId="YOUR_MERCHANT_ID"
      theme="dark"
      currency="USDC"
      network="base"
      onTipComplete={handleTipComplete}
    />
  );
}`;

export default function Widget() {
  const [activeTab, setActiveTab] = useState('iframe');

  return (
    <Layout>
      <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* Across Mesh Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Integration Suite</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="title-lg mb-6"
            >
              WIDGET <br/> <span className="text-magenta-gradient">INTEGRATION.</span>
            </motion.h1>
            <p className="text-lg text-white/40 font-medium">
              Deploy the Srivate settlement engine to your platform in minutes. 
              High-performance tipping, automated for the elite.
            </p>
          </div>

          {/* Integration Options */}
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-white/[0.02] border border-white/5 p-1 rounded-2xl h-14">
                <TabsTrigger value="iframe" className="rounded-xl data-[state=active]:bg-white/5 data-[state=active]:text-white text-white/30 font-bold uppercase tracking-widest text-xs transition-all">
                  <FileCode className="h-4 w-4 mr-2" />
                  iFrame Embed
                </TabsTrigger>
                <TabsTrigger value="react" className="rounded-xl data-[state=active]:bg-white/5 data-[state=active]:text-white text-white/30 font-bold uppercase tracking-widest text-xs transition-all">
                  <Terminal className="h-4 w-4 mr-2" />
                  React SDK
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="iframe" key="iframe-tab">
                  <motion.div 
                    key="iframe-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div className="glass-premium rounded-2xl p-8 border-white/5">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                         <span className="text-primary font-black italic">01.</span> Quick Start
                      </h3>
                      <p className="text-white/40 mb-8 font-medium">
                        The fastest way to add Srivate to your website. Copy and paste the optimized embed code.
                      </p>
                      <CodeBlock code={iframeCode} language="html" title="Basic_iFrame_Embed" />
                    </div>

                    <div className="glass-premium rounded-2xl p-8 border-white/5">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                         <span className="text-primary font-black italic">02.</span> Advanced Config
                      </h3>
                      <p className="text-white/40 mb-8 font-medium">
                        Customize parameters and listen for atomic settlement events via postMessage.
                      </p>
                      <CodeBlock code={iframeAdvancedCode} language="html" title="Advanced_Config" showLineNumbers />
                    </div>

                    <div className="glass-premium rounded-2xl p-8 border-white/5">
                      <h3 className="text-xl font-bold text-white mb-8">Parameters Reference</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="text-left py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Parameter</th>
                              <th className="text-left py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Type</th>
                              <th className="text-left py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Description</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm font-medium">
                            {[
                              { p: 'merchant', t: 'string', d: 'Your unique merchant ID' },
                              { p: 'theme', t: 'string', d: '"light" or "dark"' },
                              { p: 'currency', t: 'string', d: 'Default (USDC, ETH)' },
                              { p: 'network', t: 'string', d: 'Target network (base)' },
                            ].map((row, idx) => (
                              <tr key={idx} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                                <td className="py-4 px-4 font-mono text-primary">{row.p}</td>
                                <td className="py-4 px-4 text-white/40">{row.t}</td>
                                <td className="py-4 px-4 text-white/60">{row.d}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="react" key="react-tab">
                  <motion.div 
                    key="react-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div className="glass-premium rounded-2xl p-8 border-white/5">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xl font-bold text-white">SDK Installation</h3>
                         <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase font-bold text-[9px] px-3 py-1">v2.4.0-alpha</Badge>
                      </div>
                      <CodeBlock code={reactInstallCode} language="bash" title="Terminal" />
                    </div>

                    <div className="glass-premium rounded-2xl p-8 border-white/5">
                      <h3 className="text-xl font-bold text-white mb-4">React Integration</h3>
                      <p className="text-white/40 mb-8 font-medium">
                        Native React components for high-performance agentic interfaces.
                      </p>
                      <CodeBlock code={reactUsageCode} language="tsx" title="App.tsx" showLineNumbers />
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>

          {/* About Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-premium rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Need custom logic?</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Explore our developer documentation for advanced multi-token splits, 
                automated agent-to-agent distribution, and immutable archive integration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild className="btn-across h-14 px-10">
                  <Link to="/docs">
                    <Book className="mr-2 h-4 w-4" />
                    Read Docs
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="h-14 px-10 text-white/40 hover:text-white font-bold uppercase tracking-widest text-xs">
                  <a href="https://github.com/Srivate/Srivate" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    GitHub Source
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
