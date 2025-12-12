"use client";

import type { ReactNode } from "react";

interface OverviewItemProps {
  title: string;
  value: string | ReactNode;
}

export function OverviewItem({ title, value }: OverviewItemProps) {
  return (
    <div className="flex flex-col flex-1 gap-1 px-4 py-4 rounded-xl bg-primary-foreground min-w-max">
      {/* Title */}
      <span className="text-sm text-muted-foreground">{title}</span>

      {/* Value */}
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  );
}
