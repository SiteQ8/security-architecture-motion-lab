import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface LabScenario {
  id: string;
  name: string;
  description: string;
  action?: () => void;
}

interface LabCanvasProps {
  title: string;
  description: string;
  scenarios?: LabScenario[];
  activeScenarioId?: string;
  onScenarioChange?: (id: string) => void;
  children: ReactNode;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
}

export function LabCanvas({
  title,
  description,
  scenarios = [],
  activeScenarioId,
  onScenarioChange,
  children,
  isPlaying = true,
  onTogglePlay,
  onReset
}: LabCanvasProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-xl border border-border bg-card shadow-xl overflow-hidden flex flex-col my-8">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-card-foreground text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          {prefersReducedMotion && (
            <div className="text-xs text-warning bg-warning/10 px-2 py-1 rounded flex items-center gap-1 mr-2">
              <AlertTriangle className="w-3 h-3" />
              Reduced Motion On
            </div>
          )}
          {onReset && (
            <button 
              onClick={onReset}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              title="Reset Scenario"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          {onTogglePlay && (
            <button 
              onClick={onTogglePlay}
              className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors flex items-center gap-2 font-medium text-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {/* Scenarios Tabs */}
      {scenarios.length > 0 && (
        <div className="flex items-center border-b border-border bg-sidebar overflow-x-auto">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => onScenarioChange?.(s.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                activeScenarioId === s.id 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Canvas Area */}
      <div className="relative w-full aspect-video bg-[#0a0a0f] bg-grid-pattern overflow-hidden p-6 md:p-12">
        <div className="w-full h-full relative">
          {children}
        </div>
      </div>
      
      {/* Active Scenario Description */}
      {activeScenarioId && scenarios.find(s => s.id === activeScenarioId)?.description && (
        <div className="p-4 bg-muted/20 border-t border-border text-sm text-card-foreground">
          <p className="font-mono text-xs text-primary mb-1 uppercase tracking-wider">Scenario Active</p>
          {scenarios.find(s => s.id === activeScenarioId)?.description}
        </div>
      )}
    </div>
  );
}
