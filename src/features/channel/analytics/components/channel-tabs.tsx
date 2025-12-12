"use client";

import type React from "react";

import { useState } from "react";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  isDisabled?: boolean;
}

export interface ChannelTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function ChannelTabs({ tabs, defaultTab, onTabChange, className }: ChannelTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-fit border-b border-border">
      <div className={cn("flex items-center gap-[10px]", className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id, tab.isDisabled)}
            className={cn(
              "relative h-10 px-4 text-base font-medium transition-colors",
              tab.isDisabled && "cursor-not-allowed text-muted-foreground/60",
              !tab.isDisabled &&
                (activeTab === tab.id
                  ? "text-foreground after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary"
                  : "text-muted-foreground hover:text-foreground")
            )}
            disabled={tab.isDisabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TabContentProps {
  value: string;
  activeTab: string;
  children: React.ReactNode;
}

export function CustomTabContent({ value, activeTab, children }: TabContentProps) {
  if (value !== activeTab) return null;
  return <div className="mt-6">{children}</div>;
}
