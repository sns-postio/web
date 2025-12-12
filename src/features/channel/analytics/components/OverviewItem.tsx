"use client";

import { cn } from "@/lib/utils";

interface OverviewItemProps {
  title: string;
  value: string;
  className?: string;
}

export function OverviewItem({ title, value, className }: OverviewItemProps) {
  return (
    <div
      className={cn("flex flex-col gap-1 px-4 py-4 rounded-xl bg-primary-foreground", className)}
    >
      {/* Title */}
      <span className="text-sm text-muted-foreground">{title}</span>

      {/* Value */}
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  );
}
