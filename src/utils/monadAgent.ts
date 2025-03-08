
import axios from 'axios';

// API endpoints
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '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';
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || 'CG-q4ze7yRFSDz6aCKnP18MZ19w';
const MONAD_RPC_URL = import.meta.env.VITE_MONAD_RPC_URL || 'https://testnet-rpc.monad.xyz';

export interface MonadAgentResponse {
  response: string;
}

/**
 * Send a message to the Monad agent
 */
export const sendMessageToAgent = async (
  input: string, 
  privateKey?: string
): Promise<MonadAgentResponse> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/agent`, {
      input,
      privateKey,
      openaiApiKey: OPENAI_API_KEY,
      coingeckoApiKey: COINGECKO_API_KEY,
      monadRpcUrl: MONAD_RPC_URL
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message to Monad agent:', error);
    throw new Error('Failed to communicate with the Monad agent');
  }
};
