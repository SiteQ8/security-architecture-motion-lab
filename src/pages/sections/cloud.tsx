import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode, TrustBoundary } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';

export function CloudSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="cloud" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Cloud & Containers</h2>
        <p className="text-muted-foreground leading-relaxed">
          Cloud security relies on the Shared Responsibility Model. You are responsible for configuring IAM, 
          network ACLs, and securing the container runtime. Misconfigurations (like public S3 buckets) are the #1 cause of cloud breaches.
        </p>
      </div>

      <LabCanvas
        title="Kubernetes / Container Security"
        description="Namespaces, Network Policies, and RBAC limiting container breakouts."
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        <TrustBoundary id="cluster" label="Kubernetes Cluster" x="10%" y="10%" width="80%" height="80%" type="network" />
        
        <TrustBoundary id="ns-web" label="Namespace: Frontend" x="15%" y="30%" width="30%" height="50%" type="trust" />
        <TrustBoundary id="ns-db" label="Namespace: Backend" x="55%" y="30%" width="30%" height="50%" type="trust" />

        <ArchitectureNode id="pod-web" type="service" label="Web Pod" x="30%" y="55%" status="compromised" />
        <ArchitectureNode id="pod-api" type="service" label="API Pod" x="70%" y="45%" />
        <ArchitectureNode id="pod-db" type="database" label="DB Pod" x="70%" y="70%" />
        <ArchitectureNode id="apiserver" type="security" label="Kube API" x="50%" y="20%" status="secure" pulse />

        <FlowPath startX="30%" startY="55%" endX="50%" endY="20%" status="blocked" />
        <FlowPath startX="30%" startY="55%" endX="70%" endY="70%" status="blocked" />
        <FlowPath startX="30%" startY="55%" endX="70%" endY="45%" type="dashed" />
        
        {/* Attacker compromises web pod */}
        <PacketFlow id="c1" type="threat" sourceId="pod-web" targetId="apiserver" startX="30%" startY="55%" endX="50%" endY="20%" isPlaying={isPlaying} label="API Exploit" />
        <PacketFlow id="c1-block" type="control" sourceId="apiserver" targetId="pod-web" startX="50%" startY="20%" endX="40%" endY="35%" isPlaying={isPlaying} delay={0.5} label="RBAC Deny" />

        {/* Lateral movement attempt to DB */}
        <PacketFlow id="c2" type="threat" sourceId="pod-web" targetId="pod-db" startX="30%" startY="55%" endX="70%" endY="70%" isPlaying={isPlaying} delay={1.5} label="Lateral" />
        <PacketFlow id="c2-block" type="control" sourceId="pod-db" targetId="pod-web" startX="70%" startY="70%" endX="50%" endY="62%" isPlaying={isPlaying} delay={2} label="NetworkPolicy Deny" />

        {/* Allowed API communication */}
        <PacketFlow id="c3" type="data" sourceId="pod-web" targetId="pod-api" startX="30%" startY="55%" endX="70%" endY="45%" isPlaying={isPlaying} delay={3} label="Allowed Traffic" />
      </LabCanvas>
    </section>
  );
}
