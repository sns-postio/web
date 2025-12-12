"use client";

import type React from "react";

import { useState } from "react";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

export interface ChannelTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function ChannelTabs({ tabs, defaultTab, onTabChange }: ChannelTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="flex flex-row w-fit min-w-max">
      {tabs.map((tab) =>
        activeTab === tab.id ? (
          <div
            key={tab.id}
            className="flex items-center gap-[10px] py-2 px-4 border-b-2 border-primary text-foreground"
          >
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className="text-base font-medium leading-6 tracking-normal text-foreground cursor-pointer"
            >
              {tab.label}
            </button>
          </div>
        ) : (
          <div
            key={tab.id}
            className="flex items-center gap-[10px] py-2 px-4 border-b-2 border-muted text-muted-foreground hover:text-foreground"
          >
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className="text-base font-medium leading-6 tracking-normal text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {tab.label}
            </button>
          </div>
        )
      )}
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
