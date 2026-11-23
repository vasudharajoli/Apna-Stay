# Apna Stay engineering wiki

## Where to resume

Agent A owns bootstrap and architecture. Agent B has no assignment yet.

## Project identity

- Repository [vasudharajoli/Apna-Stay](https://github.com/vasudharajoli/Apna-Stay)
- Goal: an Indian accommodation marketplace for guests, hosts, and operations staff.
- Release target: sandbox or closed-beta MVP pending owner direction.
- Application status: bootstrap in progress.
- Last repository audit: 23 November 2026. Main was configured and there were no branches, open pull requests, or open issues.

## Technology stack and architecture

Current code uses Node.js 24 LTS, npm, a strict TypeScript Next.js App Router application, React, and Tailwind CSS. `app/` owns routes, `docs/` owns engineering decisions, and `.github/workflows/` owns CI.

PostgreSQL and Prisma are proposed for durable data and migrations. Maintained session authentication, signed object storage, Razorpay sandbox, transactional email, Playwright, and hosting will be evaluated at their integration phases. Production provider choices remain open.

## Database and API contracts

No database schema or public API is deployed. The architecture milestone owns the initial entity model, route contracts, ownership checks, booking invariants, and migrations. One listing represents one bookable unit. Store stay dates as property-local calendar dates and event times as UTC instants. Store money in integer paise.

## Design system

Warm ivory and navy define the bootstrap page. The contrast-safe terracotta text token is preliminary. The brand milestone owns typography, usage rules, responsive components, accessibility, and asset provenance.

## Commands and environment

- Install with `npm ci`. Start with `npm run dev`.
- Run `npm run format:check`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- The initial route requires no environment variables. Add variable names and purposes here when integrations land. Keep secret values in provider or local environment settings.

## Feature implementation

| Feature                                                                | Status      | Owner      | Branch | Acceptance and evidence                                 | Main files                 |
| ---------------------------------------------------------------------- | ----------- | ---------- | ------ | ------------------------------------------------------- | -------------------------- |
| Bootstrap                                                              | IN_PROGRESS | Agent A    | main   | Local checks and GitHub verification pending            | app/, README.md, AGENTS.md |
| Product and architecture                                               | NOT_STARTED | Agent A    | TBD    | Document domain roles, flows, states, and API contracts | docs/                      |
| Brand and discovery shell                                              | NOT_STARTED | Unassigned | TBD    | Accessible responsive routes with original assets       | app/, public/              |
| Authentication, listings, search, booking, payments, trips, operations | NOT_STARTED | Unassigned | TBD    | Each requires its own verified vertical slice           | TBD                        |

## Task ownership and active paths

| Task ID | Description                     | Agent   | Branch | Owned paths                    | Status      | Dependencies        |
| ------- | ------------------------------- | ------- | ------ | ------------------------------ | ----------- | ------------------- |
| AP-0    | Initialize repository and CI    | Agent A | main   | Bootstrap source and root docs | IN_PROGRESS | GitHub write access |
| AP-1    | Define product and architecture | Agent A | TBD    | docs/ and wiki.md              | NOT_STARTED | AP-0                |

Agent A coordinates shared architecture, migrations, booking, payments, integration, and releases. Agent B may take explicitly assigned isolated work. Review active PRs and this table before claiming paths. Coordinate wiki updates if two PRs touch it.

## Decisions, known issues, and verification

See [AGENTS.md](AGENTS.md) for the working agreement. No external service or deployment has been verified. No live inventory or payments are enabled.

## Handoff

23 November 2026 · Agent A audited the empty repository. After bootstrapping, record the branch, commit or PR, check results, and continuation point here.
