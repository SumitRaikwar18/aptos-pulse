
import React from 'react';
import { Shield, Clock, LineChart, Zap } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <RevealOnScroll delay={delay}>
      <div className="glass-effect rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </RevealOnScroll>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield size={24} />,
      title: "Secure by Design",
      description: "Built with security and privacy at its core, ensuring your data stays protected at all times."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Optimized performance that responds instantly to your interactions, never keeping you waiting."
    },
    {
      icon: <LineChart size={24} />,
      title: "Insightful Analytics",
      description: "Gain valuable insights through beautifully designed, easy-to-understand visualizations."
    },
    {
      icon: <Clock size={24} />,
      title: "Time-Saving Automation",
      description: "Intelligent automation that handles repetitive tasks, letting you focus on what matters."
    }
  ];

  return (
    <section id="features" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">Features</span>
            <h2 className="text-balance mb-4">Crafted with Attention to Detail</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every feature is thoughtfully designed to enhance your experience, combining beauty with functionality.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
