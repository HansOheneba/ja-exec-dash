"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { H2, TextSmall } from "@/components/ui/typography";

export default function VerifyPage() {
  const router = useRouter();

  function handleComplete(value: string) {
    if (value.length === 6) {
      router.push("/welcome");
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-white/60">Secure sign-in</p>
        <H2 className="text-white">Verify your access</H2>
        <p className="mt-1 text-body-sm text-white/50">
          We sent a 6-digit code to your work email. It expires in 10 minutes.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <InputOTP
          maxLength={6}
          onComplete={handleComplete}
          containerClassName="justify-start gap-2"
        >
          <InputOTPGroup className="gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="size-12 rounded-lg border-white/20 bg-white/10 text-lg text-white data-[active=true]:border-white/60 data-[active=true]:ring-white/20 dark:bg-white/10"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          type="button"
          className="w-full bg-brand-accent text-white hover:bg-brand-accent/90"
          onClick={() => router.push("/welcome")}
        >
          Continue to workspace
        </Button>
      </div>

      <TextSmall className="text-white/50">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          className="font-medium text-white underline-offset-4 hover:underline"
        >
          Resend
        </button>
        {" or "}
        <Link
          href="/login"
          className="font-medium text-white underline-offset-4 hover:underline"
        >
          use a different email
        </Link>
      </TextSmall>
    </div>
  );
}
