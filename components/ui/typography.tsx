import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const displayVariants = cva("font-subheading tracking-tight text-display");

const h1Variants = cva("font-heading tracking-tight text-h1");

const h2Variants = cva("font-subheading tracking-tight text-h2");

const h3Variants = cva("font-subheading tracking-tight text-h3");

const h4Variants = cva("font-subheading tracking-tight text-h4");

const textVariants = cva("font-sans text-body", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const leadVariants = cva("font-sans text-lead text-muted-foreground");

const textSmallVariants = cva("font-sans text-body-sm text-foreground");

const captionVariants = cva("font-sans text-caption text-muted-foreground");

const overlineVariants = cva(
  "font-sans text-overline uppercase tracking-wide text-muted-foreground"
);

const numericVariants = cva(
  "font-numeric text-3xl font-semibold tracking-tight text-foreground"
);

function Display({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn(displayVariants(), className)} {...props} />;
}

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn(h1Variants(), className)} {...props} />;
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn(h2Variants(), className)} {...props} />;
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn(h3Variants(), className)} {...props} />;
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 className={cn(h4Variants(), className)} {...props} />;
}

function Text({
  className,
  variant,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof textVariants>) {
  return (
    <p className={cn(textVariants({ variant }), className)} {...props} />
  );
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(leadVariants(), className)} {...props} />;
}

function TextSmall({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(textSmallVariants(), className)} {...props} />;
}

function Caption({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn(captionVariants(), className)} {...props} />;
}

function Overline({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn(overlineVariants(), className)} {...props} />;
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(textVariants({ variant: "muted" }), className)}
      {...props}
    />
  );
}

function Numeric({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn(numericVariants(), className)} {...props} />
  );
}

export {
  Caption,
  Display,
  H1,
  H2,
  H3,
  H4,
  Lead,
  Muted,
  Numeric,
  Overline,
  Text,
  TextSmall,
  displayVariants,
  h1Variants,
  h2Variants,
  h3Variants,
  h4Variants,
  numericVariants,
  textVariants,
};
