"use client";

import { cn } from "@/lib/utils";

interface TableHeaderProps {
  columns: string[];
  className?: string;
}

export function TableHeader({ columns, className }: TableHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center h-10 px-2 border-b border-border text-sm font-medium text-foreground bg-muted",
        className
      )}
    >
      {columns.map((col) => (
        <div key={col} className="flex-1 px-2 text-left text-muted-foreground">
          {col}
        </div>
      ))}
    </div>
  );
}
