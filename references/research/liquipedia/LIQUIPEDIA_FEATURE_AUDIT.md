# LIQUIPEDIA_FEATURE_AUDIT.md

## Purpose

This document extracts **product features and functional concepts** from Liquipedia for Kurukshetra feature research.

It does **not** copy Liquipedia's frontend UI, branding, source code, page wording, or visual design.

The goal is to understand what an esports information/competition platform needs to represent and then decide what is appropriate for a college esports platform.

---

## 1. Executive Summary

Liquipedia's esports product can be understood as a connected information system around:

- games
- tournaments
- tournament stages
- matches
- teams/organizations
- players
- schedules
- results
- rankings
- statistics
- broadcasts/streams
- historical achievements
- recurring tournament series
- search/discovery
- user preferences and notifications

A particularly important product principle documented in Liquipedia's recent work is to surface important competitive information together rather than forcing users through many layers of navigation.

For Kurukshetra, the useful translation is:

> discovery → registration → team → match → result → ranking → history

---

## 2. Major Functional Areas

| Area | Core function | Kurukshetra relevance |
|---|---|---|
| Game catalog | Organize competitions by game | High |
| Tournament discovery | Find current/upcoming/completed events | Very High |
| Tournament details | Understand event rules, participants, schedule, results | Very High |
| Tournament stages | Represent groups/playoffs/brackets | High |
| Match tracking | View upcoming/live/completed matches | Very High |
| Team profiles | Show roster, schedule, tournaments, results | Very High |
| Player profiles | Show competitive history, teams, stats | High |
| Rankings | Rank teams/players using points/results | Very High |
| Statistics | Measure performance and form | High |
| Search/filtering | Find relevant games/events/people | High |
| Broadcast/stream info | Tell users where to watch | Medium |
| Tournament series | Connect repeated events | Medium |
| Achievements/history | Preserve competitive identity | High |
| Notifications/follows | Bring users back for relevant events | Medium/High |
| Calendar/export | Put match schedules into personal calendars | Medium |
| Wiki/editor tooling | Community-maintained information system | Low for V1 |

---

## 3. Tournament Features

### Tournament discovery

Users can discover tournaments by game, timing/state, and event context.

**Underlying function:** a tournament listing is a queryable collection of events.

**Data needed:**
- tournament ID
- tournament name
- game
- status
- start/end date
- organizer
- format
- prize pool
- participants
- region/location
- related matches/stages

**Kurukshetra adaptation:**
- game
- registration open/closed
- upcoming/live/completed
- college eligibility
- team size
- online/offline
- date
- prize pool
- campus/region

### Tournament detail page

Liquipedia tournament pages can bring together:
- event overview
- format
- prize pool/final standings
- participants
- rosters
- broadcasts
- statistics
- results
- brackets/group stages
- match-level details

**Kurukshetra adaptation:**
```text
Tournament
├── Overview
├── Rules
├── Eligibility
├── Registration
├── Participants
├── Schedule
├── Groups / Bracket
├── Matches
├── Standings
├── Results
└── Prize / Rewards
```

### Tournament stages

Competition can contain:
- qualifiers
- group stages
- playoffs
- finals

Represent these as structured competition phases rather than hard-coding one bracket.

### Tournament relationships

Recurring events can be connected into a larger series.

Possible Kurukshetra adaptation:

```text
Kurukshetra Campus Series
   ↓
Round 1
Round 2
Round 3
Grand Final
```

---

## 4. Match Features

Liquipedia's match work emphasizes making a match page useful according to match state and game type.

Observed functional ideas include:
- upcoming match information
- live match information
- completed match information
- streams
- VODs
- winner/result
- group or bracket context
- game-specific information
- map information
- draft information where relevant
- participant statistics
- head-to-head
- recent-form information

### Kurukshetra V1

Start with game-agnostic data:

```text
Match
├── Tournament
├── Stage
├── Date/time
├── Team/player A
├── Team/player B
├── Status
├── Score
├── Winner
└── Stream/link
```

Add game-specific statistics later only where reliable data exists.

---

## 5. Team Features

Liquipedia's recent team pages emphasize:
- current roster
- next matches
- ongoing/upcoming tournaments
- completed tournaments/results
- achievements
- statistics
- detailed schedules/results

### Kurukshetra adaptation

```text
Team
├── College
├── Game
├── Captain
├── Current roster
├── Upcoming matches
├── Current tournaments
├── Past tournaments
├── Results
├── Wins
├── Points
└── Achievements
```

