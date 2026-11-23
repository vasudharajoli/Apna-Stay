# Initial API contracts

These routes are proposed for the integrated application. Use JSON, server-side schema validation, and a consistent error envelope with `code`, safe `message`, and `requestId`. Return 401 for missing sessions, 404 for inaccessible resources when existence should be hidden, 409 for conflicts, and 422 for invalid inputs.

| Method and path                       | Caller                   | Contract                                                                                                                   |
| ------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| GET /api/listings                     | Public                   | Query city, dates, party size, type, and cursor. Return published summary DTOs and next cursor.                            |
| GET /api/listings/:slug               | Public                   | Return public property fields and media for a published listing.                                                           |
| POST /api/quotes                      | Guest                    | Listing ID, dates, guest count. Return quote ID, currency, line items, total, expiry.                                      |
| POST /api/bookings                    | Guest                    | Quote ID and Idempotency-Key. Return booking ID and hold expiry. Return conflict for stale price or unavailable inventory. |
| GET /api/bookings/:id                 | Owner or permitted staff | Return booking status and user-appropriate receipt fields.                                                                 |
| POST /api/bookings/:id/cancel         | Owner or permitted staff | Validate policy, transition booking, and enqueue any approved refund work.                                                 |
| POST /api/bookings/:id/payment-order  | Guest owner              | Return a provider checkout order for an active hold. Deduplicate retries.                                                  |
| POST /api/payments/razorpay/webhook   | Provider                 | Validate the signature against the raw body. Deduplicate provider event IDs before applying valid transitions.             |
| POST /api/host/listings               | Eligible host            | Create listing draft scoped to authenticated host.                                                                         |
| PATCH /api/host/listings/:id          | Host owner               | Update a versioned draft or revision. Reject stale revision writes.                                                        |
| POST /api/host/listings/:id/submit    | Host owner               | Validate publication fields and submit a specific revision.                                                                |
| POST /api/admin/listings/:id/decision | Admin                    | Validate status/version and record an auditable moderation decision with a reason.                                         |

Roles and ownership are derived server-side. Idempotency keys are scoped to the actor and operation and bound to the canonical request payload. Return the prior result for an equivalent retry. Reject reuse with changed parameters.
