import React from 'react';
import { Shell } from '@/components/layout/shell';
import { ZeroTrustSection } from './sections/zero-trust';
import { IdentitySection } from './sections/identity';
import { NetworkSection } from './sections/network';
import { AppsSection } from './sections/apps';
import { DataSection } from './sections/data';
import { CloudSection } from './sections/cloud';
import { EndpointsSection } from './sections/endpoints';
import { SupplyChainSection } from './sections/supply-chain';
import { TelemetrySection } from './sections/telemetry';
import { ResilienceSection } from './sections/resilience';
import { GrcSection } from './sections/grc';
import { GlossarySection } from './sections/glossary';

export default function Home() {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 xl:px-20">
        
        <header className="mb-20">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Live Field Guide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Security Architecture <br />
            <span className="text-muted-foreground">Motion Lab</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Make invisible security decisions tangible. Watch identities, requests, data, threats, and controls move through trust boundaries. Understand <em className="text-foreground">why</em> each defense exists.
          </p>
        </header>

        <div className="space-y-32 pb-32">
          <ZeroTrustSection />
          <IdentitySection />
          <NetworkSection />
          <AppsSection />
          <DataSection />
          <CloudSection />
          <EndpointsSection />
          <SupplyChainSection />
          <TelemetrySection />
          <ResilienceSection />
          <GrcSection />
          <GlossarySection />
        </div>

      </div>
    </Shell>
  );
}
