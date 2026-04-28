import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, Menu, X, LayoutDashboard, Settings, HelpCircle, ShieldAlert } from 'lucide-react';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
import { EmployeePortal } from '@/components/dashboard/EmployeePortal';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function ConnectWalletPrompt() {
  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-md mx-auto text-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-2xl shadow-primary/10"
        >
          <Wallet className="h-10 w-10 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-black mb-4 text-white tracking-tight italic uppercase">Access_Denied.</h1>
        <p className="text-white/30 mb-10 font-medium leading-relaxed">
          Connect your authorized wallet to enter the Srivate Protocol management console.
        </p>
        <div className="flex justify-center scale-110">
          <ConnectButton />
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-xs font-bold text-white/20 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            ← Terminate & Return
          </Link>
        </div>
      </div>
    </div>
  );
}

const NavLink = ({ active, children, href }: { active?: boolean; children: React.ReactNode; href: string }) => (
  <Link
    to={href}
    className={cn(
      "text-sm font-bold transition-all hover:text-white uppercase tracking-widest py-2 px-4 rounded-lg",
      active ? "text-white bg-white/5" : "text-white/30"
    )}
  >
    {children}
  </Link>
);

export default function Dashboard() {
  const { address } = useAccount();
  const account = address ? { address } : null;
  const [activeView, setActiveView] = useState<'manager' | 'employee'>('manager');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!account) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-foreground selection:bg-primary/20 selection:text-white">
      {/* Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[800px] bg-primary/[0.03] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Top Navigation Bar (Across Style) */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#05050A]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img src="/logo.png" alt="Srivate" className="h-9 w-auto object-contain" />
            <span className="text-2xl font-black text-white uppercase tracking-tighter italic">SRIVATE</span>
            <div className="h-7 px-3 bg-white/5 border border-white/5 rounded-lg flex items-center ml-2 hidden lg:flex">
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Console</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink active href="/dashboard">Console</NavLink>
            <NavLink href="/widget">Widget</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/disputes">Disputes</NavLink>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ConnectButton />
          <button
            className="md:hidden text-white/40 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 bg-[#05050A] pt-24 px-6 md:hidden flex flex-col gap-4"
          >
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white italic uppercase tracking-tighter">Console</Link>
            <Link to="/widget" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white/20 italic uppercase tracking-tighter">Widget</Link>
            <Link to="/docs" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white/20 italic uppercase tracking-tighter">Docs</Link>
            <Link to="/disputes" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white/20 italic uppercase tracking-tighter">Disputes</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto pb-24 relative z-10">
        
        {/* Page Header & View Toggle (Across Inspired) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-2 h-2 rounded-full bg-primary glow-magenta animate-pulse" />
               <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Protocol_Active</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase italic leading-none">Console_Main.</h1>
          </div>

          {/* View Toggle (Across Style) */}
          <div className="flex items-center bg-white/[0.02] border border-white/5 p-1 rounded-2xl h-14 w-full lg:w-auto">
            <button
              onClick={() => setActiveView('manager')}
              className={cn(
                "flex-1 lg:px-8 h-full rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all",
                activeView === 'manager'
                  ? "bg-primary text-black shadow-xl shadow-primary/20"
                  : "text-white/20 hover:text-white/40"
              )}
            >
              Manager_View
            </button>
            <button
              onClick={() => setActiveView('employee')}
              className={cn(
                "flex-1 lg:px-8 h-full rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all",
                activeView === 'employee'
                  ? "bg-primary text-black shadow-xl shadow-primary/20"
                  : "text-white/20 hover:text-white/40"
              )}
            >
              Employee_Portal
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <motion.div 
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeView === 'manager' ? (
            <ManagerDashboard />
          ) : (
            <EmployeePortal walletAddress={account.address} />
          )}
        </motion.div>
      </main>
    </div>
  );
}
