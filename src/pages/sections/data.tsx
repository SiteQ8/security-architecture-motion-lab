import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode, TrustBoundary } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';
import { Database, Key, ShieldCheck } from 'lucide-react';

export function DataSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="data" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Data & Cryptography</h2>
        <p className="text-muted-foreground leading-relaxed">
          Data is the ultimate target. Security must travel with the data itself through classification, 
          encryption at rest, encryption in transit, and secure secrets management. 
        </p>
      </div>

      <LabCanvas
        title="Encryption Lifecycle (KMS)"
        description="Data encrypted via Envelope Encryption using a Key Management Service (KMS)."
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        <ArchitectureNode id="app" type="service" label="App Service" x="20%" y="50%" />
        <ArchitectureNode id="kms" type="security" label="KMS" x="50%" y="20%" status="secure" pulse />
        <ArchitectureNode id="db" type="database" label="Storage" x="80%" y="50%" />

        <FlowPath startX="20%" startY="50%" endX="50%" endY="20%" />
        <FlowPath startX="20%" startY="50%" endX="80%" endY="50%" />

        <PacketFlow id="req-key" type="auth" sourceId="app" targetId="kms" startX="20%" startY="50%" endX="50%" endY="20%" isPlaying={isPlaying} label="Generate Data Key" />
        <PacketFlow id="ret-key" type="control" sourceId="kms" targetId="app" startX="50%" endX="20%" startY="20%" endY="50%" isPlaying={isPlaying} delay={1} label="Plain + Encrypted Key" />
        
        {/* App encrypts data locally using plaintext key, then drops plaintext key */}
        <PacketFlow id="store" type="data" sourceId="app" targetId="db" startX="20%" startY="50%" endX="80%" endY="50%" isPlaying={isPlaying} delay={2} label="Ciphertext + Enc Key" />
      </LabCanvas>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card border border-border p-5 rounded-xl">
          <Database className="w-6 h-6 text-primary mb-3" />
          <h4 className="font-semibold text-foreground mb-1">Data Classification</h4>
          <p className="text-sm text-muted-foreground">Not all data is equal. Classify as Public, Internal, Confidential, or Restricted to apply appropriate controls.</p>
        </div>
        <div className="bg-card border border-border p-5 rounded-xl">
          <Key className="w-6 h-6 text-primary mb-3" />
          <h4 className="font-semibold text-foreground mb-1">Secrets Management</h4>
          <p className="text-sm text-muted-foreground">Never hardcode secrets. Use vaults (HashiCorp, AWS Secrets Manager) for dynamic, short-lived credentials.</p>
        </div>
        <div className="bg-card border border-border p-5 rounded-xl">
          <ShieldCheck className="w-6 h-6 text-primary mb-3" />
          <h4 className="font-semibold text-foreground mb-1">Envelope Encryption</h4>
          <p className="text-sm text-muted-foreground">Encrypting data keys with a root master key (KMS), limiting exposure and making key rotation seamless.</p>
        </div>
      </div>
    </section>
  );
}
