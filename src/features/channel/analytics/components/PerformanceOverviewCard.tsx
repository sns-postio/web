"use client";


import { TrendingUp, TrendingDown } from "lucide-react";

interface PerformanceOverviewCardProps {
  label: string;
  value?: string | number;
  change?: number;

}

export function PerformanceOverviewCard({
  label,
  value,
  change,

}: PerformanceOverviewCardProps) {
  const isPositive = change !== undefined && change > 0;
  const displayValue = value ?? "-";

  return (
    <div className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-white w-full shadow-sm min-w-max">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium tracking-normal leading-5">{label}</span>

        {change !== undefined && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border border-border leading-4 tracking-normal text-foreground font-semibold">
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isPositive ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>

      <span className="text-2xl font-semibold leading-8 tracking-normal text-card-foreground">{displayValue}</span>
    </div>
  );
}
