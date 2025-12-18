"use client";

import { cn } from "@/lib/utils";
import { TableHeader } from "./TableHeader";
import { TableContent } from "./TableContent";


interface TableSetProps {
  columns: string[];
  rows: (string | number)[][];
  className?: string;
}

export function TableSet({ columns, rows, className }: TableSetProps) {
  return (
    <div
      className={cn(
        "w-full  min-w-[1000px] max-w-[1280px] border border-border rounded-md overflow-hidden",
        className
      )}
    >
      <TableHeader columns={columns} />

      <div className="divide-y divide-border">
        {rows.map((row, index) => (
          <TableContent key={index} data={row} />
        ))}
      </div>
    </div>
  );
}
