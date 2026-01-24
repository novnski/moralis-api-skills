#!/bin/bash

echo "Testing Moralis API Skills v3.0.0..."
echo ""

# Check API key (look in project root or .claude directory)
if [ -f ".env" ]; then
  echo "✓ API key found at project root (.env)"
elif [ -f ".claude/.env" ]; then
  echo "✓ API key found at .claude/.env"
else
  echo "✗ API key not found. Create .env file with MORALIS_API_KEY"
  exit 1
fi

echo ""

SKILLS_DIR="./skills"
SKILLS=("moralis-data-api" "moralis-streams-api")

for skill in "${SKILLS[@]}"; do
  echo "Testing $skill..."
  if [ -f "$SKILLS_DIR/$skill/SKILL.md" ] && [ -f "$SKILLS_DIR/$skill/query.js" ]; then
    echo "✓ $skill OK"
  else
    echo "✗ $skill FAILED"
    exit 1
  fi
done

echo ""
echo "All skills OK!"
