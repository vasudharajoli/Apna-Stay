# ADR 0001 · App Router modular monolith

Status: accepted for development.

Use one deployable Next.js application with service-level boundaries and PostgreSQL for the integrated marketplace. A one-unit listing keeps search and inventory constraints understandable. Require an isolated demo data source so the owner can explore the product without introducing local or hosted credentials. Use transactions and unique night claims before enabling database-backed reservations.

Review topology if independent scaling, availability, or operational ownership becomes a demonstrated need.
