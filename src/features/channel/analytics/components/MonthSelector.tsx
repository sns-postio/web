"use client";

import type React from "react";

import { createContext, useContext, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MonthItem {
  year: number;
  month: number;
}

interface MonthSelectorProps {
  months: MonthItem[];
  defaultValue?: MonthItem; // 최초 선택값
  onChange?: (value: MonthItem) => void;
  className?: string;
  children?: React.ReactNode;
}

interface MonthSelectorContextValue {
  current: MonthItem;
}

const MonthSelectorContext = createContext<MonthSelectorContextValue | null>(null);

const isSameMonth = (a: MonthItem, b: MonthItem) => a.year === b.year && a.month === b.month;

export function MonthSelector({
  months,
  defaultValue,
  onChange,
  className,
  children,
}: MonthSelectorProps) {
  // index 기반 선택
  const defaultIndex = defaultValue
    ? months.findIndex((m) => isSameMonth(m, defaultValue))
    : 0;

  const [index, setIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);

  const current = months[index];

  const contextValue = useMemo(() => ({ current }), [current]);

  const move = (direction: "prev" | "next") => {
    let newIndex = index;

    if (direction === "prev" && index > 0) {
      newIndex = index - 1;
    }
    if (direction === "next" && index < months.length - 1) {
      newIndex = index + 1;
    }

    if (newIndex !== index) {
      setIndex(newIndex);
      onChange?.(months[newIndex]);
    }
  };

  return (
    <MonthSelectorContext.Provider value={contextValue}>
      <div className={cn("flex w-full flex-col gap-6", className)}>
        <div className="w-full flex justify-center gap-4">
          {/* Prev */}
          <button
            type="button"
            onClick={() => move("prev")}
            disabled={index === 0}
            className={cn(
              "p-1 rounded transition cursor-pointer",
              index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-accent"
            )}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Center Text */}
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm text-muted-foreground">{current.year}년</span>
            <span className="text-lg font-bold">{current.month}월</span>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => move("next")}
            disabled={index === months.length - 1}
            className={cn(
              "p-1 rounded transition cursor-pointer",
              index === months.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-accent"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {children}
      </div>
    </MonthSelectorContext.Provider>
  );
}

interface MonthContentProps {
  value: MonthItem;
  children: React.ReactNode;
}

export function MonthSelectorContent({ value, children }: MonthContentProps) {
  const context = useContext(MonthSelectorContext);

  if (!context) {
    return null;
  }

  if (!isSameMonth(context.current, value)) {
    return null;
  }

  return <div className="w-full">{children}</div>;
}
