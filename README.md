# Apna Stay

An India-focused accommodation marketplace. The guest demo includes destination and guest filters, fictional property details, INR quotes, and a simulated reservation. It runs with synthetic inventory and requires no external services.

## Start locally

Use Node.js 24 LTS (24.11+) and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Choose a fictional stay, enter future dates, calculate the total, and select **Simulate reservation**.

Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` before opening a pull request.

Start with [AGENTS.md](AGENTS.md) and [wiki.md](wiki.md) for engineering ownership, branch coordination, and current verification.
