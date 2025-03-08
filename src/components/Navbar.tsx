
import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { login, authenticated, logout } = usePrivy();
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleConnectWallet = async () => {
    if (authenticated) {
      navigate('/dashboard');
    } else {
      login();
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-elastic",
        isScrolled ? "py-1" : "py-2",
        "bg-background/80 backdrop-blur-lg border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Aelix</a>
        
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="/" 
              className="px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted/60 transition-colors"
            >
              Home
            </a>
            <a 
              href="#features" 
              className="px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted/60 transition-colors"
            >
              Features
            </a>
            <a 
              href="#roadmap" 
              className="px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted/60 transition-colors"
            >
              Roadmap
            </a>
          </nav>
        )}
        
        <div className="flex items-center gap-3">
          <button 
            onClick={isDashboard ? () => logout() : handleConnectWallet}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors text-sm font-medium",
              isDashboard
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
            )}
          >
            {isDashboard ? "Disconnect" : (authenticated ? "Dashboard" : "Connect Wallet")}
          </button>
          
          {!isDashboard && (
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden py-2 px-4 bg-background/95 border-b border-border/40">
          <nav className="flex flex-col space-y-1">
            <a 
              href="/"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#features"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#roadmap"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
