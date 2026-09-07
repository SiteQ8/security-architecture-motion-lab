import React from 'react';
import { ShieldAlert, Crosshair, BarChart, ServerCrash } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function TelemetrySection() {
  return (
    <section id="telemetry" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Telemetry & Response</h2>
        <p className="text-muted-foreground leading-relaxed">
          You cannot secure what you cannot see. Centralized logging, SIEM (Security Information and Event Management), and SOAR (Security Orchestration, Automation, and Response) turn raw data into actionable intelligence.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <BarChart className="w-8 h-8 text-primary mb-4" />
          <h4 className="font-bold text-foreground mb-2">Logs & Telemetry</h4>
          <p className="text-sm text-muted-foreground">Gathering VPC flow logs, DNS queries, authentication events, and EDR data into a centralized data lake.</p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <Crosshair className="w-8 h-8 text-warning mb-4" />
          <h4 className="font-bold text-foreground mb-2">SIEM & Detection</h4>
          <p className="text-sm text-muted-foreground">Applying detection engineering rules (YARA, Sigma) to find indicators of compromise (IoCs) in the noise.</p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <ServerCrash className="w-8 h-8 text-destructive mb-4" />
          <h4 className="font-bold text-foreground mb-2">Incident Response</h4>
          <p className="text-sm text-muted-foreground">The structured process (Preparation, Identification, Containment, Eradication, Recovery) executed by the SOC.</p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <ShieldAlert className="w-8 h-8 text-success mb-4" />
          <h4 className="font-bold text-foreground mb-2">SOAR</h4>
          <p className="text-sm text-muted-foreground">Automating the containment phase, such as automatically isolating an infected host from the network.</p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
