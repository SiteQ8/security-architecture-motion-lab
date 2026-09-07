import React from 'react';
import { Laptop, Smartphone, Activity, Search } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function EndpointsSection() {
  return (
    <section id="endpoints" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Endpoints & Device Posture</h2>
        <p className="text-muted-foreground leading-relaxed">
          The endpoint is often the starting point of an attack. Modern security relies on checking the health and posture of the device <em>before</em> granting access, and continuously monitoring it using EDR/XDR.
        </p>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-2 gap-8">
        <StaggerItem className="bg-card border border-border rounded-xl p-8 relative overflow-hidden group hover-elevate transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Activity className="w-32 h-32" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <Laptop className="w-6 h-6 text-primary" />
            EDR / XDR
          </h3>
          <p className="text-muted-foreground mb-4">
            Endpoint Detection and Response (EDR) moves beyond signature-based antivirus. It records process executions, registry changes, and network connections, analyzing behavior for anomalies (like ransomware encrypting files).
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Behavioral Analysis</li>
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Automated Isolation</li>
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Deep telemetry collection</li>
          </ul>
        </StaggerItem>

        <StaggerItem className="bg-card border border-border rounded-xl p-8 relative overflow-hidden group hover-elevate transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Search className="w-32 h-32" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-primary" />
            Device Posture
          </h3>
          <p className="text-muted-foreground mb-4">
            Zero Trust architectures query MDM (Mobile Device Management) solutions. A valid username and password isn't enough if the device is unpatched or jailbroken.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-success" /> OS up-to-date</li>
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Disk encrypted (BitLocker/FileVault)</li>
            <li className="flex items-center gap-2 text-foreground/80"><span className="w-1.5 h-1.5 rounded-full bg-destructive" /> Jailbroken / Rooted (Deny Access)</li>
          </ul>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
