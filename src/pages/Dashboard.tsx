
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ChatInterface from '../components/ChatInterface';
import { usePrivy } from '@privy-io/react-auth';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { authenticated, logout } = usePrivy();
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
      <div className="py-8 px-4 md:py-12 md:px-6 lg:py-16 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Aelix Dashboard</h1>
            <p className="text-muted-foreground">
              Your AI assistant for Monad blockchain operations
            </p>
          </div>
          
          <div className="mx-auto w-full max-w-4xl">
            <div className="h-[70vh] max-h-[700px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
