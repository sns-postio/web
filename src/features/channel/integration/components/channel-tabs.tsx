"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type TabItem = {
  key: string;
  label: string;
  href: string;
  disabled?: boolean;
};

const buildDefaultTabs = (locale: string, t: (key: string) => string): TabItem[] => [
  {
    key: "overview",
    label: t("overview"),
    href: `/${locale}/channel/integration`,
  },
  {
    key: "youtube",
    label: t("youtube"),
    href: `/${locale}/youtube`,
  },
  {
    key: "facebook",
    label: t("facebook"),
    href: `/${locale}/channel/integration#facebook`,
    disabled: true,
  },
  {
    key: "instagram",
    label: t("instagram"),
    href: `/${locale}/instagram`,
  },
  {
    key: "tiktok",
    label: t("tiktok"),
    href: `/${locale}/tiktok`,
  },
];

type ChannelTabsProps = {
  items?: TabItem[];
  className?: string;
};

export function ChannelTabs({ items, className }: ChannelTabsProps) {
  const locale = useLocale();
  const t = useTranslations("analytics.tabs");
  const pathname = usePathname();

  const tabs = items ?? buildDefaultTabs(locale, t);

  return (
    <nav className={cn("mt-6 flex items-center gap-3 border-b border-border px-2", className)}>
      {tabs.map((tab) => {
        const isActive = pathname?.startsWith(tab.href);
        const disabled = tab.disabled;
        const handleClick = disabled
          ? (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault()
          : undefined;
        return (
          <Link
            key={tab.key}
            href={disabled ? "#" : tab.href}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
            onClick={handleClick}
            className={cn(
              "inline-flex items-center rounded-md border-b-2 px-4 py-2 text-sm font-medium transition",
              disabled && "cursor-not-allowed opacity-60",
              !disabled && "hover:text-foreground",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default ChannelTabs;
