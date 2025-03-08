
import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
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

  const navItems = isDashboard 
    ? [] // Empty for dashboard
    : ['Home', 'Features', 'Roadmap'];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-elastic py-4 md:py-5 px-6 md:px-12",
        isScrolled 
          ? "backdrop-blur-xl bg-white/80 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a 
          href="/"
          className="text-xl font-semibold tracking-tight group"
        >
          <span className="bg-clip-text transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r from-primary to-primary/70">
            Aelix
          </span>
        </a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
          
          <button 
            onClick={isDashboard ? () => logout() : handleConnectWallet}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isDashboard
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Wallet size={16} />
            <span>{isDashboard ? "Disconnect" : (authenticated ? "Dashboard" : "Connect Wallet")}</span>
          </button>
        </nav>
        
        {/* Mobile: Wallet connect button and menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={isDashboard ? () => logout() : handleConnectWallet}
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isDashboard
                ? "bg-destructive/10 text-destructive"
                : "bg-primary text-primary-foreground"
            )}
          >
            <Wallet size={14} />
            <span className="sr-only md:not-sr-only">
              {isDashboard ? "Disconnect" : (authenticated ? "Dashboard" : "Connect")}
            </span>
          </button>
          
          {navItems.length > 0 && (
            <button 
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {navItems.length > 0 && (
        <div 
          className={cn(
            "fixed inset-0 top-[57px] z-40 bg-white/95 backdrop-blur-lg md:hidden transform transition-transform duration-300 ease-elastic",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-12 pb-20">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xl font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
