
import React from 'react';
import { cn } from '@/lib/utils';
import { Cpu, Lock, Zap, Layers, Network } from 'lucide-react';

// Define consistent icon props type
interface IconProps {
  size?: number;
}

// Create custom icon components
const CpuIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <Cpu size={size} />
);

const LockIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <Lock size={size} />
);

const ZapIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <Zap size={size} />
);

const LayersIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <Layers size={size} />
);

const NetworkIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <Network size={size} />
);

// Roadmap data
const roadmapItems = [
  {
    title: "Q2 2024",
    description: "Launch Aelix platform with core AI agent capabilities for Monad blockchain interaction.",
    icon: CpuIcon
  },
  {
    title: "Q3 2024",
    description: "Introduce multi-chain support and enhanced token creation tools with automated verification.",
    icon: NetworkIcon
  },
  {
    title: "Q4 2024",
    description: "Deploy advanced security features and expand to DeFi protocol interactions.",
    icon: LockIcon
  },
  {
    title: "Q1 2025",
    description: "Launch DAO governance system and implement cross-chain bridging capabilities.",
    icon: LayersIcon
  },
  {
    title: "Q2 2025",
    description: "Release developer SDK and open platform for third-party integrations.",
    icon: ZapIcon
  }
];

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Roadmap</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our development timeline and future plans for Aelix on the Monad blockchain
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/70 to-primary/20 transform -translate-x-1/2" />
          
          {/* Roadmap items */}
          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <div key={index} className={cn(
                "flex flex-col md:flex-row items-center md:items-start gap-4",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border border-primary/30 
                  flex items-center justify-center z-10 shadow-lg">
                  <item.icon size={24} />
                </div>
                
                {/* Content */}
                <div className={cn(
                  "flex-1 bg-card border border-border/50 rounded-xl p-5 shadow-md",
                  "transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1",
                  index % 2 === 0 ? "md:mr-10" : "md:ml-10"
                )}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
