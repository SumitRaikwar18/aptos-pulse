
import React from 'react';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        <Activity size={32} className="text-primary mr-2" />
        <span className="text-xl font-bold">AptosPulse</span>
      </div>
    </div>
  );
};

export default Logo;
