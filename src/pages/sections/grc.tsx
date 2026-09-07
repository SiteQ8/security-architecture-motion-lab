import React from 'react';
import { Scale, CheckSquare, FileText } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function GrcSection() {
  return (
    <section id="grc" className="scroll-mt-24">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Governance, Risk & Compliance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Security architecture must align with business objectives. Frameworks (like NIST CSF, ISO 27001) provide a structured way to measure maturity, while compliance (SOC2, PCI-DSS, HIPAA) proves it to third parties.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <Reveal>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Risk Management
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            We cannot eliminate all risk. We calculate Risk = Likelihood × Impact. 
            Once identified, we have four options:
          </p>
          <StaggerGroup className="space-y-3">
            <StaggerItem><li className="flex items-start gap-3 bg-card p-3 rounded border border-border">
              <span className="font-bold text-success w-16 text-xs uppercase pt-0.5">Mitigate</span>
              <span className="text-sm text-foreground/80">Apply security controls to reduce likelihood or impact (e.g., install a WAF).</span>
            </li></StaggerItem>
            <StaggerItem><li className="flex items-start gap-3 bg-card p-3 rounded border border-border">
              <span className="font-bold text-primary w-16 text-xs uppercase pt-0.5">Transfer</span>
              <span className="text-sm text-foreground/80">Shift the financial burden to someone else (e.g., cyber insurance, outsourcing).</span>
            </li></StaggerItem>
            <StaggerItem><li className="flex items-start gap-3 bg-card p-3 rounded border border-border">
              <span className="font-bold text-warning w-16 text-xs uppercase pt-0.5">Accept</span>
              <span className="text-sm text-foreground/80">Acknowledge the risk and do nothing because the cost of fixing outweighs the cost of the breach.</span>
            </li></StaggerItem>
            <StaggerItem><li className="flex items-start gap-3 bg-card p-3 rounded border border-border">
              <span className="font-bold text-destructive w-16 text-xs uppercase pt-0.5">Avoid</span>
              <span className="text-sm text-foreground/80">Stop engaging in the risky activity entirely (e.g., shut down a legacy feature).</span>
            </li></StaggerItem>
          </StaggerGroup>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-primary" />
            Architecture Review Principles
          </h3>
          <StaggerGroup className="space-y-4">
            <StaggerItem className="border-l-2 border-primary pl-4">
              <strong className="block text-foreground mb-1">1. Default to Deny</strong>
              <p className="text-sm text-muted-foreground">Systems should explicitly state what is allowed. Everything else drops.</p>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-primary pl-4">
              <strong className="block text-foreground mb-1">2. Defense in Depth</strong>
              <p className="text-sm text-muted-foreground">Multiple, overlapping layers of controls (e.g., WAF + App Auth + DB Encryption).</p>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-primary pl-4">
              <strong className="block text-foreground mb-1">3. Fail Securely</strong>
              <p className="text-sm text-muted-foreground">When a system crashes, it should default to a secure state, not an open one.</p>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-primary pl-4">
              <strong className="block text-foreground mb-1">4. Separation of Duties</strong>
              <p className="text-sm text-muted-foreground">No single person should be able to execute a critical, sensitive transaction alone.</p>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-primary pl-4">
              <strong className="block text-foreground mb-1">5. Keep it Simple</strong>
              <p className="text-sm text-muted-foreground">Complexity is the enemy of security. Complex systems are harder to secure and audit.</p>
            </StaggerItem>
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}
