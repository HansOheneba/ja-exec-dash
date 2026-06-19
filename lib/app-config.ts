/**
 * App-wide config for routing and portal mode.
 *
 * When you split into two standalone apps, set NEXT_PUBLIC_PORTAL to "client" or
 * "advisor" in each app's .env. Keep "dual" only in this combined dev repo.
 */

export type PortalMode = "dual" | "client" | "advisor";

export const appConfig = {
  portal: (process.env.NEXT_PUBLIC_PORTAL ?? "dual") as PortalMode,

  routes: {
    client: {
      dashboard: "/clients/dashboard",
      messages: "/clients/dashboard/messages",
      concierge: "/clients/dashboard/concierge",
      profile: "/clients/dashboard/profile",
    },
    advisor: {
      dashboard: "/advisors/dashboard",
      clients: "/advisors/dashboard/clients",
      profile: "/advisors/dashboard/profile",
    },
  },
} as const;

export function isDualPortal(): boolean {
  return appConfig.portal === "dual";
}

export function isClientPortal(): boolean {
  return appConfig.portal === "client" || appConfig.portal === "dual";
}

export function isAdvisorPortal(): boolean {
  return appConfig.portal === "advisor" || appConfig.portal === "dual";
}
