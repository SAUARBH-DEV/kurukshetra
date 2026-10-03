# KURUKSHETRA_DATA_MODEL.md

## Purpose

Conceptual model derived from feature research and adapted to Kurukshetra.

This is **not** a copy of Liquipedia's database schema.

---

## Core V1 entities

### User
Authentication identity and account.

### Profile
Public player identity.

Possible fields:
- id
- user_id
- display_name
- college_id
- avatar
- verified_status

### College
Institution represented by players and teams.

### Game
Supported esport.

Possible fields:
- id
- name
- slug
- category
- platform
- active

### Tournament
Competitive event.

Possible fields:
- id
- game_id
- name
- organizer_id
- status
- registration_open_at
- registration_close_at
- start_at
- end_at
- format
- max_participants
- prize_pool

### TournamentStage
A stage inside a tournament.

Possible fields:
- id
- tournament_id
- name
- stage_type
- sequence
- status

### Team
Competitive unit.

Possible fields:
- id
- name
- college_id
- game_id
- captain_id
- status

### TeamMember
Relationship between a profile and a team.

### Registration
Relationship between a team/player and a tournament.

### Match
Scheduled or completed competition.

Possible fields:
- id
- tournament_stage_id
- participant_a
- participant_b
- scheduled_at
- status
- score_a
- score_b
- winner_id
- stream_url

### Result
Authoritative competitive result.

### RankingEntry
Computed ranking result.

---

## V1.5 entities

- PlayerStatistic
- TeamStatistic
- Achievement
- Broadcast

## Future entities

- TournamentSeries
- NotificationSubscription
- CalendarExport

---

## Key relationships

```text
User
 ↓
Profile
 ↓
College

Profile
 ↓
TeamMember
 ↓
Team
 ↓
Registration
 ↓
Tournament
 ↓
TournamentStage
 ↓
Match
 ↓
Result
 ↓
RankingEntry
```

Additional links:

```text
Game
 ├── Tournament
 ├── Team
 └── PlayerStatistic

Team
 ├── Profile(s)
 ├── Tournament(s)
 └── Match(es)

Profile
 ├── Team(s)
 ├── Tournament history
 └── Match history
```

## Integrity principles

- Results are the authoritative source for rankings.
- Team membership is authoritative for team actions.
- Authentication identity is authoritative for user ownership.
- Eligibility is checked server-side.
- Public UI should not expose privileged/internal fields.
