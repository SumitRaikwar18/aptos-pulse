
import React from 'react';
import RevealOnScroll from './ui/RevealOnScroll';
import { CheckIcon, Clock, Calendar, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface RoadmapPhase {
  status: 'completed' | 'in-progress' | 'upcoming' | 'future';
  phase: string;
  title: string;
  description: string;
  items: Array<{
    text: string;
    completed: boolean;
  }>;
  icon: LucideIcon;
}

const RoadmapItem: React.FC<{ phase: RoadmapPhase; index: number }> = ({ phase, index }) => {
  const Icon = phase.icon;
  
  return (
    <RevealOnScroll delay={index * 100}>
      <div className="relative pl-8 pb-12 border-l border-primary/20 last:border-0 ml-4">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transform -translate-x-1/2">
          <Icon size={16} className="text-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={cn(
            "inline-block px-3 py-1 text-xs font-medium rounded-full",
            phase.status === 'completed' ? "bg-green-500/10 text-green-500" :
            phase.status === 'in-progress' ? "bg-amber-500/10 text-amber-500" :
            phase.status === 'upcoming' ? "bg-blue-500/10 text-blue-500" :
            "bg-purple-500/10 text-purple-500"
          )}>
            {phase.phase}
          </span>
          {phase.status === 'completed' && 
            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded-full">
              Completed
            </span>
          }
          {phase.status === 'in-progress' && 
            <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-500 rounded-full">
              In Progress
            </span>
          }
        </div>
        <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
        <p className="text-muted-foreground mb-4">{phase.description}</p>
        
        <ul className="space-y-2">
          {phase.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              {item.completed ? (
                <CheckIcon size={16} className="text-green-500 mt-1 shrink-0" />
              ) : (
                <div className="w-4 h-4 border border-muted-foreground/40 rounded mt-0.5 shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                item.completed ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </RevealOnScroll>
  );
};

// Helper function for className conditional joining
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Roadmap: React.FC = () => {
  const roadmapPhases: RoadmapPhase[] = [
    {
      status: 'completed',
      phase: "Phase 1",
      title: "Foundation (Completed)",
      description: "Core autonomous agent infrastructure for Aptos, ready for production use.",
      icon: CheckIcon,
      items: [
        { text: "Built core agent with wallet setup (set-wallet) and balance check (balance)", completed: true },
        { text: "Added real-time monitoring (monitor-account) with balance alerts", completed: true },
        { text: "Implemented instant (transfer) and scheduled (schedule-tx) token transfers with Explorer URLs", completed: true },
        { text: "Enabled batch transfers (batch-transfer) for multiple recipients", completed: true },
        { text: "Integrated network stats (network-stats) and price feeds (price-feed)", completed: true },
        { text: "Set up Express server for command access (help included)", completed: true }
      ]
    },
    {
      status: 'in-progress',
      phase: "Phase 2",
      title: "Enhancement & Intelligence",
      description: "Adding intelligent decision-making and broader ecosystem integration to elevate AptosPulse's capabilities.",
      icon: Clock,
      items: [
        { text: "Upgrade monitoring with configurable intervals and Discord alerts", completed: false },
        { text: "Optimize transfer gas fees using network stats", completed: false },
        { text: "Add price-triggered transfers (e.g., 'send when APT > $10')", completed: false },
        { text: "Introduce transaction history lookup (history)", completed: false },
        { text: "Implement auto-top-up from Testnet faucet (auto-top-up)", completed: false }
      ]
    },
    {
      status: 'upcoming',
      phase: "Phase 3",
      title: "Scalability & Ecosystem Impact",
      description: "Scaling AptosPulse into a robust, multi-agent framework with ecosystem-wide benefits for Aptos.",
      icon: Calendar,
      items: [
        { text: "Enable true batch transfers via Move script for gas efficiency", completed: false },
        { text: "Integrate cross-chain bridging (e.g., Stargate Testnet)", completed: false },
        { text: "Build a real-time agent dashboard (HTML frontend)", completed: false },
        { text: "Add blockchain event listener (events) for live updates", completed: false },
        { text: "Create agent collaboration hub (collaborate) for multi-instance coordination", completed: false }
      ]
    }
  ];

  return (
    <section id="roadmap" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
              Roadmap
            </span>
            <h2 className="text-balance mb-4">🚀 Our Journey Forward</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The evolution of AptosPulse on the Aptos blockchain, from concept to ecosystem.
            </p>
          </div>
        </RevealOnScroll>

        <div className="max-w-3xl mx-auto">
          {roadmapPhases.map((phase, index) => (
            <RoadmapItem key={phase.phase} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
