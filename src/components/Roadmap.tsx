
import React from 'react';
import RevealOnScroll from './ui/RevealOnScroll';

interface RoadmapItem {
  phase: string;
  title: string;
  description: string;
}

const RoadmapItem: React.FC<{ item: RoadmapItem; index: number }> = ({ item, index }) => {
  return (
    <RevealOnScroll delay={index * 100}>
      <div className="relative pl-8 pb-8 border-l border-primary/20 last:border-0 ml-4">
        <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary transform -translate-x-1/2"></div>
        <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">
          {item.phase}
        </span>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-muted-foreground">{item.description}</p>
      </div>
    </RevealOnScroll>
  );
};

const Roadmap: React.FC = () => {
  const roadmapItems: RoadmapItem[] = [
    {
      phase: "Phase 1",
      title: "Launch & Community Building",
      description: "Initial launch of Aelix on Monad testnet with core AI functionality for token creation and asset management."
    },
    {
      phase: "Phase 2",
      title: "Enhanced AI Capabilities",
      description: "Expanding AI capabilities to include predictive analytics, advanced asset management, and intuitive conversational interfaces."
    },
    {
      phase: "Phase 3",
      title: "Mainnet Integration",
      description: "Full integration with Monad mainnet, offering production-ready AI tools for blockchain operations and DeFi management."
    },
    {
      phase: "Phase 4",
      title: "Ecosystem Expansion",
      description: "Partnerships with key DeFi protocols and development of custom AI agents tailored to specific use cases within the Monad ecosystem."
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
            <h2 className="text-balance mb-4">Our Journey Forward</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The evolution of Aelix on the Monad blockchain, from concept to ecosystem.
            </p>
          </div>
        </RevealOnScroll>

        <div className="max-w-3xl mx-auto">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={item.phase} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
