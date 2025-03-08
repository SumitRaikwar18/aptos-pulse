
import React, { useState } from 'react';
import { LucideIcon, Lightbulb, Rocket, Zap, Trophy } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import { cn } from '@/lib/utils';

interface RoadmapItemProps {
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
  status: 'completed' | 'current' | 'upcoming';
  isLast?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ 
  title, 
  description, 
  date, 
  icon: Icon, 
  status, 
  isLast = false 
}) => {
  return (
    <div className="flex relative">
      <div className="flex flex-col items-center mr-6">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full z-10",
          status === 'completed' ? "bg-primary/20 text-primary" :
          status === 'current' ? "bg-primary text-primary-foreground" :
          "bg-secondary text-secondary-foreground"
        )}>
          <Icon size={24} />
        </div>
        {!isLast && (
          <div className={cn(
            "w-0.5 h-full mt-3",
            status === 'completed' ? "bg-primary/60" : "bg-muted"
          )} />
        )}
      </div>
      <div className="pt-1 pb-8">
        <div className="flex items-center mb-1">
          <h3 className="text-xl font-semibold mr-3">{title}</h3>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            status === 'completed' ? "bg-primary/10 text-primary" :
            status === 'current' ? "bg-primary/80 text-primary-foreground" :
            "bg-muted text-muted-foreground"
          )}>
            {status === 'completed' ? 'Completed' : 
             status === 'current' ? 'In Progress' : 'Upcoming'}
          </span>
        </div>
        <time className="block text-sm text-muted-foreground mb-2">{date}</time>
        <p className="text-foreground/80">{description}</p>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const [displayCount, setDisplayCount] = useState(4);
  
  const roadmapItems = [
    {
      title: "Project Inception",
      description: "Initial concept development, team formation, and preparation of Monad Testnet exploration.",
      date: "January 2024",
      icon: Lightbulb,
      status: 'completed' as const,
    },
    {
      title: "Alpha Release",
      description: "First functional version with core wallet features and basic Monad Testnet integration.",
      date: "March 2024",
      icon: Rocket,
      status: 'completed' as const,
    },
    {
      title: "Beta Launch",
      description: "Enhanced capabilities including token creation, automated transactions, and improved UI/UX.",
      date: "June 2024",
      icon: Zap,
      status: 'current' as const,
    },
    {
      title: "Full Platform Release",
      description: "Complete feature set with advanced tools for Monad blockchain interaction and community features.",
      date: "September 2024",
      icon: Trophy,
      status: 'upcoming' as const,
    },
    {
      title: "Ecosystem Expansion",
      description: "Integration with additional blockchain services, cross-chain compatibility, and enterprise tools.",
      date: "December 2024",
      icon: Rocket,
      status: 'upcoming' as const,
    }
  ];
  
  const displayedItems = roadmapItems.slice(0, displayCount);
  const hasMore = displayCount < roadmapItems.length;
  
  return (
    <section id="roadmap" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our development timeline as we build and enhance Aelix for the Monad ecosystem.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="max-w-3xl mx-auto">
          {displayedItems.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 100}>
              <RoadmapItem
                {...item}
                isLast={index === displayedItems.length - 1 && !hasMore}
              />
            </RevealOnScroll>
          ))}
          
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setDisplayCount(roadmapItems.length)}
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
