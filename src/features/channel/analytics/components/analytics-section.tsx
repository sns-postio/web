"use client";

import type React from "react";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelTabs, CustomTabContent, type TabItem } from "./channel-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthSelector, MonthSelectorContent } from "./MonthSelector";
import { OverviewItem } from "./OverviewItem";
import { TableSet } from "./TableSet";
import { AnalyticsCard } from "./AnalyticsCard";
import { GoLinkButton } from "./GoLinkButton";
import { NoConnectionError, NoDataError, TemporaryError } from "./ErrorState";
import { AlertEmptyState } from "./AlertEmptyState";
import { PerformanceOverviewCard } from "./PerformanceOverviewCard";

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
  { year: 2025, month: 10 },
  { year: 2025, month: 11 },
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

export const hashtagColumns = ["해시태그", "도달 수", "노출 수", "참여율"];

export const hashtagRows: (string | number)[][] = [
  ["#어쩌구저쩌구", 85420, 85420, "8.9%"],
  ["#어쩌구저쩌구", 85420, 85420, "8.9%"],
  ["#어쩌구저쩌구", 85420, 85420, "8.9%"],
  ["#어쩌구저쩌구", 85420, 85420, "8.9%"],
  ["#어쩌구저쩌구", 85420, 85420, "8.9%"],
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
      { id: "facebook", label: tabTranslations("facebook") },
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
    <section className="mx-auto flex w-full px-6 md:px-35 pb-10 flex-col">
      <div className="overflow-x-auto scroll-hide">
        <ChannelTabs tabs={tabs} defaultTab={tabs[0]?.id} onTabChange={setActiveTab} />
      </div>

      <CustomTabContent value="overview" activeTab={activeTab}>
        <OverviewTab />
      </CustomTabContent>

      <CustomTabContent value="youtube" activeTab={activeTab}>
        <YoutubeTab />
      </CustomTabContent>

      <CustomTabContent value="facebook" activeTab={activeTab}>
        <FacebookTab />
      </CustomTabContent>

      <CustomTabContent value="instagram" activeTab={activeTab}>
        <InstagramTab />
      </CustomTabContent>

      <CustomTabContent value="tiktok" activeTab={activeTab}>
        <TiktokTab />
      </CustomTabContent>
    </section>
  );
}

export default AnalyticsSection;

function MonthSelectorBlock({ children }: { children?: React.ReactNode }) {
  return <MonthSelector months={monthData}>{children}</MonthSelector>;
}

function SharedAccountInfoCard() {
  return (
    <AnalyticsCard title="연동 계정 정보">
      <div className="flex flex-row gap-4">
        <OverviewItem title="연동 계정 정보" value="@positio_manager" />
        <OverviewItem title="연동일" value="2025.10.01" />
        <OverviewItem title="마지막 업데이트" value="2025.11.26 12:20" />
        <OverviewItem title="계정 페이지" value={<GoLinkButton href="" label="바로가기" />} />
      </div>
    </AnalyticsCard>
  );
}

function PerformanceTableCard({
  title = "성과 분석",
  columnsData = columns,
  rowsData = rows,
}: {
  title?: string;
  columnsData?: string[];
  rowsData?: (string | number)[][];
}) {
  return (
    <AnalyticsCard title={title}>
      <TableSet columns={columnsData} rows={rowsData} />
    </AnalyticsCard>
  );
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      <MonthSelectorBlock />
      <AlertEmptyState />
      <AnalyticsCard title="전체 성과 분석">
        <div className="flex flex-row gap-4">
          <PerformanceOverviewCard label="게시물 수" value="85,420" change={12.5} />
          <PerformanceOverviewCard label="총 도달 수" value="0" change={-20} />
          <PerformanceOverviewCard label="총 노출 수"/>
          <PerformanceOverviewCard label="총 참여 수" value="134,393" change={-20} />
          <PerformanceOverviewCard label="평균 참여율" value="7.2%" change={12.5} />
        </div>
      </AnalyticsCard>
      <AnalyticsCard title="시간대 별 참여율 비교" />
    </div>
  );
}

function YoutubeTab() {
  return (
    <div className="flex flex-col gap-6">
      <MonthSelectorBlock>
        <MonthSelectorContent value={monthData[0]}>
          <div className="flex flex-col gap-6">
            <SharedAccountInfoCard />
            <PerformanceTableCard />
          </div>
        </MonthSelectorContent>
        <MonthSelectorContent value={monthData[1]}>
          <TemporaryError />
        </MonthSelectorContent>
        <MonthSelectorContent value={monthData[2]}>
          <NoDataError />
        </MonthSelectorContent>
      </MonthSelectorBlock>
    </div>
  );
}

function FacebookTab() {
  return (
    <div className="flex flex-col gap-6">
      <MonthSelectorBlock />
      <NoConnectionError />
    </div>
  );
}

function InstagramTab() {
  return (
    <div className="flex flex-col gap-6">
      <MonthSelectorBlock />
      <SharedAccountInfoCard />
      <PerformanceTableCard />
      <AnalyticsCard title="팔로워 분석" />
      <AnalyticsCard title="시간대 별 참여율 비교" />
      <AnalyticsCard title="콘텐츠 반응도" />
      <PerformanceTableCard columnsData={hashtagColumns} rowsData={hashtagRows} />
    </div>
  );
}

function TiktokTab() {
  return (
    <div className="flex flex-col gap-6">
      <MonthSelectorBlock />
      <SharedAccountInfoCard />
      <PerformanceTableCard />
      <AnalyticsCard title="팔로워 분석" />
      <AnalyticsCard title="시간대 별 참여율 비교" />
      <AnalyticsCard title="콘텐츠 반응도" />
    </div>
  );
}
