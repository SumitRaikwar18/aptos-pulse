
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Zap, Layers, Network } from 'lucide-react';

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Our Journey Forward</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The evolution of Aelix on the Monad blockchain, from concept to ecosystem.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Phase 1 */}
          <div className="relative bg-card border border-border/50 rounded-xl p-6 shadow-md">
            <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Phase 1
            </div>
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Check size={14} className="mr-1" />
              Completed
            </div>
            <h3 className="text-xl font-bold mt-4 mb-3">Testnet Launch & Core Features</h3>
            <p className="text-muted-foreground mb-4">
              Aelix successfully launched on Monad Testnet (Chain ID: 10143) with core AI functionality.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                <span><strong>Wallet & Transactions:</strong> setWallet, getWalletAddress, getBalance, transferTokens, signMessage, getTransactionHistory</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                <span><strong>Gas & Token Tools:</strong> getGasPrice, getTokenPrice, getTrendingTokens, createToken, getFaucetTokens</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                <span><strong>Faucet Integration:</strong> Testnet MON tokens claimable via testnet.monad.xyz</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                <span><strong>Public Beta Testing:</strong> Core AI tools fully functional & tested</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 2 */}
          <div className="relative bg-card border border-border/50 rounded-xl p-6 shadow-md">
            <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Phase 2
            </div>
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Zap size={14} className="mr-1" />
              In Progress
            </div>
            <h3 className="text-xl font-bold mt-4 mb-3">Yield Optimization & Advanced AI Capabilities</h3>
            <p className="text-muted-foreground mb-4">
              Expanding Aelix's AI functionalities to include staking, governance, and yield optimization.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>AI-Driven Governance:</strong> Deploy createGovernance for community-based decision-making</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>AI Proposal Engine:</strong> Suggest governance proposals based on user activity & transaction trends</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>Staking & Rewards:</strong> Implement stakeTokens for MON and Aelix-created ERC-20 tokens</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>Smart Yield Optimization:</strong> AI-powered staking strategies based on real-time gas fees & market conditions</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>Token Price Fetching:</strong> Integrated CoinGecko for real-time MONAD price updates</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>Multi-Token Support:</strong> Extend transferTokens & getBalance to support custom Aelix ERC-20 tokens</span>
              </li>
              <li className="flex items-start">
                <Network size={16} className="text-blue-500 mr-2 mt-0.5" />
                <span><strong>AI-Powered Market Insights:</strong> Predict token trends & portfolio optimization strategies</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 3 */}
          <div className="relative bg-card border border-border/50 rounded-xl p-6 shadow-md">
            <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Phase 3
            </div>
            <h3 className="text-xl font-bold mt-4 mb-3">Mainnet Integration</h3>
            <p className="text-muted-foreground mb-4">
              Full integration with Monad mainnet, offering production-ready AI tools for blockchain operations.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Layers size={16} className="text-gray-500 mr-2 mt-0.5" />
                <span><strong>Risk Model v1:</strong> AI-driven risk assessment for transactions (gas fees vs. token value)</span>
              </li>
              <li className="flex items-start">
                <Layers size={16} className="text-gray-500 mr-2 mt-0.5" />
                <span><strong>Mainnet Migration:</strong> Upgrade all AI tools for production-ready blockchain operations</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 4 */}
          <div className="relative bg-card border border-border/50 rounded-xl p-6 shadow-md">
            <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Phase 4
            </div>
            <h3 className="text-xl font-bold mt-4 mb-3">Ecosystem Expansion</h3>
            <p className="text-muted-foreground mb-4">
              Partnerships with key DeFi protocols and development of custom AI agents tailored to Monad.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Layers size={16} className="text-gray-500 mr-2 mt-0.5" />
                <span><strong>Advanced Yield Optimization:</strong> AI-automated yield farming & staking maximization</span>
              </li>
              <li className="flex items-start">
                <Layers size={16} className="text-gray-500 mr-2 mt-0.5" />
                <span><strong>Ecosystem Partnerships:</strong> Integrate Aelix with Monad-native DeFi platforms (DEXes, lending protocols)</span>
              </li>
              <li className="flex items-start">
                <Layers size={16} className="text-gray-500 mr-2 mt-0.5" />
                <span><strong>Custom AI Agents:</strong> Specialized AI-driven bots for trading, lending, and governance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
