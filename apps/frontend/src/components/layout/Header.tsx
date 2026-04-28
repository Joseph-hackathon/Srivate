import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/widget', label: 'Widget' },
  { to: '/docs', label: 'Docs' },
  { to: '/disputes', label: 'Disputes' },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-6 py-6 max-w-[1600px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 transition-transform hover:scale-105">
            <img src="/logo.png" alt="Srivate" className="h-10 w-auto object-contain" />
            <span className="text-3xl font-black text-white uppercase tracking-tighter italic">SRIVATE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${location.pathname === link.to
                  ? 'text-primary'
                  : 'text-white/30'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-12 w-12" /> : <Menu className="h-12 w-12" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to
                    ? 'text-primary'
                    : 'text-muted-foreground'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <ConnectButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
