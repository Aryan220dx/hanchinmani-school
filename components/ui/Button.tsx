import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow-glass hover:-translate-y-0.5 hover:bg-primary-light",
        amber: "bg-amber text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#b96105]",
        glass: "border border-white/35 bg-white/12 text-white backdrop-blur-md hover:bg-white/20",
        outline: "border border-primary/20 bg-white text-primary hover:-translate-y-0.5 hover:border-primary/45",
        ghost: "text-primary hover:bg-primary/8"
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-3",
        lg: "px-7 py-4 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
  };

export function Button({ className, variant, size, asChild, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return <Link className={classes} href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  const Comp = asChild ? Slot : "button";
  return <Comp className={classes} {...props} />;
}