This maps closely to the college-team identity Kurukshetra is trying to create.

---

## 6. Player Features

Observed concepts include:
- player profile
- team association
- tournament appearances
- match schedule/history
- yearly statistics
- win rate
- current form
- achievements
- detailed results

### Kurukshetra adaptation

```text
Player
├── Name
├── College
├── Main games
├── Team
├── Matches
├── Tournament history
├── Wins
├── Points
├── Win rate
└── Achievements
```

Later:
- verified college identity
- game-specific performance
- progression/history

---

## 7. Rankings / Leaderboards

Ranking concepts can use:
- points
- results
- roster/player contributions
- time cutoffs
- game-specific competitive performance

### Kurukshetra opportunity

Create three views:

```text
Colleges
Teams
Players
```

Possible inputs to a Kurukshetra scoring system:
- tournament placement
- tournament wins
- match wins
- tournament tier
- participation rules

The actual scoring formula must be a Kurukshetra product decision.

---

## 8. Statistics

Observed concepts:
- matches played
- win rate
- current form
- head-to-head
- recent match record
- game-specific performance
- detailed player/team statistics

### Kurukshetra adaptation

**V1:**
- matches played
- wins
- losses
- points
- tournament wins
- current streak/form

**Later:**
- game-specific player stats
- map/round performance
- K/D or equivalent where supported
- performance graphs

---

## 9. Search and Discovery

Useful Kurukshetra discovery capabilities:
- search player
- search team
- search college
- search game
- search tournament
- filter tournaments
- sort by time/status
- jump between related entities

### Core relationship flow

```text
Player
  ↕
Team
  ↕
College
  ↕
Tournament
  ↕
Match
  ↕
Result
  ↕
Leaderboard
```

---

## 10. Broadcasts / Streams

Tournament and match information can expose where users can watch.

Kurukshetra can optionally store/link:
- live stream
- VOD
- official tournament stream
- community stream

Do not build a streaming platform in V1.

---

## 11. Follow / Notification Concepts

Liquipedia's product work includes following recurring tournament series and reminders/updates.

Possible Kurukshetra future features:

```text
Follow tournament
Follow team
Follow player
Follow college
```

Notifications:
```text
Your match starts soon
Tournament registration closes soon
Your team advanced
New tournament announced
```

---

## 12. Calendar / Schedule

Calendar export is a useful convenience concept.

Possible Kurukshetra future feature:
- add match to Google Calendar
- export schedule
- team calendar
- college esports calendar

---

## 13. Achievements / Competitive History

A persistent competitive identity can connect:

```text
College
→ tournaments played
→ wins
→ titles
→ placements
→ points
→ achievements
```

This can become an important identity layer for Kurukshetra.

---

## 14. Feature Dependencies

```text
Authentication
      ↓
Profile
      ↓
College
      ↓
Team
      ↓
Tournament Registration
      ↓
Tournament
      ↓
Stage
      ↓
Match
      ↓
Result
      ↓
Points
      ↓
Leaderboard
      ↓
Player / Team / College History
```

Do not implement official leaderboard logic before the result model is trustworthy.

---

## 15. Not Appropriate for Immediate V1

- full wiki editing
- contributor workflows
- complex wiki templates
- community-maintained encyclopedia infrastructure
- massive historical global esports coverage
- every game-specific statistic
- exhaustive global esports coverage

Kurukshetra should be narrower and action-oriented.

---

## 16. Proposed Kurukshetra Product Shape

```text
DISCOVER
Games
Tournaments
Teams
Players

        ↓

JOIN
Sign in
Create profile
Create/join team
Register

        ↓

COMPETE
Schedule
Match
Bracket
Results

        ↓

PROGRESS
Points
Leaderboard
Achievements
History

        ↓

RETURN
Follow
Notifications
Community
Future events
```

---

## 17. Evidence / Source Notes

Public Liquipedia documentation describes tournament pages containing information such as format, prize distribution/final standings, participants, broadcasts, statistics, results, brackets/group stages, and match-level details. Liquipedia's app documentation also describes match pages that adapt to match status and game-specific data, plus team/player pages with rosters, schedules, tournaments, statistics, and detailed results. Its roadmap/changelog documents work around tournament lists, match tickers, calendar export, follows, notifications, rankings, and related features.

The exact availability of individual features can vary by game/wiki and can change over time, so this audit focuses on product capabilities rather than treating every implementation as universal.
