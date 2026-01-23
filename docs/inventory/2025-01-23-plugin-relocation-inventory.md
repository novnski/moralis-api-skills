# Plugin Relocation Inventory Report

**Date:** 2025-01-23
**Task:** #3 - Inventory and baseline checks
**Status:** Complete

## Executive Summary

The repository is in a **TRANSITIONAL STATE** with skills moved from `plugins/*/skills/*` to root-level `skills/` directory. This move appears to be in progress but not complete. SKILL.md files still reference old `web3-*` naming while directories use new `moralis-*` naming.

**Critical Finding:** Git shows 44 files deleted from `plugins/` but the new structure at `skills/` is not yet committed. The skills directories in `plugins/` are now empty.

---

## 1. Current Repository Structure

### Top-Level Directory Structure

```
moralis-api-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace manifest (v1.1.0)
├── plugins/
│   ├── web3-api-skills/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json       # Plugin manifest (v1.1.0)
│   │   ├── agents/
│   │   │   └── web3-developer.md
│   │   ├── commands/
│   │   │   └── web3-api-key.md   # API key setup command
│   │   └── skills/               # ⚠️ NOW EMPTY (directories exist but no files)
│   └── streams-api-skills/
│       ├── .claude-plugin/
│       │   └── plugin.json       # Plugin manifest (v1.1.0)
│       ├── agents/
│       │   └── moralis-platform-developer.md
│       ├── README.md
│       └── skills/               # ⚠️ NOW EMPTY (directory exists but no files)
├── skills/                       # ⭐ NEW ROOT-LEVEL LOCATION (not committed)
│   ├── moralis-analytics-api/
│   ├── moralis-api-key/
│   ├── moralis-blockchain-api/
│   ├── moralis-defi-api/
│   ├── moralis-entity-api/
│   ├── moralis-nft-api/
│   ├── moralis-premium/
│   ├── moralis-price-api/
│   ├── moralis-score-api/
│   ├── moralis-sniper-api/
│   ├── moralis-streams-api/
│   ├── moralis-token-api/
│   ├── moralis-utils/
│   ├── moralis-wallet-api/
│   └── web3-shared/
│       ├── query.js
│       └── query.js.backup
├── documentation/
├── scripts/
├── swagger/
└── simulation/                   # Contains OLD cached versions for reference
    └── claude-install/.claude/plugins/cache/moralis-skills/
        ├── web3-api-skills/1.0.1/
        └── streams-api-skills/1.0.0/
```

---

## 2. Skills Inventory

### Old Structure (BEFORE move - 9 skills)

Located at: `plugins/web3-api-skills/skills/`

