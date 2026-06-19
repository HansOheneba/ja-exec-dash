/**
 * App-wide config for routing and portal mode.
 *
 * This is the standalone advisor portal. NEXT_PUBLIC_PORTAL defaults to "advisor".
 */

export type PortalMode = "advisor";

export const appConfig = {
  portal: (process.env.NEXT_PUBLIC_PORTAL ?? "advisor") as PortalMode,

  routes: {
    advisor: {
      dashboard: "/advisors/dashboard",
      clients: "/advisors/dashboard/clients",
      profile: "/advisors/dashboard/profile",
    },
  },
} as const;
