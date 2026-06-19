# API layer (`lib/api`)

This folder simulates how the app will talk to a backend. **Pages and components should import from here**, not from raw data files directly.

Today every module returns static mock data. Tomorrow, swap the implementation inside each file for `fetch()` calls without changing page imports.

## Structure

```
lib/api/
  client/     Client portal only (what the logged-in client sees)
  advisor/    Advisor portal only (book of business, firm tools)
  domain/     Shared client record (portfolio, goals, legacy, etc.)
```

## Import rules

| Portal | May import |
|--------|------------|
| Client app | `lib/api/client/*`, `lib/api/domain/*`, shared UI |
| Advisor app | `lib/api/advisor/*`, `lib/api/domain/*`, shared UI |
| Combined repo (now) | All of the above |

**Never:** client routes importing `lib/api/advisor` or `components/advisors`.

## Migration path

1. New code: `import { getGoals } from "@/lib/api/domain/goals"`
2. Old `lib/data/*` files remain as thin re-exports until imports are updated
3. On split: copy `lib/api/client` + `lib/api/domain` to client app; copy `lib/api/advisor` + `lib/api/domain` to advisor app

## Replacing mocks with real APIs

Each domain file should expose async functions:

```ts
// lib/api/domain/goals.ts (future)
export async function getGoals(clientId: string): Promise<Goal[]> {
  const res = await fetch(`/api/clients/${clientId}/goals`);
  return res.json();
}
```

Keep types in the same file or in `lib/api/domain/types.ts`.
