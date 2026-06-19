import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NavIconProps = {
  icon?: LucideIcon;
  iconSrc?: string;
  label: string;
  className?: string;
};

function NavIcon({ icon: Icon, iconSrc, label, className }: NavIconProps) {
  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        aria-hidden
        className={cn("size-5 shrink-0 object-contain", className)}
      />
    );
  }

  if (Icon) {
    return <Icon className={cn("size-5 shrink-0", className)} aria-hidden />;
  }

  return null;
}

export { NavIcon };
