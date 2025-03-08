
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Zap, Layers, Network } from 'lucide-react';

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Roadmap</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">🚀</span> Our Journey Forward
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            The evolution of Aelix on the Monad blockchain, from concept to ecosystem.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Phase 1 */}
          <div className="relative bg-card border border-border/30 rounded-xl p-6 shadow-sm">
            <div className="absolute -top-3 left-4 flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border border-green-200">
                <Check size={14} className="text-green-600" />
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                Phase 1
              </span>
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                Completed
              </span>
            </div>
            
            <h3 className="text-xl font-bold mt-3 mb-2">Testnet Launch & Core Features</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Aelix successfully launched on Monad Testnet (Chain ID: 10143) with core AI functionality.
            </p>
            
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Wallet & Transactions:</strong> setWallet, getWalletAddress, getBalance, transferTokens, signMessage, getTransactionHistory</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Gas & Token Tools:</strong> getGasPrice, getTokenPrice, getTrendingTokens, createToken, getFaucetTokens</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Faucet Integration:</strong> Testnet MON tokens claimable via testnet.monad.xyz</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Public Beta Testing:</strong> Core AI tools fully functional & tested</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 2 */}
          <div className="relative bg-card border border-border/30 rounded-xl p-6 shadow-sm">
            <div className="absolute -top-3 left-4 flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 border border-blue-200">
                <Zap size={14} className="text-blue-600" />
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                Phase 2
              </span>
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                In Progress
              </span>
            </div>
            
            <h3 className="text-xl font-bold mt-3 mb-2">Yield Optimization & Advanced AI Capabilities</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Expanding Aelix's AI functionalities to include staking, governance, and yield optimization.
            </p>
            
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>AI-Driven Governance:</strong> Deploy createGovernance for community-based decision-making</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>AI Proposal Engine:</strong> Suggest governance proposals based on user activity & transaction trends</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Staking & Rewards:</strong> Implement stakeTokens for MON and Aelix-created ERC-20 tokens</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Smart Yield Optimization:</strong> AI-powered staking strategies based on real-time gas fees & market conditions</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Token Price Fetching:</strong> Integrated CoinGecko for real-time MONAD price updates</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Multi-Token Support:</strong> Extend transferTokens & getBalance to support custom Aelix ERC-20 tokens</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>AI-Powered Market Insights:</strong> Predict token trends & portfolio optimization strategies</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 3 */}
          <div className="relative bg-card border border-border/30 rounded-xl p-6 shadow-sm">
            <div className="absolute -top-3 left-4 flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-200">
                <Layers size={14} className="text-gray-600" />
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                Phase 3
              </span>
            </div>
            
            <h3 className="text-xl font-bold mt-3 mb-2">Mainnet Integration</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Full integration with Monad mainnet, offering production-ready AI tools for blockchain operations.
            </p>
            
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Risk Model v1:</strong> AI-driven risk assessment for transactions (gas fees vs. token value)</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Mainnet Migration:</strong> Upgrade all AI tools for production-ready blockchain operations</span>
              </li>
            </ul>
          </div>
          
          {/* Phase 4 */}
          <div className="relative bg-card border border-border/30 rounded-xl p-6 shadow-sm">
            <div className="absolute -top-3 left-4 flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-200">
                <Network size={14} className="text-gray-600" />
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                Phase 4
              </span>
            </div>
            
            <h3 className="text-xl font-bold mt-3 mb-2">Ecosystem Expansion</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Partnerships with key DeFi protocols and development of custom AI agents tailored to Monad.
            </p>
            
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Advanced Yield Optimization:</strong> AI-automated yield farming & staking maximization</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
                <span><strong>Ecosystem Partnerships:</strong> Integrate Aelix with Monad-native DeFi platforms (DEXes, lending protocols)</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded border border-muted mt-0.5 mr-2 shrink-0"></div>
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
