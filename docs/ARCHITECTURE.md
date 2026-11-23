# Application architecture

## Boundaries

Use a Next.js modular monolith. Route adapters validate input and resolve sessions. Domain services enforce rules and decide transitions. PostgreSQL owns transactional integrity. Provider modules handle media, mail, and payments behind typed interfaces. UI modules consume explicit server DTOs. Keep synthetic demo data isolated from production inventory.

| Role      | Server-side access                                                          |
| --------- | --------------------------------------------------------------------------- |
| Anonymous | Read published listings and coarse locations                                |
| Guest     | Manage own profile, wishlist, quotes, and bookings                          |
| Host      | Manage own listing drafts, media, availability, and relevant reservations   |
| Admin     | Moderate listings and inspect or authorize operations through audited tools |

Roles may coexist. Provision administrators through a closed operational process. Resolve active role and object ownership from trusted session and database state on every privileged action. Require verified email for transaction-facing accounts in the integrated application.

## Booking and payment

Use property-local date-only values and checkout-exclusive ranges. Store all instants in UTC and money in integer INR paise. Quotes are immutable snapshots with an expiry and a pricing-policy version. Reprice on hold creation and ask for acceptance if pricing changed.

| Lifecycle | Transitions                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Listing   | Draft → pending review → approved → published. Rejection returns to revision. Suspension removes public visibility. Material changes require review of a new revision.    |
| Booking   | A valid quote creates a pending payment hold. Captured payment plus active inventory confirms it. Expiry, terminal failure, or permitted cancellation releases inventory. |
| Payment   | Order created → authorized → captured, with failed and refund states stored separately. Preserve provider events and reconcile late or reordered events.                  |

Reserve one row per night using a unique key on listing ID and local date. Take a listing-level lock shared by hold creation, expiry, host blocks, and confirmation, then validate and write inside a transaction. Expiry can run during new reservation attempts and from a worker. A late capture after release creates a reconciliation record and refund request. Confirmation requires ownership of all reserved nights, matching order, expected amount and INR, and a verified provider capture. No released booking is revived.

## External dependencies

Local demo runs with versioned fixtures and no credentials. PostgreSQL and Prisma support the integrated build. Verified email auth, signed media storage, Razorpay sandbox, and transactional email are versioned adapters to be selected or verified in their phases. Capture environment-specific verification in the wiki.

See [Database](DATABASE.md), [API](API.md), and [Security](SECURITY.md) before starting dependent work.
