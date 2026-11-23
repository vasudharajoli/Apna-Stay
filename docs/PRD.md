# Product requirements

Apna Stay helps travelers discover distinctive accommodations across India. Hosts manage a single bookable property per listing. Operations staff review the publication queue and trace reservation or payment issues.

## Demo scope

| Role  | Journey                                                                                                  | Acceptance                                                                                                                                                      |
| ----- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guest | Discover a destination, filter stays, see a property, select dates and guests, and preview a reservation | Search state survives sharing the URL. The price breakdown identifies every included charge. Fictional inventory and simulated bookings are labeled throughout. |
| Host  | Start a draft, add description, media, prices, and availability, and submit for review                   | Hosts edit only properties they own. Submissions incomplete under the publication rules stay in draft.                                                          |
| Admin | Review pending listings, approve or reject with reasons, and inspect reservations                        | Operations access is server-gated. Decisions are auditable. Only published inventory appears on public routes.                                                  |

Build the public discovery and detail flow first. Authenticated host, admin, and database-backed booking flows land in separately verified milestones. Live charges, seller payouts, loyalty, messaging, native apps, multi-unit inventory, and map providers are deferred.

## Policies to settle before launch

Confirm cancellation windows, refund rules, host verification, publication requirements, fee disclosure, taxes, support escalation, and exact-address visibility with the owner. Prototype cancellation and simulated checkout can use explicitly labeled demo rules. The payment sandbox needs separate integration verification.
