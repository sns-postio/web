"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelTabs, CustomTabContent, type TabItem } from "./channel-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthSelector } from "./MonthSelector";
import { OverviewItem } from "./OverviewItem";
import { TableSet } from "./TableSet";

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

const monthData = [
  { year: 2025, month: 8 },
  { year: 2025, month: 9 },
  { year: 2025, month: 12 },
];

const columns = [
  "도달 수",
  "노출 수",
  "조회 수",
  "좋아요 수",
  "댓글 수",
  "저장 수",
  "공유 수",
  "전체 참여 수",
  "참여율",
];

const rows = [[85420, 85420, 85420, 85420, 85420, 85420, 85420, 85420, "7.2%"]];

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
    [tabTranslations]
  );

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "overview");

  useEffect(() => {
    setActiveTab(tabs[0]?.id ?? "overview");
  }, [tabs]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 lg:py-16">
      <ChannelTabs tabs={tabs} defaultTab={tabs[0]?.id} onTabChange={setActiveTab} />
      <CustomTabContent value="overview" activeTab={activeTab}>
        <MonthSelector months={monthData} />
        <OverviewItem title="연동 계정 정보" value="@positio_manager" />
      </CustomTabContent>

      <CustomTabContent value="youtube" activeTab={activeTab}>
        <MonthSelector months={monthData} />
        <div className="p-10">
          <TableSet columns={columns} rows={rows} />
        </div>
      </CustomTabContent>

      <CustomTabContent value="instagram" activeTab={activeTab}>
        <MonthSelector months={monthData} />
      </CustomTabContent>

      <CustomTabContent value="tiktok" activeTab={activeTab}>
        <MonthSelector months={monthData} />
      </CustomTabContent>
    </section>
  );
}

export default AnalyticsSection;
