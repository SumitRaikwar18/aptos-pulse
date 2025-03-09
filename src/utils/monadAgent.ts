
import axios from 'axios';

// API endpoints - use environment variables with proper fallbacks
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://your-backend-url.com'; // This should be your actual backend URL, not localhost
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || '';
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
    console.log('Sending request to:', API_ENDPOINT);
    
    // Set up request configuration with proper CORS headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    // Prepare request payload
    const payload = {
      input,
      privateKey,
      openaiApiKey: OPENAI_API_KEY,
      coingeckoApiKey: COINGECKO_API_KEY,
      monadRpcUrl: MONAD_RPC_URL
    };
    
    console.log('Request payload (without sensitive data):', {
      input,
      hasPrivateKey: !!privateKey,
      hasOpenAiKey: !!OPENAI_API_KEY,
      hasCoingeckoKey: !!COINGECKO_API_KEY,
      monadRpcUrl: MONAD_RPC_URL
    });
    
    // Send the request
    const response = await axios.post(`${API_ENDPOINT}/agent`, payload, config);
    
    console.log('Response received:', {
      status: response.status,
      hasData: !!response.data
    });
    
    return response.data;
  } catch (error) {
    // Enhanced error logging
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    } else {
      console.error('Error sending message to Monad agent:', error);
    }
    
    throw new Error('Failed to communicate with the Monad agent. Please check the server connection.');
  }
};
