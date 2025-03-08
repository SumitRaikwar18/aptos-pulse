
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      content: 'Hi there! I\'m your AI assistant for Monad blockchain. You can ask me to create tokens, manage assets, or explain blockchain concepts. Try something like "createToken MyToken MTK 1000".',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    // Mock response based on input
    let responseContent = '';
    if (input.toLowerCase().includes('createtoken')) {
      const parts = input.split(' ');
      if (parts.length >= 4) {
        const tokenName = parts[1];
        const tokenSymbol = parts[2];
        const tokenAmount = parts[3];
        responseContent = `Successfully created ${tokenAmount} ${tokenName} (${tokenSymbol}) tokens! Transaction hash: 0x${Math.random().toString(16).substring(2, 42)}`;
      } else {
        responseContent = 'Invalid token creation format. Please use: createToken [name] [symbol] [amount]';
      }
    } else if (input.toLowerCase().includes('help')) {
      responseContent = 'Available commands:\n- createToken [name] [symbol] [amount]\n- balance [address]\n- transfer [token] [recipient] [amount]';
    } else {
      responseContent = `I've processed your request: "${input}". Is there anything specific about Monad blockchain you'd like to know?`;
    }

    const agentMessage: Message = {
      role: 'agent',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage, agentMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Aelix AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command or ask a question..."
            className="flex-1 px-4 py-2 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