| Old Directory | Status | Files (git shows deleted) |
|---------------|--------|---------------------------|
| `web3-wallet-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-token-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-nft-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-defi-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-entity-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-price-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-blockchain-api/` | Empty | SKILL.md, query.js, references/* |
| `web3-utils/` | Empty | SKILL.md, query.js, references/* |
| `web3-premium/` | Empty | SKILL.md, query.js, references/* |
| `web3-shared/` | Empty | query.js, query.js.backup |

**Total web3-api-skills:** 9 skills + 1 shared utility

### Old Structure (BEFORE move - 1 skill)

Located at: `plugins/streams-api-skills/skills/`

| Old Directory | Status | Files (git shows deleted) |
|---------------|--------|---------------------------|
| `streams-api/` | Empty | SKILL.md, query.js, references/* |

**Total streams-api-skills:** 1 skill

### New Structure (AFTER move - NOT COMMITTED)

Located at: `/Users/iulian/Code/moralis-api-skills/skills/`

| New Directory | Has SKILL.md | Has query.js | Notes |
|---------------|--------------|--------------|-------|
| `moralis-wallet-api/` | Yes | Yes | Renamed from web3-wallet-api |
| `moralis-token-api/` | Yes | Yes | Renamed from web3-token-api |
| `moralis-nft-api/` | Yes | Yes | Renamed from web3-nft-api |
| `moralis-defi-api/` | Yes | Yes | Renamed from web3-defi-api |
| `moralis-entity-api/` | Yes | Yes | Renamed from web3-entity-api |
| `moralis-price-api/` | Yes | Yes | Renamed from web3-price-api |
| `moralis-blockchain-api/` | Yes | Yes | Renamed from web3-blockchain-api |
| `moralis-utils/` | Yes | Yes | Renamed from web3-utils |
| `moralis-premium/` | Yes | Yes | Renamed from web3-premium |
| `moralis-analytics-api/` | Yes | Yes | NEW in v1.1.0 |
| `moralis-score-api/` | Yes | Yes | NEW in v1.1.0 |
| `moralis-sniper-api/` | Yes | Yes | NEW in v1.1.0 |
| `moralis-streams-api/` | Yes | Yes | Moved from streams-api-skills |
| `moralis-api-key/` | Dir only | No | ⚠️ Empty directory (new command skill?) |
| `web3-shared/` | No | Yes | Shared query client |

**Total new structure:** 13 moralis-* skills + 1 web3-shared utility

---

## 3. Plugin Install Command References

All occurrences of plugin installation commands that need updating:

### Marketplace Add Command
```bash
/plugin marketplace add noviulian/moralis-skills
```
**Found in:**
- CLAUDE.md (line 49)
- CLAUDE.md (line 64) - local testing
- README.md (line 12)
- RELEASE_NOTES.md (lines 14, 59)
- plugins/streams-api-skills/README.md (line 19)
- documentation/github-pages/index.md (line 29)
- documentation/github-pages/installation.md (line 25)
- documentation/MIGRATION_GUIDE.md (lines 74, 75, 211, 212)

### Plugin Install Commands
```bash
/plugin install web3-api-skills@moralis-skills
/plugin install streams-api-skills@moralis-skills
```
**Found in:**
- CLAUDE.md (lines 54, 59)
- README.md (lines 18, 23)
- RELEASE_NOTES.md (lines 19, 24, 60)
- plugins/streams-api-skills/README.md (line 23)
- documentation/github-pages/index.md (lines 34, 38)
- documentation/github-pages/installation.md (lines 30, 34)
- documentation/MIGRATION_GUIDE.md (lines 74, 75, 211, 212)

### API Key Command
```bash
/web3-api-key <your_api_key_here>
```
**Found in 45+ locations including:**
- CLAUDE.md (line 22, 291, 303)
- README.md (line 28)
- RELEASE_NOTES.md (line 24, 61)
- scripts/test-all-skills.sh (line 10)
- plugins/web3-api-skills/commands/web3-api-key.md (throughout)
- All 13+ SKILL.md files
- documentation/github-pages/index.md (line 43)
- documentation/github-pages/installation.md (lines 39, 106, 111)
- plugins/streams-api-skills/agents/moralis-platform-developer.md (line 76)

---

## 4. Plugin Cache Path References

All references to Claude's plugin cache directory structure:

### Cache Directory Paths
```bash
~/.claude/plugins/cache/moralis-skills/web3-api-skills/*/
~/.claude/plugins/cache/moralis-skills/streams-api-skills/*/
```
**Found in:**
- README.md (lines 93-94)
- documentation/github-pages/installation.md (lines 50-52)

### OLD Marketplace Path (web3-skills)
```bash
~/.claude/plugins/marketplaces/web3-skills/
~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/
```
**Found in (NEEDS UPDATE):**
- plugins/web3-api-skills/commands/web3-api-key.md (lines 57, 67, 106, 113, 123, 152, 157, 188, 189)

### NEW Marketplace Path (moralis-skills)
```bash
~/.claude/plugins/marketplaces/moralis-skills/
~/.claude/plugins/cache/moralis-skills/web3-api-skills/*/
```
**Found in:**
- plugins/web3-api-skills/skills/web3-wallet-api/SKILL.md (line 82) - ⚠️ File deleted but referenced in grep

---

## 5. Absolute Paths and Hard-coded Locations

### SKILL.md Files with Path References

**web3-wallet-api/SKILL.md** (line 78-84):
```markdown
## Important: Path Resolution

