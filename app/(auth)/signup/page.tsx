import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2, TextSmall } from "@/components/ui/typography";

export default function SignupPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-white/60">Get started</p>
        <H2 className="text-white">Create your account</H2>
        <p className="mt-1 text-body-sm text-white/50">
          We&apos;ll send a one-time code to verify your email.
        </p>
      </div>

      <form className="flex flex-col gap-4" action="/login/verify">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="first-name" className="text-white/80">
              First name
            </Label>
            <Input
              id="first-name"
              placeholder="Jane"
              autoComplete="given-name"
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="last-name" className="text-white/80">
              Last name
            </Label>
            <Input
              id="last-name"
              placeholder="Smith"
              autoComplete="family-name"
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-white/80">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/20"
          />
        </div>

        <Button
          type="submit"
          className="mt-2 w-full bg-brand-accent text-white hover:bg-brand-accent/90"
        >
          Send code
        </Button>
      </form>

      <TextSmall className="text-center text-white/50">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-white underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </TextSmall>
    </div>
  );
}
