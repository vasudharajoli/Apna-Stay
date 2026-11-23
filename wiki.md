# Apna Stay engineering wiki

## Where to resume

Review the demo guest journey on `feat/demo-guest-journey`. The owner selected a demo. Agent B has no assigned task. For an integrated build, AP-3 starts with PostgreSQL migrations, a versioned demo seed, and server-side identity and permissions.

## Project identity and stack

- Repository [vasudharajoli/Apna-Stay](https://github.com/vasudharajoli/Apna-Stay)
- Goal: an Indian accommodation marketplace for guests, hosts, and operations staff.
- Release target: a local, credential-free demo with synthetic inventory. See [owner decisions](docs/USER_DECISIONS.md).
- Main bootstrap: `d9ae715`. Architecture baseline on the feature branch: `874b8ac`.
- Current code: Node.js 24 LTS, npm, strict TypeScript, Next.js App Router, React, Tailwind CSS, and Node's test runner.

## Architecture and contracts

Routes and layouts live in `app/`. Presentation components live in `components/`. The fictional catalog, stay date validation, and server-side quote arithmetic live in `features/stays/`. The demo uses a browser-only confirmation interaction after the server renders a valid quote.

See [PRD](docs/PRD.md), [architecture](docs/ARCHITECTURE.md), [database contracts](docs/DATABASE.md), [API contracts](docs/API.md), [threat model](docs/SECURITY.md), and [ADR 0001](docs/adr/0001-modular-monolith.md) for integrated build contracts. One listing represents one unit. Stay dates are property-local, checkout is exclusive, event instants are UTC, and pricing uses integer paise.

PostgreSQL/Prisma, auth sessions, signed object storage, Razorpay, email, and hosting belong to later integration work. Preserve demo fixture isolation if adding real inventory.

## Design system and assets

Use the ivory, navy, dark terracotta, and sand palette with a Georgia/system-sans type pairing. The public catalog adapts from one to four columns. See [design system](docs/DESIGN_SYSTEM.md) and [asset provenance](docs/ASSETS.md).

## Commands and environment

- Run `npm ci` and `npm run dev` with Node 24.11+.
- Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- No environment variables are required. Document variable names, purposes, environments, and secure setup as adapters land. Keep secret values outside Git.

## Feature and task ownership

| Task  | Feature                                          | Owner      | Branch                  | Owned paths                                         | Status      | Acceptance                                                                     |
| ----- | ------------------------------------------------ | ---------- | ----------------------- | --------------------------------------------------- | ----------- | ------------------------------------------------------------------------------ |
| AP-0  | Bootstrap and CI                                 | Agent A    | main                    | app/, root configuration                            | DONE        | Install, dev smoke, lint, types, and production build passed locally           |
| AP-1  | Product and architecture                         | Agent A    | feat/demo-guest-journey | docs/, wiki.md                                      | IN_REVIEW   | Roles, state transitions, risks, and API contracts documented                  |
| AP-2  | Brand and guest demo                             | Agent A    | feat/demo-guest-journey | app/, components/, features/stays/, public/, tests/ | IN_REVIEW   | Generated photos, discovery, detail, itemized quote, and simulated reservation |
| AP-3  | Persistence and auth                             | Unassigned | TBD                     | TBD                                                 | NOT_STARTED | Database migrations, seed, verified authentication, and tested role checks     |
| AP-4+ | Host, admin, booking, provider payments, and ops | Unassigned | TBD                     | TBD                                                 | NOT_STARTED | Verified integrated workflows with traceable authorization                     |

Agent A owns architecture, migrations, booking, payments, integration, and releases. Agent B may take explicitly assigned isolated work. Review open PRs and active paths before claiming an issue. Coordinate wiki changes with the current branch owner.

## Verification and limitations

- Node 24.22.3 ran clean install, formatting, lint, types, four quote tests, and a production build. The bootstrap home route returned HTTP 200 on dev and production servers.
- Chromium smoke tests passed at 360, 768, and 1440px for search, image loading, keyboard focus, pricing, reservation simulation, invalid dates, and unknown listings. Desktop and mobile renders were reviewed.
- ESLint 9 is pinned because some Next.js lint plugins cap their peer range at version 9.
- Demo confirmations reset on reload. There is no reservation persistence, live availability, authentication, public deployment, or payment-provider verification.
- GitHub Actions is configured for main and pull requests. Check the run status for the exact revision under review.

## Handoff

23 November 2026 · Agent A initialized main and documented the demo constraints. The feature branch contains the verified guest slice and architecture contracts. Continue from the table above after review. No external service or real inventory is configured.
