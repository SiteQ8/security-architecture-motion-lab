import React from 'react';
import { RefreshCcw, Server, ShieldPlus } from 'lucide-react';

export function ResilienceSection() {
  return (
    <section id="resilience" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Resilience & Recovery</h2>
        <p className="text-muted-foreground leading-relaxed">
          Security isn't just about preventing breaches; it's about minimizing impact when they happen. 
          Ransomware proves that availability is a critical security property.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <RefreshCcw className="w-6 h-6 text-primary" />
          The Backup 3-2-1 Rule
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-background border border-border/50 rounded-lg text-center">
            <span className="block text-4xl font-black text-primary mb-2">3</span>
            <strong className="block text-foreground mb-1">Copies of Data</strong>
            <span className="text-xs text-muted-foreground">The primary production data plus two independent backups.</span>
          </div>
          <div className="p-4 bg-background border border-border/50 rounded-lg text-center">
            <span className="block text-4xl font-black text-primary mb-2">2</span>
            <strong className="block text-foreground mb-1">Different Media</strong>
            <span className="text-xs text-muted-foreground">Store backups on two different types of storage systems.</span>
          </div>
          <div className="p-4 bg-background border border-border/50 rounded-lg text-center">
            <span className="block text-4xl font-black text-primary mb-2">1</span>
            <strong className="block text-foreground mb-1">Offsite / Immutable</strong>
            <span className="text-xs text-muted-foreground">At least one copy must be physically remote or cryptographically immutable (WORM).</span>
          </div>
        </div>
      </div>
    </section>
  );
}
