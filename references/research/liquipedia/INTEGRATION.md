# INTEGRATION.md — Kurukshetra Frontend ↔ Backend

> This is intentionally a working technical document. Fill it as the architecture becomes concrete.

---

## 1. Architecture

<!-- Describe the final frontend → backend → database flow here. -->


## 2. Frontend Stack

<!-- Record framework, React/Next.js version, state/data-fetching approach, UI system, etc. -->


## 3. Backend Stack

<!-- Record backend framework, Supabase usage, server actions/API routes, database, etc. -->


## 4. Authentication Flow

<!-- Document sign-in, session creation, profile provisioning, logout, session refresh. -->


## 5. User / Profile Flow

<!-- Document how authenticated users map to profiles and colleges. -->


## 6. Games Data Flow

<!-- Frontend request → backend → database → response. -->


## 7. Tournament Data Flow

<!-- Frontend request → backend → database → response. -->


## 8. Tournament Registration Flow

<!-- Document validation, authorization, registration creation, conflicts, and response. -->


## 9. Team Creation / Team Membership Flow

<!-- Document captain/owner rules, invitations, membership changes. -->


## 10. Match & Result Flow

<!-- Document who creates matches, who records results, and how results become authoritative. -->


## 11. Leaderboard Calculation Flow

<!-- Document the exact source of ranking points and when rankings update. -->


## 12. API / Server Action Contracts

### Games


### Tournaments


### Tournament Details


### Registration


### Teams


### Matches


### Leaderboard


## 13. Error Contract

<!-- Define common status/error codes and frontend expectations. -->


## 14. Loading / Empty / Error UI Contract

<!-- Define what Gemini should display for each backend state. -->


## 15. Authorization Rules

<!-- Document who may read/write each important resource. -->


## 16. Database / RLS Notes

<!-- Document tables, important relationships, indexes, policies, and security assumptions. -->


## 17. Frontend ↔ Backend Ownership

### Gemini
<!-- Frontend responsibilities. -->

### Claude Code
<!-- Backend responsibilities. -->

### Shared
<!-- Contracts and integration responsibilities. -->


## 18. Environment Variables

<!-- List variable NAMES only. Never commit secret values. -->


## 19. Deployment Architecture

<!-- Document hosting, database, environment separation, and deployment flow. -->


## 20. Open Technical Decisions

<!-- Keep unresolved architecture questions here. -->


## 21. Change Log

<!-- Record important integration-contract changes. -->
