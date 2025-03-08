
import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Code, Map, Menu, X } from 'lucide-react';

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
        isScrolled ? "py-2" : "py-3",
        "bg-background/80 backdrop-blur-lg border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Aelix</a>
        
        <div className="flex items-center gap-4">
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
          <nav className="flex flex-col space-y-2">
            <a 
              href="/"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </a>
            <a 
              href="#features"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Code size={18} />
              Features
            </a>
            <a 
              href="#roadmap"
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map size={18} />
              Roadmap
            </a>
          </nav>
        </div>
      )}

      {/* Dock Menu - Only on landing page */}
      {!isDashboard && (
        <div className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-background/80 backdrop-blur-lg border border-border/40 rounded-full px-6 py-3 shadow-lg">
            <nav className="flex items-center space-x-8">
              <a 
                href="/" 
                className="text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
              >
                <Home className="mb-1" size={20} />
                <span className="text-xs">Home</span>
              </a>
              <a 
                href="#features" 
                className="text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
              >
                <Code className="mb-1" size={20} />
                <span className="text-xs">Features</span>
              </a>
              <a 
                href="#roadmap" 
                className="text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
              >
                <Map className="mb-1" size={20} />
                <span className="text-xs">Roadmap</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
