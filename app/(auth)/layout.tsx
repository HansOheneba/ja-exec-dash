import Image from "next/image";

import { AuthBrandPanel } from "@/components/auth/auth-panel";
import { TextSmall } from "@/components/ui/typography";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-svh w-full lg:grid-cols-2">
      {/* Left: navy form side */}
      <div
        className="flex h-full flex-col px-8 py-8"
        style={{
          background:
            "linear-gradient(160deg, #202356 0%, #181d42 55%, #0d1230 100%)",
        }}
      >
        {/* Logo top-left */}
        <div className="shrink-0">
          <Image
            src="/logos/JAG_Primary_logo_white.png"
            alt="JA Group"
            width={110}
            height={36}
            className="object-contain"
            priority
          />
        </div>

        {/* Form centered */}
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>

        {/* Footer bottom-left */}
        <div className="shrink-0">
          <TextSmall className="text-white/40">
            Regulated wealth management. Trusted by clients across 14 countries.
          </TextSmall>
        </div>
      </div>

      {/* Right: photo panel */}
      <AuthBrandPanel />
    </div>
  );
}
