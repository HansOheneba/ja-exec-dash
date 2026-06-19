/**
 * API layer entry. Import from subpaths for portal-specific data:
 *
 * - @/lib/api/advisor  Advisor portal
 * - @/lib/api/domain   Shared client record (portfolio, goals, legacy, etc.)
 */
export * as advisorApi from "./advisor";
export * as domainApi from "./domain";
