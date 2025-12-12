"use client";

import { cn } from "@/lib/utils";

interface TableContentProps {
  data: (string | number)[];
  className?: string;
}

export function TableContent({ data, className }: TableContentProps) {
  return (
    <div className={cn("flex items-center h-12 px-2 text-sm text-foreground", className)}>
      {data.map((item, i) => (
        <div key={i} className="flex-1 px-2 text-left">
          {item}
        </div>
      ))}
    </div>
  );
}
