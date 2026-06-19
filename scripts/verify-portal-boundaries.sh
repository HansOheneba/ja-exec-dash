#!/usr/bin/env bash
# Quick boundary check before splitting repos. Run from project root.
set -euo pipefail

echo "Checking client portal does not import advisor code..."
if rg -l "components/advisors|lib/api/advisor|lib/advisor-" app/clients components/goals components/celerey 2>/dev/null; then
  echo "FAIL: client code imports advisor modules"
  exit 1
fi

echo "Checking goal-card has no advisor imports..."
if rg "components/advisors" components/goals/goal-card.tsx 2>/dev/null; then
  echo "FAIL: goal-card imports advisor code"
  exit 1
fi

echo "OK: portal boundaries look clean"
