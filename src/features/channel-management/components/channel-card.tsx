"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlatformMeta } from "./channel-data";
import type { UserConnection } from "@/features/channel-management/api/types";
import { PlaySquare } from "lucide-react";

type ChannelCardProps = {
  connection?: UserConnection;
  meta?: PlatformMeta;
  locale: string;
  onConnect?: () => void;
  connectLoading?: boolean;
};

export function ChannelCard({ connection, meta, locale, onConnect, connectLoading }: ChannelCardProps) {
  const t = useTranslations("channelManagement");
  const commonT = useTranslations("common");
  const isConnected = Boolean(connection);
  const statusLabel = isConnected ? t("status.connected") : t("status.disconnected");
  const displayName = meta?.name ?? connection?.platform ?? "Channel";
  const Icon = meta?.icon ?? PlaySquare;
  const accentClass = meta?.accentClass ?? "bg-muted text-foreground";
  const descriptionKey = meta?.descriptionKey;
  const description = descriptionKey ? t(`platformDescriptions.${descriptionKey}`) : statusLabel;
  const pageHref = meta?.pageHref ? `/${locale}${meta.pageHref}` : "#";
  // const analyticsHref = meta?.analyticsHref ? `/${locale}${meta.analyticsHref}` : "#";

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accentClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{displayName}</CardTitle>
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
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="mt-auto gap-3">
        {isConnected ? (
          meta?.pageHref ? (
            <Button asChild variant="outline" className="w-full">
              <Link href={pageHref}>{t("actions.openPage")}</Link>
            </Button>
          ) : null
        ) : (
          <Button className="w-full" onClick={onConnect} disabled={!onConnect || connectLoading}>
            {connectLoading ? commonT("loading") : t("actions.connect")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
