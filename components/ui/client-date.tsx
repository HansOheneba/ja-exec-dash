"use client";

import { useEffect, useState } from "react";

import { Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type ClientDateProps = {
  className?: string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

function ClientDate({
  className,
  locale = "en-GB",
  options = defaultDateOptions,
}: ClientDateProps) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    setFormatted(new Date().toLocaleDateString(locale, options));
  }, [locale, options]);

  return (
    <Muted className={cn("min-h-[1.6em]", className)}>
      {formatted ?? "\u00a0"}
    </Muted>
  );
}

export { ClientDate };
