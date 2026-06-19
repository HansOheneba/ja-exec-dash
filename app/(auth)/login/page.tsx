import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2 } from "@/components/ui/typography";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-white/60">Wealth management workspace</p>
        <H2 className="text-white">Sign in to the advisor portal</H2>
        <p className="mt-1 text-body-sm text-white/50">
          Use your JA Group work email. We&apos;ll send a one-time code to verify
          your access.
        </p>
      </div>

      <form className="flex flex-col gap-4" action="/login/verify">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-white/80">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@jagroup.com"
            autoComplete="email"
            required
            className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/20"
          />
        </div>

        <Button
          type="submit"
          className="mt-2 w-full bg-brand-accent text-white hover:bg-brand-accent/90"
        >
          Send verification code
        </Button>
      </form>
    </div>
  );
}
