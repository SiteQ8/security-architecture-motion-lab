import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, User, Server, Database, Shield, Globe, Smartphone, Lock } from 'lucide-react';

interface NodeProps {
  id: string;
  type: 'user' | 'service' | 'database' | 'security' | 'internet' | 'device' | 'gateway';
  label: string;
  x: number | string;
  y: number | string;
  status?: 'normal' | 'alert' | 'secure' | 'compromised';
  pulse?: boolean;
}

const icons: Record<NodeProps['type'], LucideIcon> = {
  user: User,
  service: Server,
  database: Database,
  security: Shield,
  internet: Globe,
  device: Smartphone,
  gateway: Lock,
};

const statusColors = {
  normal: 'border-border text-foreground bg-card',
  alert: 'border-warning text-warning-foreground bg-warning/20',
  secure: 'border-success text-success-foreground bg-success/20',
  compromised: 'border-destructive text-destructive-foreground bg-destructive/20',
};

export function ArchitectureNode({ id, type, label, x, y, status = 'normal', pulse = false }: NodeProps) {
  const Icon = icons[type];

  return (
    <motion.div
      id={`node-${id}`}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20"
      style={{ left: x, top: y }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.4 }}
    >
      <div className={cn(
        "relative w-12 h-12 rounded-lg border-2 flex items-center justify-center backdrop-blur-md shadow-lg",
        statusColors[status]
      )}>
        <Icon className="w-6 h-6" />
        {pulse && (
          <span className="absolute inset-0 rounded-lg flex h-full w-full">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-lg opacity-40",
              status === 'alert' ? 'bg-warning' : 
              status === 'secure' ? 'bg-success' : 
              status === 'compromised' ? 'bg-destructive' : 'bg-primary'
            )}></span>
          </span>
        )}
      </div>
      <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono font-medium border border-border/50 whitespace-nowrap shadow-sm backdrop-blur-sm">
        {label}
      </div>
    </motion.div>
  );
}

interface BoundaryProps {
  id: string;
  label: string;
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  type?: 'trust' | 'network' | 'physical';
  status?: 'intact' | 'breached';
}

export function TrustBoundary({ id, label, x, y, width, height, type = 'trust', status = 'intact' }: BoundaryProps) {
  return (
    <motion.div
      className={cn(
        "absolute border-2 rounded-xl z-10 flex flex-col bg-opacity-5 pointer-events-none",
        type === 'trust' ? 'border-dashed border-primary/40 bg-primary' :
        type === 'network' ? 'border-solid border-secondary-foreground/20 bg-secondary' :
        'border-dotted border-muted-foreground/30 bg-muted',
        status === 'breached' && 'border-destructive/60 bg-destructive/10'
      )}
      style={{ left: x, top: y, width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-2 w-full text-xs font-mono tracking-wider font-semibold opacity-70 uppercase">
        {label}
      </div>
    </motion.div>
  );
}
