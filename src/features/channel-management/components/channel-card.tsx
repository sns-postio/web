"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChannelCardConfig, ChannelStatus } from "./channel-data";

type ChannelCardProps = {
  channel: ChannelCardConfig;
  status: ChannelStatus;
  locale: string;
};

export function ChannelCard({ channel, status, locale }: ChannelCardProps) {
  const t = useTranslations("channelManagement");
  const isConnected = status === "connected";
  const statusLabel = isConnected ? t("status.connected") : t("status.disconnected");
  const description = t(`platformDescriptions.${channel.descriptionKey}`);
  const pageHref = channel.pageHref ? `/${locale}${channel.pageHref}` : "#";
  const analyticsHref = channel.analyticsHref ? `/${locale}${channel.analyticsHref}` : "#";

  const accountIdValue = isConnected ? channel.handle ?? "-" : "-";
  const connectedAtValue = isConnected ? channel.connectedAt ?? "-" : "-";
  const lastSyncedValue = isConnected ? channel.lastSynced ?? "-" : "-";

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${channel.accentClass}`}>
            <channel.icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{channel.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{channel.handle ?? statusLabel}</p>
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
        <InfoRow label={t("labels.accountId")} value={accountIdValue} />
        <InfoRow label={t("labels.connectedAt")} value={connectedAtValue} />
        <InfoRow label={t("labels.lastSynced")} value={lastSyncedValue} />
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
