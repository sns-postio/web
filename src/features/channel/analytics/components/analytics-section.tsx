"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelTabs, CustomTabContent, type TabItem } from "./channel-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Metric = {
  key: string;
  label: string;
  value: string;
  delta?: string;
};

const MOCK_METRICS: Metric[] = [
  { key: "views", label: "조회 수", value: "85,420", delta: "+12%" },
  { key: "likes", label: "좋아요", value: "5,320", delta: "+4%" },
  { key: "comments", label: "댓글", value: "932", delta: "+2%" },
  { key: "shares", label: "공유 수", value: "1,120", delta: "+8%" },
  { key: "followers", label: "팔로워", value: "72k", delta: "+1%" },
];

type AnalyticsSectionProps = {
  metrics?: Metric[];
};

export function AnalyticsSection({ metrics }: AnalyticsSectionProps) {
  const t = useTranslations("analytics.section");
  const locale = useLocale();
  const tabTranslations = useTranslations("analytics.tabs");
  const data = useMemo(() => metrics ?? MOCK_METRICS, [metrics]);

  const tabs: TabItem[] = useMemo(
    () => [
      { id: "overview", label: tabTranslations("overview") },
      { id: "youtube", label: tabTranslations("youtube") },
      { id: "facebook", label: tabTranslations("facebook"), isDisabled: true },
      { id: "instagram", label: tabTranslations("instagram") },
      { id: "tiktok", label: tabTranslations("tiktok") },
    ],
    [tabTranslations],
  );

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "overview");

  useEffect(() => {
    setActiveTab(tabs[0]?.id ?? "overview");
  }, [tabs]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 lg:py-16">
      <ChannelTabs tabs={tabs} defaultTab={tabs[0]?.id} onTabChange={setActiveTab} />
      <CustomTabContent value="overview" activeTab={activeTab}>
        <div></div>
      </CustomTabContent>

      <CustomTabContent value="youtube" activeTab={activeTab}>
        <div></div>
      </CustomTabContent>

      <CustomTabContent value="instagram" activeTab={activeTab}>
        <div></div>
      </CustomTabContent>

      <CustomTabContent value="tiktok" activeTab={activeTab}>
        <div></div>
      </CustomTabContent>
    </section>
  );
}

export default AnalyticsSection;
