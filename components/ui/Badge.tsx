import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-amber/20 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber",
        className
      )}
      {...props}
    />
  );
}
