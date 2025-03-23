
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon, BookOpen, Activity } from 'lucide-react';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { AnimatedGradientText } from './ui/AnimatedGradientText';
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
  
  const handleGetStarted = async () => {
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
      className="relative pt-4 min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 filter blur-[80px] animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] rounded-full bg-blue-300/10 filter blur-[60px] animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h1 
          ref={titleRef}
          className="text-balance opacity-0 mb-6"
        >
          <span className="block font-medium text-base md:text-lg text-muted-foreground mb-2 sm:mb-4">
            <Activity className="inline-block mr-2" size={20} />
            Introducing AptosPulse | Autonomous Agents for Aptos
          </span>
          <AnimatedShinyText className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <AnimatedGradientText>
              Empower the Future: Autonomous Agents for the Aptos Ecosystem
            </AnimatedGradientText>
          </AnimatedShinyText>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-balance opacity-0 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          AptosPulse combines advanced autonomous agent capabilities with the power of Aptos blockchain to create a seamless, intuitive experience for managing digital assets.
        </p>
        
        <div 
          ref={buttonRef}
          className="opacity-0 flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="group relative overflow-hidden rounded-full bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:px-10"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                Get Started
                <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            
            <button 
              onClick={() => navigate('/documentation')}
              className="group relative overflow-hidden rounded-full bg-secondary px-6 sm:px-8 py-2.5 sm:py-3 text-secondary-foreground transition-all duration-300 hover:bg-secondary/90"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                Documentation
                <BookOpen size={16} className="sm:size-18 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
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
