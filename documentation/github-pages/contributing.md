---
layout: default
title: Contributing
---

# Contributing to Web3 Skills

Thank you for your interest in contributing!

## Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/noviulian/moralis-skills.git`
3. Create a branch: `git checkout -b feature/your-feature`

## Development

### Adding a New Skill

1. Create directory: `skills/your-skill-name/`
2. Create `SKILL.md` following the [Agent Skills Standard](https://github.com/agentskills/agentskills)
3. Copy or symlink `query.js` from `skills/shared/`
4. Create reference documentation in `references/`
5. Test with a real API key

### SKILL.md Format

Required frontmatter:
```yaml
---
name: your-skill-name
description: What this skill does and when to use it
tags: [web3, ...]
version: 1.0.0
author: web3-skills
---
```

### Testing

```bash
# Set your API key
echo "MORALIS_API_KEY=your_key" > skills/your-skill/.env

# Test a query
cd skills/your-skill
node -e "const { query } = require('./query'); query('/endpoint', {}).then(console.log)"
```

## Commit Guidelines

- Use clear commit messages
- One feature per commit
- Reference issues: `Fixes #123`

## Pull Requests

1. Update documentation
2. Test on both EVM and Solana (if applicable)
3. Ensure no new dependencies added
4. Submit PR with clear description

## Zero Dependencies Policy

This plugin MUST NOT add external npm dependencies. All code must use Node.js built-in modules only:
- ✅ `https`, `http`, `fs`, `path`, `url`, `crypto`
- ❌ `axios`, `node-fetch`, `dotenv`, `express`, etc.
