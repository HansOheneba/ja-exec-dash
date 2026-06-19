"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 60);
    const t2 = setTimeout(() => setExiting(true), 1900);
    const t3 = setTimeout(() => router.push("/advisors/dashboard"), 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [router]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-opacity duration-500"
      style={{
        background:
          "linear-gradient(160deg, #202356 0%, #181d42 55%, #0d1230 100%)",
        opacity: exiting ? 0 : 1,
      }}
    >
      <div
        className="flex flex-col items-center transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <Image
          src="/logos/ja-symbol-white.png"
          alt="JA Group"
          width={52}
          height={52}
          className="size-[52px] object-contain"
          priority
        />
      </div>
    </div>
  );
}
