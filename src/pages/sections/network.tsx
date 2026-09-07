import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode, TrustBoundary } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';

export function NetworkSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scenario, setScenario] = useState('edge');

  const scenarios = [
    { 
      id: 'edge', 
      name: 'Edge & WAF', 
      description: 'Filtering malicious traffic at the CDN/Edge before it hits the application.'
    },
    { 
      id: 'mesh', 
      name: 'Service Mesh', 
      description: 'Sidecar proxies encrypting (mTLS) and authorizing inter-service communication.'
    }
  ];

  return (
    <section id="network" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Edge, Network & Mesh</h2>
        <p className="text-muted-foreground leading-relaxed">
          The network provides the highways for data. Securing it requires stopping bad traffic far away from your origin (Edge/WAF) 
          and ensuring that traffic inside the cluster is authenticated and encrypted (Service Mesh).
        </p>
      </div>

      <LabCanvas
        title="Traffic Filtering & Encrypted Tunnels"
        description={scenarios.find(s => s.id === scenario)?.description || ''}
        scenarios={scenarios}
        activeScenarioId={scenario}
        onScenarioChange={setScenario}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        {scenario === 'edge' && (
          <>
            <ArchitectureNode id="user1" type="user" label="Valid User" x="10%" y="30%" />
            <ArchitectureNode id="attacker" type="internet" label="Botnet" x="10%" y="70%" status="alert" />
            
            <ArchitectureNode id="waf" type="gateway" label="WAF / CDN" x="45%" y="50%" status="secure" pulse />
            <ArchitectureNode id="origin" type="service" label="Origin API" x="85%" y="50%" />

            <TrustBoundary id="edge-bnd" label="Edge Network" x="35%" y="20%" width="20%" height="60%" type="network" />

            <FlowPath startX="10%" startY="30%" endX="45%" endY="50%" />
            <FlowPath startX="10%" startY="70%" endX="45%" endY="50%" />
            <FlowPath startX="45%" startY="50%" endX="85%" endY="50%" />

            <PacketFlow id="ok-req" type="data" sourceId="user1" targetId="waf" startX="10%" startY="30%" endX="45%" endY="50%" isPlaying={isPlaying} label="GET /" />
            <PacketFlow id="bad-req" type="threat" sourceId="attacker" targetId="waf" startX="10%" startY="70%" endX="45%" endY="50%" isPlaying={isPlaying} delay={0.5} label="SQLi" />
            
            <PacketFlow id="fwd-req" type="data" sourceId="waf" targetId="origin" startX="45%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={1} label="Cleaned" />
            <PacketFlow id="block" type="control" sourceId="waf" targetId="waf" startX="45%" startY="50%" endX="45%" endY="70%" isPlaying={isPlaying} delay={1.5} label="Drop" />
          </>
        )}

        {scenario === 'mesh' && (
          <>
            <ArchitectureNode id="svc-a" type="service" label="Service A" x="25%" y="50%" />
            <ArchitectureNode id="proxy-a" type="security" label="Envoy" x="35%" y="65%" status="secure" />
            
            <ArchitectureNode id="svc-b" type="service" label="Service B" x="75%" y="50%" />
            <ArchitectureNode id="proxy-b" type="security" label="Envoy" x="65%" y="65%" status="secure" />

            <TrustBoundary id="pod-a" label="Pod A" x="15%" y="30%" width="30%" height="50%" type="trust" />
            <TrustBoundary id="pod-b" label="Pod B" x="55%" y="30%" width="30%" height="50%" type="trust" />

            {/* Localhost connections */}
            <FlowPath startX="25%" startY="50%" endX="35%" endY="65%" />
            <FlowPath startX="75%" startY="50%" endX="65%" endY="65%" />
            {/* mTLS connection */}
            <FlowPath startX="35%" startY="65%" endX="65%" endY="65%" status="active" />

            <PacketFlow id="app-req" type="data" sourceId="svc-a" targetId="proxy-a" startX="25%" startY="50%" endX="35%" endY="65%" isPlaying={isPlaying} label="Cleartext" />
            <PacketFlow id="mtls" type="auth" sourceId="proxy-a" targetId="proxy-b" startX="35%" startY="65%" endX="65%" endY="65%" isPlaying={isPlaying} delay={1} label="mTLS Encrypted" />
            <PacketFlow id="app-res" type="data" sourceId="proxy-b" targetId="svc-b" startX="65%" startY="65%" endX="75%" endY="50%" isPlaying={isPlaying} delay={2} label="Cleartext" />
          </>
        )}
      </LabCanvas>
    </section>
  );
}
