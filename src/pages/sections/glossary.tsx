import React from 'react';

const terms = [
  { term: "Zero Trust", definition: "A security framework requiring all users, whether in or outside the organization's network, to be authenticated, authorized, and continuously validated." },
  { term: "mTLS (Mutual TLS)", definition: "A process where both the client and server verify each other's digital certificates before establishing an encrypted connection." },
  { term: "PAM (Privileged Access Management)", definition: "Tools and strategies to secure, control, and monitor access to an organization's critical information and resources." },
  { term: "WAF (Web Application Firewall)", definition: "A firewall that monitors, filters, and blocks HTTP traffic to and from a web application, protecting against exploits like SQL injection." },
  { term: "EDR (Endpoint Detection and Response)", definition: "An integrated endpoint security solution that combines real-time continuous monitoring and collection of endpoint data with rules-based automated response." },
  { term: "SIEM (Security Information and Event Management)", definition: "Software that aggregates and analyzes activity from many different resources across an IT infrastructure to identify potential threats." },
  { term: "SBOM (Software Bill of Materials)", definition: "A comprehensive list of components, libraries, and modules required to build a piece of software and the supply chain relationships between them." },
  { term: "BOLA (Broken Object Level Authorization)", definition: "An API vulnerability where the server fails to properly validate if the requesting user has permission to access the specific requested record ID." }
];

export function GlossarySection() {
  return (
    <section id="glossary" className="scroll-mt-24 border-t border-border pt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Glossary</h2>
      </div>

      <dl className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {terms.map((t, idx) => (
          <div key={idx} className="bg-muted/10 p-4 rounded-lg border border-border/50">
            <dt className="font-bold text-primary mb-1">{t.term}</dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
