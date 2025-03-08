
import axios from 'axios';

// API endpoints
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

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
      privateKey
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message to Monad agent:', error);
    throw new Error('Failed to communicate with the Monad agent');
  }
};
