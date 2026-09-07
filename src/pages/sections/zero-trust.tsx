import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode, TrustBoundary } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';
import { Reveal, StaggerGroup, StaggerItem, PulseDot } from '@/components/motion/reveal';

export function ZeroTrustSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scenario, setScenario] = useState('perimeter');

  const scenarios = [
    { 
      id: 'perimeter', 
      name: 'Legacy Perimeter', 
      description: 'Once inside the corporate network boundary, threats can move laterally with minimal resistance.'
    },
    { 
      id: 'zerotrust', 
      name: 'Zero Trust', 
      description: 'Micro-perimeters and continuous verification at every node prevent lateral movement.'
    }
  ];

  return (
    <section id="zero-trust" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Zero Trust & Boundaries</h2>
        <p className="text-muted-foreground leading-relaxed">
          The core premise of modern security architecture is that <strong className="text-foreground">trust is a vulnerability</strong>. 
          Legacy architectures assumed that everything inside the corporate network was safe (the "M&M" model: hard on the outside, soft on the inside). 
          Zero Trust dictates that we must "never trust, always verify" regardless of where a request originates.
        </p>
      </Reveal>

      <LabCanvas
        title="Lateral Movement Dynamics"
        description="Compare threat propagation in perimeter vs. zero trust architectures."
        scenarios={scenarios}
        activeScenarioId={scenario}
        onScenarioChange={setScenario}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        {/* Shared Nodes */}
        <ArchitectureNode id="attacker" type="internet" label="Attacker" x="10%" y="50%" status="alert" />
        <ArchitectureNode id="web" type="service" label="Web App" x="40%" y="50%" status={scenario === 'perimeter' ? 'compromised' : 'alert'} pulse={scenario === 'zerotrust'} />
        <ArchitectureNode id="db" type="database" label="Core DB" x="70%" y="30%" status={scenario === 'perimeter' ? 'compromised' : 'secure'} />
        <ArchitectureNode id="internal" type="service" label="Internal API" x="70%" y="70%" status={scenario === 'perimeter' ? 'compromised' : 'secure'} />

        {scenario === 'perimeter' && (
          <>
            <TrustBoundary id="corp-net" label="Corporate Network (Implicit Trust)" x="25%" y="10%" width="60%" height="80%" type="network" status="breached" />
            
            <FlowPath startX="10%" startY="50%" endX="40%" endY="50%" status="blocked" />
            <FlowPath startX="40%" startY="50%" endX="70%" endY="30%" status="blocked" />
            <FlowPath startX="40%" startY="50%" endX="70%" endY="70%" status="blocked" />

            {/* Initial breach */}
            <PacketFlow id="p1" type="threat" sourceId="attacker" targetId="web" startX="10%" startY="50%" endX="40%" endY="50%" isPlaying={isPlaying} label="Exploit" />
            
            {/* Lateral movement (easy) */}
            <PacketFlow id="p2" type="threat" sourceId="web" targetId="db" startX="40%" startY="50%" endX="70%" endY="30%" isPlaying={isPlaying} delay={1} label="Lateral" />
            <PacketFlow id="p3" type="threat" sourceId="web" targetId="internal" startX="40%" startY="50%" endX="70%" endY="70%" isPlaying={isPlaying} delay={1.5} label="Lateral" />
          </>
        )}

        {scenario === 'zerotrust' && (
          <>
            <TrustBoundary id="web-env" label="Web Segment" x="30%" y="35%" width="20%" height="30%" type="trust" />
            <TrustBoundary id="data-env" label="Data Segment" x="60%" y="15%" width="20%" height="30%" type="trust" />
            <TrustBoundary id="api-env" label="Internal Segment" x="60%" y="55%" width="20%" height="30%" type="trust" />
            
            <FlowPath startX="10%" startY="50%" endX="40%" endY="50%" status="blocked" />
            <FlowPath startX="40%" startY="50%" endX="70%" endY="30%" status="normal" type="dashed" />
            <FlowPath startX="40%" startY="50%" endX="70%" endY="70%" status="normal" type="dashed" />

            {/* Initial breach attempt */}
            <PacketFlow id="zt1" type="threat" sourceId="attacker" targetId="web" startX="10%" startY="50%" endX="40%" endY="50%" isPlaying={isPlaying} label="Exploit" />
            
            {/* Blocked lateral movement */}
            <PacketFlow id="zt2" type="control" sourceId="web" targetId="db" startX="40%" startY="50%" endX="55%" endY="40%" isPlaying={isPlaying} delay={1} label="Denied" />
            <PacketFlow id="zt3" type="control" sourceId="web" targetId="internal" startX="40%" startY="50%" endX="55%" endY="60%" isPlaying={isPlaying} delay={1.2} label="Denied" />
          </>
        )}
      </LabCanvas>

      <StaggerGroup className="grid md:grid-cols-2 gap-6 mt-8">
        <StaggerItem className="bg-card border border-border p-6 rounded-xl hover-elevate transition-all">
          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <PulseDot className="text-primary" />
            Micro-segmentation
          </h4>
          <p className="text-sm text-muted-foreground">
            Dividing the network into isolated segments so that if one is compromised, the blast radius is contained. Firewalls and policies dictate exact permitted communication paths.
          </p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-6 rounded-xl hover-elevate transition-all">
          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <PulseDot className="text-primary" />
            Continuous Verification
          </h4>
          <p className="text-sm text-muted-foreground">
            Authenticating and authorizing every connection, evaluating identity, device posture, context, and anomalies before granting access—every single time.
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
