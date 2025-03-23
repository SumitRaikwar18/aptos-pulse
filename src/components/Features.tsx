
import React, { useState } from 'react';
import { 
  Wallet, 
  Coins, 
  Bell, 
  Send, 
  Clock, 
  Users, 
  BarChart, 
  DollarSign, 
  ClipboardCheck, 
  HelpCircle 
} from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import FeatureCard from './FeatureCard';
import { cn } from '@/lib/utils';

const Features: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const features = [
    {
      icon: Bell,
      title: "Real-Time Account Monitoring",
      description: "Instant alerts for low balances, keeping your agents aware at all times.",
      category: "monitoring"
    },
    {
      icon: Send,
      title: "Smart Token Transfers",
      description: "Send tokens now or schedule for later with automatic Explorer links.",
      category: "transactions"
    },
    {
      icon: Users,
      title: "Batch Transaction Power",
      description: "Multi-recipient transfers made simple with sequential execution.",
      category: "transactions"
    },
    {
      icon: BarChart,
      title: "Network Insights",
      description: "Live Aptos blockchain stats for smarter agent decision-making.",
      category: "data"
    },
    {
      icon: DollarSign,
      title: "Market-Aware Operations",
      description: "Free token price feeds from CoinGecko for market-responsive actions.",
      category: "data"
    },
    {
      icon: Wallet,
      title: "Wallet Management",
      description: "Easy wallet setup in one command to enable blockchain interactions.",
      category: "wallet"
    },
    {
      icon: Coins,
      title: "Balance Check",
      description: "Instant APT balance updates to keep your agents informed.",
      category: "wallet"
    },
    {
      icon: Clock,
      title: "Scheduled Transfers",
      description: "Set up time-based token transfers with automatic execution.",
      category: "transactions"
    },
    {
      icon: ClipboardCheck,
      title: "Transaction Tracking",
      description: "View transaction status with direct links to Aptos Explorer.",
      category: "transactions"
    },
    {
      icon: HelpCircle,
      title: "Command Hub",
      description: "Full control with a simple help menu for all available commands.",
      category: "resources"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Features' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'data', label: 'Data & Insights' },
    { id: 'resources', label: 'Resources' }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <section id="features" className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">Features</span>
            <h2 className="text-balance mb-4">Blockchain Simplified with AI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Experience the future of blockchain interaction through our advanced AI agent built specifically for Aptos.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="mb-10 flex justify-center">
            <div className="flex flex-wrap gap-2 bg-background/50 backdrop-blur-sm p-1 rounded-full border border-border/40">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full transition-all",
                    activeCategory === category.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-background"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 50}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
