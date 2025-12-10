#!/bin/bash
# Notes API Demo Script
# Run: chmod +x demo.sh && ./demo.sh

API="http://localhost:4000/api/v1/notes"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           📝 Notes API Demo - ETHVault Platform          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}Features:${NC} UUID IDs | Input Validation | API Versioning (v1)"
echo ""

# 1. Create
echo -e "${GREEN}▶ 1. CREATE${NC} - POST /api/v1/notes"
NOTE1=$(curl -s -X POST "$API" -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"Hello from ETHVault staking platform!"}')
echo "$NOTE1" | python3 -m json.tool 2>/dev/null || echo "$NOTE1"
ID1=$(echo "$NOTE1" | python3 -c "import sys,json; print(json.load(sys.stdin)['note']['id'])" 2>/dev/null)
echo ""

echo -e "${GREEN}▶ 2. CREATE${NC} - Another note"
NOTE2=$(curl -s -X POST "$API" -H "Content-Type: application/json" \
  -d '{"title":"Staking Reminder","content":"Check validator status weekly"}')
echo "$NOTE2" | python3 -m json.tool 2>/dev/null || echo "$NOTE2"
ID2=$(echo "$NOTE2" | python3 -c "import sys,json; print(json.load(sys.stdin)['note']['id'])" 2>/dev/null)
echo ""

# 2. Read All
echo -e "${BLUE}▶ 3. READ ALL${NC} - GET /api/v1/notes"
curl -s "$API" | python3 -m json.tool 2>/dev/null
echo ""

# 3. Read One
echo -e "${BLUE}▶ 4. READ ONE${NC} - GET /api/v1/notes/$ID1"
curl -s "$API/$ID1" | python3 -m json.tool 2>/dev/null
echo ""

# 4. Update
echo -e "${YELLOW}▶ 5. UPDATE${NC} - PUT /api/v1/notes/$ID1"
curl -s -X PUT "$API/$ID1" -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}' | python3 -m json.tool 2>/dev/null
echo ""

# 5. Delete
echo -e "${RED}▶ 6. DELETE${NC} - DELETE /api/v1/notes/$ID2"
curl -s -X DELETE "$API/$ID2" | python3 -m json.tool 2>/dev/null
echo ""

# 6. Validation Tests
echo -e "${RED}▶ 7. VALIDATION${NC} - Invalid UUID (returns 400)"
curl -s "$API/not-a-uuid" | python3 -m json.tool 2>/dev/null
echo ""

echo -e "${RED}▶ 8. NOT FOUND${NC} - Valid UUID but doesn't exist (returns 404)"
curl -s "$API/550e8400-e29b-41d4-a716-446655440000" | python3 -m json.tool 2>/dev/null
echo ""

# Final State
echo -e "${GREEN}▶ 9. FINAL STATE${NC} - All remaining notes"
curl -s "$API" | python3 -m json.tool 2>/dev/null
echo ""

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    ✅ Demo Complete!                     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""


