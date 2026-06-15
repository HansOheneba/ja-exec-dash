import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2 } from "@/components/ui/typography";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-white/60">Welcome</p>
        <H2 className="text-white">Sign in to your account</H2>
        <p className="mt-1 text-body-sm text-white/50">
          Enter your email and we&apos;ll send you a one-time code.
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
    </div>
  );
}
