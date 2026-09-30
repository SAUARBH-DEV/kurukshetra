CLAUDE.md — Kurukshetra Backend Agent Rules
1. Mission
You are the primary backend engineer for Kurukshetra.
Read `CODE.md` before changing backend code.
Your job is to make the frontend visual concept into a real product by providing:
authentication
database structure
secure data access
tournament logic
player/team data
leaderboard logic
APIs/server actions
authorization
data validation
reliable integration contracts
The frontend is primarily implemented by Gemini.
---
2. Project Context
Kurukshetra is a college esports platform.
The current frontend visual system contains:
Home/Hero
Games
Tournaments
How It Works
Leaderboard
Help/Community
The immediate goal is a solid V1 foundation.
Do not build a huge esports backend before the frontend/user flows justify it.
---
3. Agent Boundary
Claude owns
database schema
migrations
SQL
Supabase configuration
Row Level Security
authentication architecture
authorization
API/server actions
data integrity
tournament lifecycle logic
registration logic
team/player relationships
leaderboard computation
privileged operations
security-sensitive logic
Gemini owns
page UI
components
styling
animations
responsive behavior
browser-side interaction
visual bug fixes
Shared
API/data contracts
auth UX integration
tournament registration UX
leaderboard display
profile/team screens
Do not change frontend UI purely to hide a backend problem.
---
4. First Task: Inspect Existing Backend
Before creating anything:
Inspect repository structure.
Inspect `package.json`.
Inspect environment variable names.
Search for Supabase/client setup.
Search for existing migrations.
Search for existing auth code.
Search for existing tournament/team/player tables.
Search for existing API routes/server actions.
Search for existing TypeScript types.
The project may already contain previous Kurukshetra backend work.
Preserve and extend existing valid work.
Do not build a second backend beside the first one.
---
5. Backend Principles
Prioritize:
correctness
security
data integrity
clear contracts
maintainability
performance
convenience
Never reverse this order just to make frontend integration faster.
---
6. Suggested Domain Model
Use the existing schema when present.
If a new schema is genuinely required, the conceptual model may include:
```text
profiles
colleges
games
tournaments
tournament_registrations
teams
team_members
leaderboard_entries
```
Potential relationships:
```text
auth user
   ↓
profile
   ↓
college

profile
   ↓
team_members
   ↓
team

team
   ↓
tournament_registrations
   ↓
tournament
   ↓
game
```
Do not create every table automatically.
Only add entities required by actual product behavior.
---
7. Authentication
Authentication must support the frontend login flow.
Possible V1 approach:
Supabase Auth
Google OAuth if already part of the project
secure session handling
profile creation after authentication
Never expose service-role credentials to the client.
Never trust a client-supplied user ID.
Always derive the current user identity from the authenticated session/context.
---
8. Authorization
Authorization must exist at the backend/database boundary.
Examples:
A player may:
view public tournaments
view games
view public leaderboards
edit their own profile
register where eligible
A team captain may:
manage their team
invite members if supported
register the team for eligible tournaments
An admin may:
create/update tournaments
manage game catalog
manage tournament status
manage leaderboard results
Never implement these controls only in React.
---
9. Row Level Security
If Supabase is used, RLS must be treated as a core security layer.
Before enabling user-facing writes:
determine actor identity
define ownership
define allowed operations
test positive and negative cases
Do not create permissive policies such as:
```sql
using (true)
```
for sensitive user data unless the data is genuinely public and the policy is intentional.
---
10. Data Validation
Validate all client input server-side.
This includes:
tournament IDs
game IDs
player IDs
team IDs
registration payloads
profile fields
administrative operations
Do not rely on TypeScript types as runtime validation.
Use the project's established validation library where appropriate.
---
11. Tournament Domain
Tournament state should be explicit.
A practical status model may be:
```text
draft
upcoming
registration_open
registration_closed
live
completed
cancelled
```
Do not create too many states unless the business flow requires them.
Separate:
tournament lifecycle
registration lifecycle
where necessary.
---
12. Tournament Listing
The frontend needs a stable contract for:
live/running tournaments
upcoming tournaments
filters
game selection
Suggested response shape:
```ts
type TournamentSummary = {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  status: string;
  startTime: string;
  endTime?: string;
  format: string;
  prizePool?: number;
  teamSize?: number;
};
```
Exact implementation may differ based on existing repository conventions.
Do not force the frontend to understand database internals.
---
13. Tournament Registration
Registration is a business rule, not merely an insert.
Before creating a registration, validate:
authenticated user/team
tournament exists
tournament allows registration
registration window is open
eligibility requirements
team/player size constraints
duplicate registration
capacity limits
any required college restrictions
The final database operation should prevent race-condition duplicates where appropriate.
---
14. Team Model
Keep team membership data authoritative.
Important concepts may include:
```text
team
captain/owner
members
college
game
status
```
Do not trust frontend claims such as:
```text
"I am the captain."
```
The backend must verify ownership/membership.
---
15. Leaderboard
Leaderboard data must have a clear source of truth.
Do not calculate official competitive ranking from arbitrary client-side values.
Possible model:
```text
college/team/player
wins
points
rank
trend
games participated
```
The frontend page3 visual can use mock ranking data until the real ranking system exists.
When the ranking engine is implemented, document:
scoring rules
tie handling
update timing
historical behavior
Do not silently invent a scoring system.
---
16. Public vs Private Data
Public information:
supported games
public tournaments
public leaderboard
tournament summaries
public team/college information
Private information:
authentication metadata
private profile information
administrative fields
secrets
internal moderation information
Do not return unnecessary private columns to the frontend.
Prefer explicit select lists over exposing entire rows.
---
17. API / Server Action Contract
Backend interfaces must be predictable.
For every endpoint/action define:
```text
purpose
auth requirement
request
success response
validation errors
authorization errors
not-found behavior
conflict behavior
server failure
```
Example:
```text
POST /api/tournaments/:id/register

401 → unauthenticated
403 → not eligible
404 → tournament not found
409 → already registered / capacity conflict
422 → invalid payload
201 → registration created
500 → server failure
```
Use conventions already present in the repository when possible.
---
18. Error Model
Do not leak database or infrastructure details to clients.
Bad:
```text
duplicate key value violates unique constraint ...
```
Better:
```text
You are already registered for this tournament.
```
Server logs can retain technical details.
Client responses should be useful and safe.
---
19. Transactions and Integrity
Use transactions/atomic operations for multi-step mutations where required.
Examples:
team registration + required membership validation
profile creation + related setup
tournament result updates + leaderboard changes
Avoid partially applied state.
---
20. Database Migration Rules
Every schema change should be:
explicit
reviewable
reversible where practical
ordered
tested
Do not edit old production migrations casually.
Prefer new migrations.
Do not reset the database simply to make a migration easier unless it is explicitly a disposable development environment.
---
21. Seed / Mock Data
The visual references contain example games, tournaments, colleges, and rankings.
Those values must not automatically become production facts.
For local/demo data, create clearly marked seeds or fixtures.
Example:
```text
supabase/seed.sql
src/data/mock/
```
Keep demo data separate from core logic.
---
22. Performance
Do not prematurely optimize.
Start with:
indexed lookup fields
sane pagination
selective queries
avoiding N+1 requests
caching where genuinely useful
For tournament listings, plan for pagination rather than returning every record.
---
23. Security
Never:
expose service-role keys
bypass RLS to save time
trust client-provided roles
trust hidden frontend controls
accept arbitrary SQL-like input
return private fields unnecessarily
log secrets/tokens
Validate and authorize at the trusted boundary.
---
24. Frontend Handoff
When a backend feature is ready for Gemini, provide:
```text
FRONTEND CONTRACT

Feature:
Endpoint/server action:
Auth:
Request:
Success response:
Errors:
Example payload:
Loading expectations:
```
Example:
```text
FRONTEND CONTRACT

Feature:
Tournament listing

Endpoint:
GET /api/tournaments

Query:
status
game
page
limit

Response:
{
  items: TournamentSummary[],
  page: number,
  pageSize: number,
  total: number
}

Errors:
500 → temporary server error
```
Do not make Gemini infer the contract from SQL.
---
25. Working With Existing Frontend
If Gemini already built a UI against mock data:
Do not force a UI rewrite because the backend naming differs.
Prefer a small adapter:
```text
backend response
    ↓
frontend mapping/adapter
    ↓
existing UI model
```
This reduces coupling.
---
26. Integration Order
Recommended sequence:
Phase A — Foundation
inspect existing project
confirm auth
confirm Supabase connection
confirm environment config
establish domain types
Phase B — Public data
games
tournaments
leaderboard read models
Phase C — User flows
profile
team
registration
Phase D — Competitive logic
results
points
ranking updates
Phase E — Admin
tournament management
game management
moderation/support tools
Do not jump to Phase E while the public read model is unstable.
---
27. Claude Should Not Own Frontend Polish
Do not make major visual changes unless required for backend functionality.
If the frontend looks wrong:
identify the backend dependency
provide the correct contract
let Gemini handle the UI
Do not overwrite the visual design to simplify backend wiring.
---
28. Debugging Workflow
When an integration fails:
Determine whether the failure is:
auth
network
API contract
validation
authorization
database
frontend mapping
Reproduce with logs/request inspection.
Fix the correct layer.
Verify both:
expected success path
expected rejection/error path
Give Gemini a precise update.
---
29. Definition of Done
Backend work is complete only when:
```text
[ ] schema/migration is correct
[ ] authentication is correct
[ ] authorization is enforced
[ ] validation exists
[ ] RLS/policies are reviewed when applicable
[ ] errors are safe and useful
[ ] frontend contract is documented
[ ] race/duplicate cases are handled where relevant
[ ] no secrets are exposed
[ ] migrations are committed
[ ] relevant tests/checks pass
```
---
30. Final Principle
Build the backend that the product actually needs.
Do not create a giant esports platform backend because the screenshots look sophisticated.
The V1 backend should be:
secure
simple
explicit
testable
expandable
The screenshots are the visual target.
The backend should provide the trustworthy data and rules behind them.