
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const Documentation: React.FC = () => {
  // Array of documentation sections
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: [
        {
          subtitle: 'What is AptosPulse?',
          text: 'AptosPulse is an advanced autonomous agent framework built specifically for the Aptos blockchain. By leveraging cutting-edge artificial intelligence, AptosPulse enables users to interact with blockchain technology through natural language, making complex operations like token transfers, account monitoring, and transaction scheduling accessible to everyone.'
        },
        {
          subtitle: 'Connecting Your Wallet',
          text: 'To start using AptosPulse, click the "Get Started" button on the homepage. You\'ll be prompted to connect your wallet using Privy. Once connected, you\'ll be redirected to the dashboard where you can start interacting with the AI agent.'
        }
      ]
    },
    {
      id: 'commands',
      title: 'Basic Commands',
      content: [
        {
          subtitle: 'Wallet Management',
          text: 'Initialize your Aptos account with "set-wallet" to enable blockchain interactions. Monitor your wallet balance with "monitor-account" to get automatic alerts when funds drop below threshold.'
        },
        {
          subtitle: 'Token Transfers',
          text: 'Send tokens with "transfer" for instant sends with Explorer URLs. Use "schedule-tx" for timestamp-based transfers, and "batch-transfer" to send tokens to multiple recipients sequentially.'
        },
        {
          subtitle: 'Network Insights',
          text: 'Get live blockchain data with "network-stats" to fetch block height, chain ID, and epoch. Check token prices with "price-feed" which uses CoinGecko\'s API for real-time market data.'
        }
      ]
    },
    {
      id: 'roadmap',
      title: 'Project Roadmap',
      content: [
        {
          subtitle: 'Phase 1: Foundation (Completed)',
          text: 'Core autonomous agent infrastructure is built and ready with wallet integration, account monitoring, smart token transfers, batch transactions, network insights, market-aware operations, and API server setup.'
        },
        {
          subtitle: 'Phase 2: Enhancement & Intelligence',
          text: 'Expanding capabilities with improved monitoring with notifications, gas optimization for transfers, price-triggered transfers, transaction history tracking, and auto-top-up for testnet wallets.'
        },
        {
          subtitle: 'Phase 3: Scalability & Ecosystem Impact',
          text: 'Scaling to a robust multi-agent framework with multi-agent coordination, cross-protocol bridging, agent dashboard, event listener, and agent collaboration hub.'
        }
      ]
    },
    {
      id: 'resources',
      title: 'Additional Resources',
      content: [
        {
          subtitle: 'Aptos Testnet Faucet',
          text: 'Get testnet APT tokens from the faucet with "faucet" or "get testnet tokens". The agent will provide instructions on how to claim tokens from the Aptos testnet faucet.'
        },
        {
          subtitle: 'Help & Support',
          text: 'If you\'re stuck or need assistance, simply type "help" or "support" to get a list of available commands and resources.'
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="pt-20 px-4 md:pt-24 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to interact with the AptosPulse AI agent on Aptos Testnet
            </p>
          </div>

          <div className="flex flex-col space-y-10">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <RevealItem delay={index * 100}>
                  <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
                  
                  <div className="grid gap-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="glass-effect p-6 rounded-xl">
                        <h3 className="text-lg font-medium mb-2">{item.subtitle}</h3>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {index < sections.length - 1 && (
                    <Separator className="mt-10" />
                  )}
                </RevealItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Simple reveal animation component for documentation sections
const RevealItem: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  return (
    <div
      className={cn(
        "opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
};

export default Documentation;
