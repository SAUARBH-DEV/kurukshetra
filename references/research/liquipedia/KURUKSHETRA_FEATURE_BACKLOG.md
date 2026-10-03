# KURUKSHETRA_FEATURE_BACKLOG.md

## V1 — Core competition loop

### Tournament discovery
**Why:** Core user entry point.  
**Dependencies:** games, tournaments.

### Tournament detail
**Why:** Central source of truth before registration and competition.  
**Dependencies:** tournaments, games, teams/players.

### Tournament registration
**Why:** Converts discovery into participation.  
**Dependencies:** authentication, profiles, teams, tournaments.

### Tournament stages / brackets
**Why:** Makes competition progression understandable.  
**Dependencies:** tournaments, stages, matches, results.

### Match schedule
**Why:** Players need to know when and where they compete.  
**Dependencies:** matches, tournament stages, teams/players.

### Results
**Why:** Creates the trusted record used by rankings and history.  
**Dependencies:** matches.

### College / team leaderboard
**Why:** Central competitive identity for Kurukshetra.  
**Dependencies:** results, tournaments, colleges, teams.

### Game catalog
**Why:** Organizes competitions by esport.  
**Dependencies:** tournaments.

### Search and filters
**Why:** Reduces friction as content grows.  
**Dependencies:** queryable games, tournaments, teams, players.

## V1.5 — Identity and retention

### Team profile
Roster, schedule, tournaments, results, achievements.

### Player profile
Competitive history, team, college, stats, achievements.

### Achievement history
Titles, placements, milestones, tournament history.

### Basic performance statistics
Matches, wins, losses, win rate, points, recent form.

### Broadcast/stream links
Useful for spectators and community viewing.

## Post-V1

### Following
Follow tournaments, teams, players, colleges.

### Notifications
Match reminders, registration closing, result updates, tournament announcements.

### Tournament series
Season/series-level event relationships.

## Later

- game-specific advanced match analytics
- advanced player graphs
- scouting-style analytics
- season/league systems
- recommendation engine
- richer community features

## Avoid for now

- full esports wiki/editor system
- massive historical global esports database
- complex game-specific statistics for every title
- copying Liquipedia's contributor model
- features without a clear college esports use case
