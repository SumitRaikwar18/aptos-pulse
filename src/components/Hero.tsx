
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { login, authenticated } = usePrivy();
  const navigate = useNavigate();

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate only when section is visible
          if (titleRef.current) {
            titleRef.current.classList.add('animate-fade-in');
            titleRef.current.style.animationDelay = '0.2s';
          }
          if (subtitleRef.current) {
            subtitleRef.current.classList.add('animate-fade-in');
            subtitleRef.current.style.animationDelay = '0.4s';
          }
          if (buttonRef.current) {
            buttonRef.current.classList.add('animate-fade-in');
            buttonRef.current.style.animationDelay = '0.6s';
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  const handleConnectWallet = async () => {
    if (authenticated) {
      navigate('/dashboard');
    } else {
      login();
    }
  };

  // Dynamically import the Sidebar component to avoid the circular dependency
  const [SidebarComponent, setSidebarComponent] = useState<React.ComponentType<{ isOpen: boolean; onClose: () => void }> | null>(null);

  useEffect(() => {
    // Dynamic import
    import('./Sidebar').then((module) => {
      setSidebarComponent(() => module.default);
    });
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 filter blur-[80px] animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] rounded-full bg-blue-300/10 filter blur-[60px] animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 
          ref={titleRef}
          className="text-balance opacity-0 mb-6"
        >
          <span className="block font-medium text-base md:text-lg text-muted-foreground mb-4">Introducing</span>
          <AnimatedShinyText className="font-bold text-4xl md:text-5xl lg:text-6xl">
            Empower Tomorrow: Your AI Ally on Monad Testnet
          </AnimatedShinyText>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-balance opacity-0 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Aelix combines advanced AI capabilities with the power of Monad blockchain to create a seamless, intuitive experience for managing digital assets.
        </p>
        
        <div 
          ref={buttonRef}
          className="opacity-0 flex flex-col items-center justify-center space-y-4"
        >
          <button 
            onClick={handleConnectWallet}
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:px-10"
          >
            <span className="relative z-10 flex items-center gap-2">
              {authenticated ? "Go to Dashboard" : "Connect Wallet"}
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Learn more
          </button>
        </div>
      </div>
      
      {/* Render the Sidebar component if it's loaded */}
      {SidebarComponent && (
        <SidebarComponent 
          isOpen={isAboutOpen} 
          onClose={() => setIsAboutOpen(false)} 
        />
      )}
    </section>
  );
};

export default Hero;
