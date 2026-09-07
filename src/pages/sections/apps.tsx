import React, { useState } from 'react';
import { LabCanvas } from '@/components/motion/lab-canvas';
import { ArchitectureNode } from '@/components/motion/nodes';
import { PacketFlow, FlowPath } from '@/components/motion/packets';
import { Bug, CheckCircle2 } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function AppsSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scenario, setScenario] = useState('injection');

  const scenarios = [
    { 
      id: 'injection', 
      name: 'SQL Injection', 
      description: 'Untrusted input modifying the intended database query.'
    },
    { 
      id: 'bola', 
      name: 'BOLA / IDOR', 
      description: 'Broken Object Level Authorization: manipulating IDs to access other users\' data.'
    }
  ];

  return (
    <section id="apps" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Apps, APIs & Threat Modeling</h2>
        <p className="text-muted-foreground leading-relaxed">
          Application security is about writing code that anticipates failure. The OWASP Top 10 highlights consistent flaws like injection, broken authentication, and authorization failures (BOLA). Threat modeling (STRIDE) helps identify these before code is written.
        </p>
      </Reveal>

      <LabCanvas
        title="API Exploitation"
        description={scenarios.find(s => s.id === scenario)?.description || ''}
        scenarios={scenarios}
        activeScenarioId={scenario}
        onScenarioChange={setScenario}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      >
        {scenario === 'injection' && (
          <>
            <ArchitectureNode id="attacker" type="internet" label="Attacker" x="15%" y="50%" status="alert" />
            <ArchitectureNode id="api" type="service" label="Node API" x="50%" y="50%" status="compromised" />
            <ArchitectureNode id="db" type="database" label="Postgres" x="85%" y="50%" status="compromised" pulse />

            <FlowPath startX="15%" startY="50%" endX="50%" endY="50%" />
            <FlowPath startX="50%" startY="50%" endX="85%" endY="50%" />

            <PacketFlow id="payload" type="threat" sourceId="attacker" targetId="api" startX="15%" startY="50%" endX="50%" endY="50%" isPlaying={isPlaying} label="' OR 1=1--" />
            <PacketFlow id="query" type="threat" sourceId="api" targetId="db" startX="50%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={1} label="SELECT * FROM users" />
            <PacketFlow id="dump" type="data" sourceId="db" targetId="attacker" startX="85%" startY="50%" endX="15%" endY="30%" isPlaying={isPlaying} delay={2} label="All Records Dump" />
          </>
        )}

        {scenario === 'bola' && (
          <>
            <ArchitectureNode id="user" type="user" label="User (ID: 5)" x="15%" y="50%" status="alert" />
            <ArchitectureNode id="api" type="service" label="API Gateway" x="50%" y="50%" status="compromised" />
            <ArchitectureNode id="data" type="database" label="Records" x="85%" y="50%" />

            <FlowPath startX="15%" startY="50%" endX="50%" endY="50%" />
            <FlowPath startX="50%" startY="50%" endX="85%" endY="50%" />

            <PacketFlow id="req1" type="auth" sourceId="user" targetId="api" startX="15%" startY="50%" endX="50%" endY="50%" isPlaying={isPlaying} label="GET /users/5" />
            <PacketFlow id="req2" type="threat" sourceId="user" targetId="api" startX="15%" startY="50%" endX="50%" endY="70%" isPlaying={isPlaying} delay={1.5} label="GET /users/99" />
            
            <PacketFlow id="fetch1" type="data" sourceId="api" targetId="data" startX="50%" startY="50%" endX="85%" endY="50%" isPlaying={isPlaying} delay={0.5} />
            <PacketFlow id="fetch2" type="threat" sourceId="api" targetId="data" startX="50%" startY="70%" endX="85%" endY="50%" isPlaying={isPlaying} delay={2.0} label="Auth bypass" />
            <PacketFlow id="leak" type="data" sourceId="data" targetId="user" startX="85%" startY="50%" endX="15%" endY="70%" isPlaying={isPlaying} delay={2.5} label="Admin Data" />
          </>
        )}
      </LabCanvas>

      <Reveal className="bg-destructive/10 border border-destructive/20 p-5 rounded-xl mt-8">
        <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Defensive Principles
        </h4>
        <StaggerGroup className="space-y-2 text-sm text-foreground/80">
          <StaggerItem><li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> <strong>Input Validation:</strong> Always use parameterized queries / ORMs. Never concatenate strings for SQL.</li></StaggerItem>
          <StaggerItem><li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> <strong>Authorization:</strong> Check ownership at the resource level, not just the routing level. Does this token own ID 99?</li></StaggerItem>
          <StaggerItem><li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> <strong>Output Encoding:</strong> Prevent XSS by sanitizing data before rendering it in the DOM.</li></StaggerItem>
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
