
import React, { useState, useRef, useEffect } from 'react';
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-medium text-center">Chat Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] px-3 py-2 md:px-4 md:py-3 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm' 
                  : 'bg-muted/70 text-foreground rounded-2xl rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm md:text-base">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command or ask a question..."
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-full bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10 md:pr-12 text-sm md:text-base"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="Send message"
          >
            <Send size={16} className="md:size-[18px]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
