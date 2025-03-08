
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ChatInterface from '../components/ChatInterface';
import { usePrivy } from '@privy-io/react-auth';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, authenticated, logout } = usePrivy();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authenticated) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please connect your wallet to access the dashboard.",
        variant: "destructive"
      });
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    return null;
  }

  return (
    <MainLayout>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome to Aelix Dashboard</h1>
            <p className="text-muted-foreground">
              Your AI assistant for Monad blockchain operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-[600px]">
                <ChatInterface />
              </div>
            </div>
            
            <div>
              <div className="glass-effect rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Connected as</div>
                    <div className="font-medium truncate">{user?.wallet?.address}</div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => logout()}
                      className="w-full px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
