<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-conventions -->
# Project conventions

## No em dashes

Never use em dashes (`—`) anywhere in this project: UI copy, comments, docs, metadata, or commits. Use a comma, period, colon, hyphen, or parentheses instead. See `.cursor/rules/no-em-dashes.mdc`.

## Standalone advisor portal

This copy is the **advisor portal only** (`NEXT_PUBLIC_PORTAL=advisor`):

- **Advisor portal:** `app/advisors/dashboard/*`
- No client dashboard, portal switcher, or `lib/api/client`

Data is mocked under `lib/api/` (see `lib/api/README.md`). Pages should import from `lib/api/advisor` or `lib/api/domain`, not ad-hoc paths.

To split the original combined repo, follow `docs/SPLIT.md` and use `lib/portal-manifest.ts` as the delete list.

**Import rules:** Use `AdvisorGoalCard` on the advisor side instead of wiring edit sheets into `GoalCard`.
<!-- END:project-conventions -->
