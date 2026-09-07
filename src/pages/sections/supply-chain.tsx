import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';
import { Reveal } from '@/components/motion/reveal';

export function SupplyChainSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="supply-chain" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Supply Chain & DevSecOps</h2>
        <p className="text-muted-foreground leading-relaxed">
          Attackers increasingly target the CI/CD pipeline rather than the production environment. 
          If they can inject malicious code during the build, it gets deployed automatically with a high level of trust.
        </p>
      </Reveal>

      <Reveal>
        <LabCanvas
        title="Secure CI/CD Pipeline"
        description="Scanning code, building artifacts, generating SBOMs, and signing images before deployment."
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        <ArchitectureNode id="dev" type="user" label="Developer" x="10%" y="50%" />
        <ArchitectureNode id="scm" type="service" label="Git Repo" x="30%" y="50%" />
        <ArchitectureNode id="ci" type="service" label="CI/CD Runner" x="55%" y="50%" />
        <ArchitectureNode id="registry" type="database" label="Image Registry" x="85%" y="50%" />
        
        <ArchitectureNode id="scan" type="security" label="SAST/SCA" x="40%" y="20%" status="secure" pulse />
        <ArchitectureNode id="signer" type="security" label="Cosign" x="70%" y="20%" status="secure" pulse />

        <FlowPath startX="10%" startY="50%" endX="30%" endY="50%" />
        <FlowPath startX="30%" startY="50%" endX="55%" endY="50%" />
        <FlowPath startX="55%" startY="50%" endX="85%" endY="50%" />
        <FlowPath startX="55%" startY="50%" endX="40%" endY="20%" type="dashed" />
        <FlowPath startX="55%" startY="50%" endX="70%" endY="20%" type="dashed" />

        <PacketFlow id="commit" type="data" sourceId="dev" targetId="scm" startX="10%" startY="50%" endX="30%" endY="50%" isPlaying={isPlaying} label="git push" />
        <PacketFlow id="trigger" type="data" sourceId="scm" targetId="ci" startX="30%" startY="50%" endX="55%" endY="50%" isPlaying={isPlaying} delay={1} label="Webhook" />
        
        <PacketFlow id="do-scan" type="auth" sourceId="ci" targetId="scan" startX="55%" startY="50%" endX="40%" endY="20%" isPlaying={isPlaying} delay={2} label="Code Scan" />
        <PacketFlow id="scan-ok" type="control" sourceId="scan" targetId="ci" startX="40%" startY="20%" endX="55%" endY="50%" isPlaying={isPlaying} delay={2.5} label="0 High Vulns" />

        <PacketFlow id="do-sign" type="auth" sourceId="ci" targetId="signer" startX="55%" startY="50%" endX="70%" endY="20%" isPlaying={isPlaying} delay={3.5} label="Sign Image" />
        <PacketFlow id="sign-ok" type="control" sourceId="signer" targetId="ci" startX="70%" startY="20%" endX="55%" endY="50%" isPlaying={isPlaying} delay={4} label="SBOM + Sig" />

        <PacketFlow id="push" type="data" sourceId="ci" targetId="registry" startX="55%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={5} label="Signed Container" />
        </LabCanvas>
      </Reveal>
    </section>
  );
}
