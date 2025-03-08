
import React from 'react';
import { Shield, Sparkles, LineChart, Zap, Bolt, Command } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      icon: Command,
      title: "AI-Powered Token Creation",
      description: "Create custom tokens on Monad blockchain with simple natural language commands, no coding required."
    },
    {
      icon: Sparkles,
      title: "Intelligent Asset Management",
      description: "Manage your portfolio with AI-driven insights, recommendations, and automated operations."
    },
    {
      icon: Bolt,
      title: "Lightning Fast Transactions",
      description: "Execute transactions on Monad's high-performance blockchain with minimal latency and maximum efficiency."
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Built with security and privacy at its core, ensuring your assets and data stay protected on the blockchain."
    }
  ];

  return (
    <section id="features" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">Features</span>
            <h2 className="text-balance mb-4">Blockchain Simplified with AI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Experience the future of blockchain interaction through our advanced AI agent built specifically for Monad.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 100}>
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
