
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

  const navItems = isDashboard 
    ? [] // Empty for dashboard
    : ['Home', 'Features', 'Roadmap'];

  return (
    <header 
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-elastic py-2 px-6 md:px-8",
        "rounded-full mb-4 backdrop-blur-xl bg-white/80 shadow-lg border border-border/40",
        "w-auto flex items-center justify-center"
      )}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <a 
          href="/"
          className="p-2 text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
          aria-label="Home"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </a>
        
        <a 
          href="#features"
          className="p-2 text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
          aria-label="Features"
        >
          <LineChart size={20} />
          <span className="text-xs mt-1">Features</span>
        </a>
        
        <a 
          href="#roadmap"
          className="p-2 text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
          aria-label="Roadmap"
        >
          <LineChart size={20} />
          <span className="text-xs mt-1">Roadmap</span>
        </a>
        
        <a 
          href="/documentation"
          className="p-2 text-foreground/80 hover:text-primary transition-colors flex flex-col items-center"
          aria-label="Documentation"
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Docs</span>
        </a>
        
        <button 
          onClick={isDashboard ? () => logout() : handleConnectWallet}
          className={cn(
            "flex flex-col items-center p-2 transition-colors",
            isDashboard
              ? "text-destructive hover:text-destructive/80"
              : "text-primary hover:text-primary/80"
          )}
        >
          <Wallet size={20} />
          <span className="text-xs mt-1">{isDashboard ? "Logout" : (authenticated ? "Dashboard" : "Connect")}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
