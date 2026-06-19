# Splitting into standalone Client and Advisor apps

> **This copy is the standalone advisor portal.** `NEXT_PUBLIC_PORTAL=advisor`. Client routes and `lib/api/client` have been removed.

This repo was originally **two products in one** for development. When you duplicate it, use this guide to produce two independent Next.js apps.

## Architecture today

```
app/advisors/dashboard/*    → Advisor portal (Jude / RM workspace)
lib/api/advisor/*           → Advisor-only mock API
lib/api/domain/*            → Shared client record (portfolio, goals, legacy, etc.)
```

`lib/data/*` still exists for backward compatibility. **New code should import from `lib/api/*`.** Each `lib/api` file is where you will later swap `fetch()` for mocks.

## Quick split (duplicate folder)

### 1. Client standalone

1. Duplicate the repo to e.g. `ja-client-portal`
2. Set `.env.local`:
   ```
   NEXT_PUBLIC_PORTAL=client
   ```
3. Delete everything in `lib/portal-manifest.ts` → `PORTAL_MANIFEST.client.deleteWhenStandalone`
4. Delete legacy routes in `PORTAL_MANIFEST.legacy` (optional cleanup)
5. Move `app/clients/dashboard/*` to `app/dashboard/*` (or keep path and update links)
6. Update `app/page.tsx` and auth redirects to `/clients/dashboard` (or new root)
7. Remove `PortalSwitcher`
8. Keep: `lib/api/client`, `lib/api/domain`, shared UI, `components/goals`, `components/celerey`

### 2. Advisor standalone

1. Duplicate to e.g. `ja-advisor-portal`
2. Set `.env.local`:
   ```
   NEXT_PUBLIC_PORTAL=advisor
   ```
3. Delete `PORTAL_MANIFEST.advisor.deleteWhenStandalone` paths
4. Keep: `lib/api/advisor`, `lib/api/domain`, `components/advisors`, `components/goals`, `components/celerey`
5. Use `AdvisorGoalCard` (not raw `GoalCard` with advisor variant) to avoid client-only deps

## File ownership reference

See `lib/portal-manifest.ts` for the canonical list. Summary:

| Layer | Client app | Advisor app | Both |
|-------|------------|-------------|------|
| Routes | `app/clients/` | `app/advisors/` | `app/(auth)/`, `app/layout.tsx` |
| API | `lib/api/client` | `lib/api/advisor` | `lib/api/domain` |
| Nav | `lib/client-navigation.ts` | `lib/advisor-navigation.ts` | `lib/navigation.ts` (types) |
| Components | (pages only) | `components/advisors/` | `components/ui`, `components/layout`, `components/charts` |

## Domain data (`lib/api/domain`)

These modules model **one client's record**. In production:

- **Client app** calls `GET /api/me/portfolio`, etc.
- **Advisor app** calls `GET /api/clients/:id/portfolio`, etc.

Same types, different endpoints. Keep types in domain modules when splitting.

## Cross-portal rules (enforced in code)

1. `components/goals/goal-card.tsx` is **client-safe** (no advisor imports)
2. `components/advisors/advisor-goal-card.tsx` wraps edit UI for advisor use
3. Route helpers live in `lib/app-config.ts` (no hardcoded `/clients/...` in shared components)

## After split: route simplification (optional)

You may flatten routes so each app uses `/dashboard` instead of `/clients/dashboard`:

1. Move pages from `app/clients/dashboard/page.tsx` → `app/dashboard/page.tsx`
2. Update `lib/app-config.ts` routes
3. Update navigation hrefs in `client-navigation.ts`

## Mock → real API checklist

For each file in `lib/api/domain/*.ts`:

1. Add `clientId` param where advisor reads a specific client
2. Replace exported constants with `async function getX(): Promise<T>`
3. Add error handling and loading states in pages
4. Remove `lib/data/*` re-export shims once all imports use `lib/api`

## Verify before shipping either app

```bash
# Client app: must not reference advisor paths
rg "advisors/dashboard|components/advisors|lib/api/advisor" app/clients components/goals

# Advisor app: must not reference client-only paths  
rg "lib/api/client|currency-context|lib/data/profile" app/advisors
```

Both should return zero matches after a clean split.
