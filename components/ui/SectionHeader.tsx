import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeader({ eyebrow, title, description, align = "center", inverse }: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? <Badge className={cn(inverse && "border-white/20 bg-white/10 text-amber")}>{eyebrow}</Badge> : null}
      <h2 className={cn("mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl", inverse ? "text-white" : "text-text-main")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-lg leading-8", inverse ? "text-white/78" : "text-text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
