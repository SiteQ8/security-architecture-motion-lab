# Security Architecture Motion Lab

An interactive, motion-led field guide to modern security architecture. The lab turns abstract controls into visible flows so teams can see how identity, requests, data, threats, and defenses move across trust boundaries.

## What it covers

- Zero trust, trust boundaries, policy enforcement, and continuous verification
- Identity, MFA, workload identity, privileged access, and just-in-time authorization
- Edge security, segmentation, east-west traffic, service mesh, and mTLS
- Application and API security, OWASP risks, threat modeling, and abuse cases
- Data classification, encryption, key management, secrets, privacy, and DLP
- Cloud, containers, Kubernetes, workload isolation, and posture management
- Endpoint security, device trust, EDR, hardening, and patching
- Software supply chain, SBOMs, signed builds, CI/CD controls, and DevSecOps
- Telemetry, SIEM, detection engineering, response, and forensics
- Resilience, immutable backups, recovery, governance, risk, and compliance

## Interactive features

- Animated security request and attack paths
- Selectable architecture scenarios
- Play, pause, and replay controls
- Layer-by-layer architecture exploration
- Responsive navigation and active-section tracking
- Keyboard-visible focus states and reduced-motion support
- Practical security principles and glossary

## Run locally

This repository uses pnpm workspaces.

```bash
pnpm install
pnpm --filter @workspace/security-architecture run dev
```

On Replit, use the managed `artifacts/security-architecture: web` workflow so the required port and base-path environment values are supplied automatically.

## Quality checks

```bash
pnpm --filter @workspace/security-architecture run typecheck
pnpm run build
```

## Project layout

```text
artifacts/security-architecture/
├── src/components/motion/  # Animated nodes, packets, and scenario canvas
├── src/components/layout/  # Application shell and navigation
├── src/pages/sections/     # Security architecture domains
├── src/pages/home.tsx      # Main guided experience
└── src/index.css           # Design tokens, responsive styling, and motion
```

## Architecture principles

1. Never trust implicitly; evaluate identity, device, workload, context, and risk.
2. Make trust boundaries explicit and place enforcement close to the resource.
3. Prefer short-lived, least-privilege credentials over durable shared secrets.
4. Segment for blast-radius reduction, not only for network organization.
5. Protect data through its full lifecycle and separate keys from ciphertext.
6. Treat software provenance and the delivery pipeline as production attack surfaces.
7. Design telemetry with the architecture so important decisions are observable.
8. Assume controls will fail; build containment, recovery, and learning loops.

## License

MIT