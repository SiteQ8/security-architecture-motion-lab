import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Shield, Skull, FileText, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PacketType = 'auth' | 'data' | 'threat' | 'control';

interface PacketFlowProps {
  id: string;
  sourceId: string;
  targetId: string;
  type: PacketType;
  isPlaying: boolean;
  duration?: number;
  repeat?: boolean;
  delay?: number;
  onComplete?: () => void;
  // If we know exactly where nodes are, we can pass percentages for simpler responsive positioning.
  // We assume relative positioning of the parent container.
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  label?: string;
  curve?: 'straight' | 'curved';
}

const packetConfig = {
  auth: { icon: KeyRound, color: 'text-primary', bg: 'bg-primary/20', border: 'border-primary' },
  data: { icon: FileText, color: 'text-foreground', bg: 'bg-secondary', border: 'border-border' },
  threat: { icon: Skull, color: 'text-destructive', bg: 'bg-destructive/20', border: 'border-destructive' },
  control: { icon: Shield, color: 'text-success', bg: 'bg-success/20', border: 'border-success' }
};

export function PacketFlow({
  id,
  type,
  isPlaying,
  duration = 2,
  repeat = true,
  delay = 0,
  onComplete,
  startX,
  startY,
  endX,
  endY,
  label,
  curve = 'straight'
}: PacketFlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = packetConfig[type];
  const Icon = config.icon;

  if (prefersReducedMotion) {
    return (
      <div 
        className={cn("absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center", config.color)}
        style={{ left: endX, top: endY }}
      >
        <div className={cn("p-1.5 rounded-full border", config.bg, config.border)}>
          <Icon className="w-3 h-3" />
        </div>
        {label && <span className="text-[10px] font-mono mt-1 font-bold bg-background/80 px-1 rounded">{label}</span>}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          key={id}
          initial={{ left: startX, top: startY, opacity: 0, scale: 0 }}
          animate={{
            left: [startX, endX],
            top: [startY, endY],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: repeat ? Infinity : 0,
            delay,
            repeatDelay: 1,
            times: [0, 0.2, 0.8, 1]
          }}
          onAnimationComplete={onComplete}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none",
            config.color
          )}
        >
          <div className={cn("p-1.5 rounded-full border shadow-lg backdrop-blur-sm", config.bg, config.border)}>
            <Icon className="w-4 h-4" />
          </div>
          {label && (
            <span className="text-[10px] font-mono mt-1 font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm border border-border/50">
              {label}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Draw static path lines connecting nodes
export function FlowPath({ startX, startY, endX, endY, type = 'solid', status = 'normal' }: { startX: string, startY: string, endX: string, endY: string, type?: 'solid'|'dashed', status?: 'normal'|'blocked'|'active' }) {
  // We use SVG for exact path drawing across the responsive container.
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
      <line 
        x1={startX} y1={startY} x2={endX} y2={endY}
        stroke={status === 'blocked' ? 'hsl(var(--destructive))' : status === 'active' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
        strokeWidth="2"
        strokeDasharray={type === 'dashed' ? '4,4' : 'none'}
        className={cn(
          "transition-colors duration-500",
          status === 'active' && "animate-pulse"
        )}
      />
    </svg>
  );
}
