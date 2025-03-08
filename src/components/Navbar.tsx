
import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet, Home, BookOpen, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrivy } from '@privy-io/react-auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, authenticated, user, logout } = usePrivy();
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';

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
        isScrolled ? "py-3" : "py-5",
        "bg-background/80 backdrop-blur-lg border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Aelix</a>
        
        <div className="flex items-center space-x-1 sm:space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {!isDashboard && (
              <>
                <a href="/" className="text-foreground/80 hover:text-primary transition-colors">
                  Home
                </a>
                <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#roadmap" className="text-foreground/80 hover:text-primary transition-colors">
                  Roadmap
                </a>
                <a href="/documentation" className="text-foreground/80 hover:text-primary transition-colors">
                  Docs
                </a>
              </>
            )}
          </nav>
          
          <button 
            onClick={isDashboard ? () => logout() : handleConnectWallet}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              isDashboard
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isDashboard ? "Disconnect" : (authenticated ? "Dashboard" : "Connect Wallet")}
          </button>
          
          <button
            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden py-4 px-4 bg-background/95 border-b border-border/40">
          <nav className="flex flex-col space-y-4">
            <a 
              href="/"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#features"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#roadmap"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a 
              href="/documentation"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
