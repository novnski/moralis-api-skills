---
name: moralis-api-key
description: Set or update the Moralis API key in a shared .env file for all Moralis skills. Use when user provides an API key or asks to configure credentials.
disable-model-invocation: true
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
    version: "1.1.0"
    author: moralis-skills
    tags: [moralis, api-key, configuration, setup, env]
    context:
        fork: false
        agent: ""
    allowed-tools:
        - Bash
        - Read
        - Write
    invocation:
        disable-model-invocation: true
        user-invocable: true
---

# Moralis API Key Manager

Set or update the Moralis API key in a shared `.env` file that all Moralis skills can access.

## When to Use This Skill

Use this skill when the user says things like:

- "Set this as the Moralis API key: `<key>`"
- "Use this API key: `<key>`"
- "Update the Moralis API key to: `<key>`"
- "Configure the API key"
- "Set up the credentials"
- "Here's my API key: `<key>`"

**How it works:**
1. Accept the API key from user input
2. Find the active skills root directory for the current agent
3. Create or update `.env` file in the parent of skills directory
4. Update `MORALIS_API_KEY` value without removing other environment variables
5. Confirm the key was updated and suggest a verification query

## Finding the Skills Root

The skill must determine the correct location for the shared `.env` file. Search in this order:

**Priority 1: Project-level skills**
```
<project>/.claude/skills/        → Create .env in <project>/.claude/.env
```

**Priority 2: Global skills**
```
~/.claude/skills/                → Create .env in ~/.claude/.env
```

**Detection algorithm:**
```javascript
// Search from current working directory upward
// 1. Look for .claude/skills/ directory
// 2. If not found, check ~/.claude/skills/
// 3. Use the parent of the skills directory as .env location
```

## Safe Update Algorithm

The `.env` file must be updated safely to preserve existing environment variables:

**Algorithm:**
1. Check if `.env` file exists
2. If exists:
   - Read all lines
   - Filter out any existing `MORALIS_API_KEY=` line
   - Append `MORALIS_API_KEY=<key>` to the end
   - Write back all lines
3. If not exists:
   - Create new file with only `MORALIS_API_KEY=<key>`

**Format requirements:**
- No quotes around the key
- No extra spaces around `=` sign
- Exact format: `MORALIS_API_KEY=your_api_key_here`
- Preserve all other environment variables

**JavaScript implementation:**
```javascript
const fs = require('fs');
const path = require('path');

function setAPIKey(skillsRoot, apiKey) {
  const envPath = path.join(skillsRoot, '.env');

  let lines = [];
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    lines = content.split('\n');
  }

  // Filter out existing MORALIS_API_KEY lines
  const filtered = lines.filter(line => !line.startsWith('MORALIS_API_KEY='));

  // Add new API key
  filtered.push(`MORALIS_API_KEY=${apiKey}`);

  // Write back
  fs.writeFileSync(envPath, filtered.join('\n') + '\n');
}
```

## Implementation Steps for Agents

**Step 1: Extract API key from user prompt**

Identify the API key in the user's message. Look for:
- Explicit key value: `"Set this as the Moralis API key: eyJhbGc..."`
- After "key:", "API key:", etc.

**Step 2: Determine skills root directory**

```javascript
// Check for project-level skills
const projectSkills = path.join(process.cwd(), '.claude', 'skills');
if (fs.existsSync(projectSkills)) {
  return path.join(process.cwd(), '.claude');
}

// Check for global skills
const globalSkills = path.join(os.homedir(), '.claude', 'skills');
if (fs.existsSync(globalSkills)) {
  return path.join(os.homedir(), '.claude');
}

// Fallback to current directory
return process.cwd();
```

**Step 3: Update the .env file**

Perform the safe update algorithm shown above.

**Step 4: Confirm and verify**

Report success to the user and suggest a verification query:

```
API key updated successfully at: /path/to/.env

Verify it's working by running a test query, for example:
"What's the balance of wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?"
```

## Common Pitfalls

### Wrong: Creating per-skill .env files

The old approach created separate `.env` files in each skill directory. This is wasteful and hard to maintain.

### Correct: Single shared .env file

Create ONE `.env` file in the parent of the skills directory. All skills read from this shared location.

### Wrong: Overwriting entire .env file

### Correct: Preserve existing variables

When updating `MORALIS_API_KEY`, preserve all other environment variables in the file.

### Wrong: Adding quotes or spaces

### Incorrect formats:**
- `MORALIS_API_KEY = "your_key"`  (spaces + quotes)
- `MORALIS_API_KEY='your_key'`     (quotes)

### Correct: `MORALIS_API_KEY=your_key` (no quotes, no spaces)

## Example Conversation

**User:** "Set this as the Moralis API key in the shared env: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

**Agent steps:**
1. Extract API key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
2. Find skills root: `/Users/iulian/Code/moralis-api-skills/.claude/skills`
3. .env location: `/Users/iulian/Code/moralis-api-skills/.claude/.env`
4. Update file (preserving existing vars if any)
5. Confirm: "API key updated at `/Users/iulian/Code/moralis-api-skills/.claude/.env`"

**Agent response:**
```
I've updated the Moralis API key in your shared .env file.

Location: /Users/iulian/Code/moralis-api-skills/.claude/.env

You can now use any Moralis skill. For example, try:
"Get the balance of wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

## Get Your API Key

1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free)
2. Get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

## Verification

After setting the API key, verify it works by running any Moralis skill query:

```bash
# Example test query
cd ~/.claude/skills/moralis-wallet-api
node -e "const { q } = require('./query');
q('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(r => console.log('Balance:', (r.balance/1e18).toFixed(4), 'ETH'))
  .catch(console.error);
"
```

Expected response:
```
Balance: 1.0000 ETH
```

## Troubleshooting

**"API key not found" error:**
- Verify the `.env` file exists in the correct location
- Check the file format: `MORALIS_API_KEY=your_key` (no quotes, no spaces)
- Ensure the skills are searching upward to find the shared `.env`

**"Skills can't find the .env file":**
- The query client must search upward from the skill directory
- Update the query client to use `path.join(__dirname, '../..', '.env')` or similar
- For skills in `<project>/.claude/skills/`, the `.env` should be at `<project>/.claude/.env`

**Other environment variables disappear:**
- Ensure you're preserving existing lines in the `.env` file
- Use the filter-and-append algorithm shown above
- Never write only the `MORALIS_API_KEY` line when the file already exists

## See Also

- [Project Root .env Pattern](https://github.com/agentskills/agentskills) - Shared configuration pattern
- [moralis-wallet-api](../moralis-wallet-api/SKILL.md) - Example skill that reads from shared .env
