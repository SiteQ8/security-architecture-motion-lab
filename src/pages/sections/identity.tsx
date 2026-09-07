import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode, TrustBoundary } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';
import { Reveal, StaggerGroup, StaggerItem, PulseDot } from '@/components/motion/reveal';

export function IdentitySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scenario, setScenario] = useState('standard');

  const scenarios = [
    { 
      id: 'standard', 
      name: 'SSO & MFA', 
      description: 'User authenticates via Identity Provider with MFA, receiving a token for service access.'
    },
    { 
      id: 'pam', 
      name: 'Privileged Access (PAM)', 
      description: 'Admin requests just-in-time, temporary elevated privileges checked out from a vault.'
    }
  ];

  return (
    <section id="identity" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Identity & Privileged Access</h2>
        <p className="text-muted-foreground leading-relaxed">
          Identity is the new perimeter. Who you are, what you are trying to access, and the context of your request 
          (location, device health, time of day) are the primary determinants of trust. 
        </p>
      </Reveal>

      <LabCanvas
        title="Identity Flows"
        description="Authentication and Authorization patterns in modern architecture."
        scenarios={scenarios}
        activeScenarioId={scenario}
        onScenarioChange={setScenario}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        {scenario === 'standard' && (
          <>
            <ArchitectureNode id="user" type="user" label="Employee" x="15%" y="50%" />
            <ArchitectureNode id="idp" type="security" label="IdP (Okta/Entra)" x="50%" y="20%" status="secure" pulse />
            <ArchitectureNode id="app" type="service" label="SaaS App" x="85%" y="50%" />

            <FlowPath startX="15%" startY="50%" endX="50%" endY="20%" />
            <FlowPath startX="50%" startY="20%" endX="85%" endY="50%" />
            <FlowPath startX="15%" startY="50%" endX="85%" endY="50%" type="dashed" />

            <PacketFlow id="auth-req" type="auth" sourceId="user" targetId="idp" startX="15%" startY="50%" endX="50%" endY="20%" isPlaying={isPlaying} label="Auth Request" />
            <PacketFlow id="mfa" type="control" sourceId="idp" targetId="user" startX="50%" startY="20%" endX="15%" endY="50%" isPlaying={isPlaying} delay={1} label="MFA Prompt" />
            <PacketFlow id="token" type="auth" sourceId="user" targetId="app" startX="15%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={2} label="JWT Token" />
          </>
        )}

        {scenario === 'pam' && (
          <>
            <ArchitectureNode id="admin" type="user" label="SRE Admin" x="15%" y="50%" />
            <ArchitectureNode id="vault" type="security" label="PAM Vault" x="50%" y="50%" status="secure" pulse />
            <ArchitectureNode id="prod" type="database" label="Prod DB" x="85%" y="50%" />
            
            <TrustBoundary id="secure-zone" label="Management Plane" x="40%" y="20%" width="20%" height="60%" type="trust" />

            <FlowPath startX="15%" startY="50%" endX="50%" endY="50%" />
            <FlowPath startX="50%" startY="50%" endX="85%" endY="50%" />

            <PacketFlow id="jit-req" type="auth" sourceId="admin" targetId="vault" startX="15%" startY="50%" endX="50%" endY="50%" isPlaying={isPlaying} label="JIT Request" />
            <PacketFlow id="approval" type="control" sourceId="vault" targetId="vault" startX="50%" startY="50%" endX="50%" endY="30%" isPlaying={isPlaying} delay={1} label="Verify Policy" />
            <PacketFlow id="session" type="data" sourceId="vault" targetId="prod" startX="50%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={2} label="Ephemeral Session" />
          </>
        )}
      </LabCanvas>

      <StaggerGroup className="grid md:grid-cols-3 gap-6 mt-8">
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2"><PulseDot className="text-destructive" />MFA Bypass</h4>
          <p className="text-sm text-muted-foreground">Attackers use fatigue (spamming prompts) or AiTM (Adversary in the Middle) proxies. Defense: FIDO2 / WebAuthn.</p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2"><PulseDot className="text-primary" />Least Privilege</h4>
          <p className="text-sm text-muted-foreground">Users should only have the exact permissions necessary to perform their job, and only when they need them.</p>
        </StaggerItem>
        <StaggerItem className="bg-card border border-border p-5 rounded-xl hover-elevate transition-all">
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2"><PulseDot className="text-success" />Service Identities</h4>
          <p className="text-sm text-muted-foreground">Machine-to-machine auth (like OAuth Client Credentials or SPIFFE/mTLS) is just as critical as human identity.</p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
