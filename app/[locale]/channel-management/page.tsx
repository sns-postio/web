// app/[locale]/channel-management
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, LucideIcon, Music3, PlaySquare } from "lucide-react";

type ChannelStatus = "connected" | "disconnected";

type ChannelCard = {
  id: string;
  name: string;
  status: ChannelStatus;
  handle?: string;
  connectedAt?: string;
  lastSynced?: string;
  descriptionKey: string;
  icon: LucideIcon;
  accentClass: string;
  pageHref?: string;
  analyticsHref?: string;
};

const channels: ChannelCard[] = [
  {
    id: "youtube",
    name: "YouTube",
    status: "connected",
    handle: "@PostioChannel",
    connectedAt: "2025.10.01 14:30",
    lastSynced: "2025.11.26 12:20",
    descriptionKey: "youtube",
    icon: PlaySquare,
    accentClass: "bg-red-500/10 text-red-600",
    pageHref: "/youtube",
    analyticsHref: "/youtube/videos",
  },
  {
    id: "facebook",
    name: "Facebook",
    status: "connected",
    handle: "Postio Official",
    connectedAt: "2025.10.10 09:15",
    lastSynced: "2025.11.26 13:45",
    descriptionKey: "facebook",
    icon: Facebook,
    accentClass: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "instagram",
    name: "Instagram",
    status: "connected",
    handle: "@postio_official",
    connectedAt: "2025.10.15 16:20",
    lastSynced: "2025.11.26 14:30",
    descriptionKey: "instagram",
    icon: Instagram,
    accentClass: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    status: "disconnected",
    descriptionKey: "tiktok",
    icon: Music3,
    accentClass: "bg-muted text-foreground",
  },
];

export default function ChannelManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <ChannelManagementContent />
    </div>
  );
}

function ChannelManagementContent() {
  const t = useTranslations("channelManagement");
  const locale = useLocale();

  return (
    <main className="container mx-auto px-4 py-12 lg:py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
          <ChannelCardItem key={channel.id} channel={channel} locale={locale} />
        ))}
      </div>
    </main>
  );
}

function ChannelCardItem({ channel, locale }: { channel: ChannelCard; locale: string }) {
  const t = useTranslations("channelManagement");
  const isConnected = channel.status === "connected";
  const statusLabel = isConnected ? t("status.connected") : t("status.disconnected");
  const description = t(`platformDescriptions.${channel.descriptionKey}`);

  const pageHref = channel.pageHref ? `/${locale}${channel.pageHref}` : "#";
  const analyticsHref = channel.analyticsHref ? `/${locale}${channel.analyticsHref}` : "#";

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${channel.accentClass}`}>
            <channel.icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{channel.name}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {channel.handle ?? statusLabel}
            </p>
          </div>
        </div>
        <Badge
          className={
            isConnected
              ? "border-emerald-200 bg-emerald-100 text-emerald-700"
              : "border-dashed bg-muted text-muted-foreground"
          }
        >
          {statusLabel}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <InfoRow label={t("labels.accountId")} value={channel.handle ?? "-"} />
        <InfoRow label={t("labels.connectedAt")} value={channel.connectedAt ?? "-"} />
        <InfoRow label={t("labels.lastSynced")} value={channel.lastSynced ?? "-"} />
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="mt-auto gap-3">
        {isConnected ? (
          <>
            <Button asChild variant="outline" className="flex-1">
              <Link href={pageHref}>{t("actions.openPage")}</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href={analyticsHref}>{t("actions.viewAnalytics")}</Link>
            </Button>
          </>
        ) : (
          <Button className="w-full">{t("actions.connect")}</Button>
        )}
      </CardFooter>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
