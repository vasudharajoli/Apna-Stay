# Initial threat model

| Risk                                  | Planned control                                                                                                                  | Verification                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Cross-account access                  | Check roles and resource ownership after session resolution at every privileged entry point                                      | Guest A cannot access guest B's trips. Host A cannot edit host B's listing.   |
| Price tampering and overlapping holds | Compute price server-side, lock inventory writers, enforce a unique night claim, and store immutable totals                      | Concurrent reservation test and client-total rejection test                   |
| Payment replay or late capture        | Authenticate the callback, deduplicate provider events, verify order/currency/amount/capture, and reconcile payment after expiry | Sandbox replay, reordering, and late capture coverage                         |
| Unsafe uploads                        | Scoped upload authorization, actual MIME and size checks, randomized names, and public metadata stripping                        | Reject disallowed bytes, oversize payloads, and cross-host writes             |
| Abuse and data leaks                  | Bound input, apply rate limits, redact sensitive logs, rotate secrets, and isolate test credentials                              | Review logs and session settings. Exercise denial paths in integration tests. |
| Moderator misuse                      | Least privilege, audit trails, and explicit confirmation for destructive operations                                              | Role matrix and audit integration tests                                       |

Credentials belong in environment settings. Demo data is synthetic. The release review owns production retention, deletion, privacy, support, and business policy signoff.
