import { avatarGradients } from "@/data/mock";
import { cn } from "@/lib/utils";

interface Props {
  initials: string;
  ci: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function GradientAvatar({ initials, ci, size = "md", className }: Props) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-sm ring-2 ring-background",
        sizes[size],
        className,
      )}
      style={{ backgroundImage: avatarGradients[ci % avatarGradients.length] }}
    >
      {initials}
    </div>
  );
}