This skill can be installed in different locations. Always use `$SKILL_DIR` to reference the skill directory:

**Installation paths:**

- Plugin: `~/.claude/plugins/marketplaces/moralis-skills/skills/web3-wallet-api`
- Global: `~/.claude/skills/web3-wallet-api`
- Project: `<project>/.claude/skills/web3-wallet-api`
```
⚠️ **Issue:** References `web3-wallet-api` but new directory is `moralis-wallet-api`

### No Absolute Paths Found

Good news: No absolute paths like `/Users/...` found in SKILL.md files. All use `~/.claude` or `$SKILL_DIR` variables.

---

## 6. Plugin Manifests

### Marketplace Manifest
**File:** `.claude-plugin/marketplace.json`
**Version:** 1.1.0
**Owner:** noviulian
**Plugins:**
1. `web3-api-skills` (source: `./plugins/web3-api-skills/`)
2. `streams-api-skills` (source: `./plugins/streams-api-skills/`)

⚠️ **Issue:** Still references `plugins/` subdirectories but skills have been moved to root `skills/`

### web3-api-skills Plugin Manifest
**File:** `plugins/web3-api-skills/.claude-plugin/plugin.json`
**Version:** 1.1.0
**Commands:** `./commands/web3-api-key.md`
**Agents:** `./agents/web3-developer.md`
**Skills:** `./skills/`

⚠️ **Issue:** References `./skills/` which is now empty

### streams-api-skills Plugin Manifest
**File:** `plugins/streams-api-skills/.claude-plugin/plugin.json`
**Version:** 1.1.0
**Agents:** `./agents/moralis-platform-developer.md`
**Skills:** `./skills/`

⚠️ **Issue:** References `./skills/` which is now empty

---

## 7. Script References

### test-all-skills.sh
**File:** `scripts/test-all-skills.sh`
**Issues:**
- Line 9: Checks for `.env` at `plugins/web3-api-skills/skills/web3-wallet-api/.env`
- Line 18: Hardcodes array of 9 skills with `web3-*` naming
- Lines 21-22: Looks for skills at `plugins/web3-api-skills/skills/$skill`

**Needs update:**
- Change path to `skills/moralis-wallet-api/.env`
- Update skill array to use `moralis-*` naming (13 skills)
- Update skill paths to `skills/$skill`

### test-installation.sh
**File:** `scripts/test-installation.sh`
**Issues:**
- Line 35: Counts skills using `find plugins/web3-api-skills/skills -maxdepth 1 -type d -name "web3-*"`
- Line 37: Expects exactly 9 skills
- Line 46: Checks for `plugins/web3-api-skills/skills/web3-shared/query.js`

**Needs update:**
- Change path to `skills/`
- Update pattern to `moralis-*`
- Update count to 13 skills
- Update shared path to `skills/web3-shared/query.js`

---

## 8. Simulation Directory (Reference)

**Path:** `simulation/claude-install/.claude/plugins/cache/moralis-skills/`

Contains old cached versions for testing:
- `web3-api-skills/1.0.1/skills/` - All 9 web3-* skills
- `streams-api-skills/1.0.0/skills/` - streams-api skill

**Status:** This appears to be a test environment showing the OLD structure before the move.

---

## 9. Naming Convention Changes

### Old Naming (web3-*)
- web3-wallet-api
- web3-token-api
- web3-nft-api
- web3-defi-api
- web3-entity-api
- web3-price-api
- web3-blockchain-api
- web3-utils
- web3-premium
- web3-analytics-api (new in v1.1.0)
- web3-score-api (new in v1.1.0)
- web3-sniper-api (new in v1.1.0)
- web3-shared

### New Naming (moralis-*)
- moralis-wallet-api
- moralis-token-api
- moralis-nft-api
- moralis-defi-api
- moralis-entity-api
- moralis-price-api
- moralis-blockchain-api
- moralis-utils
- moralis-premium
- moralis-analytics-api (new in v1.1.0)
- moralis-score-api (new in v1.1.0)
- moralis-sniper-api (new in v1.1.0)
- moralis-streams-api (moved from streams-api-skills)
- web3-shared (unchanged)

**Note:** SKILL.md frontmatter still uses `name: web3-*` but directories are now `moralis-*`

---

## 10. Git Status Summary

### Deleted Files (44 total)
All files deleted from `plugins/*/skills/*/` directories but not yet committed:
- 13 SKILL.md files (web3-* + streams-api)
- 13 query.js files
- Multiple reference documentation files
- 1 backup query.js file

### Untracked Files
- `skills/` directory (entire new structure)
  - 13 moralis-* skill directories
  - 1 web3-shared utility directory

### Current Branch
`main` - Up to date with origin/main

**Last Commit:** 74fb26e "feat: add Moralis Platform Developer agent for enhanced Web3 and Streams API integration"

---

## 11. Key Findings for Relocation Task

### What Has Changed
1. ✅ Skills moved from `plugins/*/skills/*` to root-level `skills/`
2. ✅ Renamed from `web3-*` to `moralis-*` (except web3-shared)
3. ✅ 3 new skills added in v1.1.0 (analytics, score, sniper)
4. ✅ streams-api moved to `moralis-streams-api`
5. ✅ New empty `moralis-api-key/` directory (likely for command skill)

### What Needs Updating
1. ⚠️ **Plugin manifests** - Still point to `./skills/` subdirectories
2. ⚠️ **SKILL.md frontmatter** - Still uses `name: web3-*`
3. ⚠️ **SKILL.md path references** - References old `web3-*` paths
4. ⚠️ **web3-api-key command** - References old `web3-skills` marketplace paths
5. ⚠️ **Test scripts** - Hardcoded paths and skill counts
6. ⚠️ **Documentation** - All install docs need path updates
7. ⚠️ **Plugin marketplace.json** - May need structure reorganization

### What's Missing
- Plugin structure unclear with root-level skills
- Need to determine new plugin architecture
- `moralis-api-key/` directory exists but is empty

---

## 12. Success Criteria Checklist

- ✅ **Capture current repo tree snapshot** - Complete (Section 1)
- ✅ **List all existing skills** - Complete (Sections 2-3)
  - Old structure: 9 web3-* + 1 streams-api = 10 skills
  - New structure: 12 moralis-* + 1 moralis-streams-api + 1 web3-shared = 14 items
- ✅ **Count and record skill names and paths** - Complete
  - Old: `plugins/web3-api-skills/skills/web3-*` (9 skills)
  - Old: `plugins/streams-api-skills/skills/streams-api` (1 skill)
  - New: `skills/moralis-*` (13 skills)
  - New: `skills/web3-shared` (utility)
- ✅ **Identify plugin install command references** - Complete (Section 3)
  - `/plugin marketplace add` - 8 files
  - `/plugin install` - 16 files
  - `/web3-api-key` - 45+ files
- ✅ **Identify plugin cache path references** - Complete (Section 4)
  - Cache paths in README, installation docs
  - Old web3-skills paths in command file
- ✅ **Identify absolute paths in SKILL.md** - Complete (Section 5)
  - No absolute paths found
  - Uses `~/.claude` and `$SKILL_DIR` variables
  - Path resolution section in web3-wallet-api/SKILL.md

---

## Next Steps Recommendations

1. **Decide on final plugin structure**
   - Keep plugins/ with subdirectories?
   - Flatten everything to root skills/?
   - Create new moralis-api-skills plugin at root?

2. **Update naming consistency**
   - Choose: web3-* vs moralis-*
   - Update SKILL.md frontmatter to match directory names

3. **Update all file references**
   - Plugin manifests (plugin.json files)
   - Marketplace manifest (marketplace.json)
   - Command scripts (test-all-skills.sh, test-installation.sh)
   - API key command (web3-api-key.md)
   - Documentation (README, CLAUDE.md, installation guides)

4. **Handle empty directories**
   - Determine purpose of `moralis-api-key/`
   - Remove or populate as needed

5. **Commit the move**
   - Stage new skills/ directory
   - Remove old plugins/*/skills/ directories
   - Update all references before committing
