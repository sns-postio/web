"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelCard } from "./channel-card";
import { channelCards, ChannelStatus } from "./channel-data";
import { useUserConnections } from "../hooks/useUserConnections";

export function ChannelManagementSection() {
  const t = useTranslations("channelManagement");
  const commonT = useTranslations("common");
  const locale = useLocale();
  const { data: connections = [], isLoading, isError } = useUserConnections();

  const cardsWithStatus = useMemo(() => {
    if (isLoading || isError) {
      return channelCards.map((card) => ({
        card,
        status: card.defaultStatus ?? "disconnected",
      }));
    }

    const connectedPlatforms = new Set(connections.map((connection) => connection.platform));

    return channelCards.map((card) => ({
      card,
      status: connectedPlatforms.has(card.platformKey) ? ("connected" as ChannelStatus) : "disconnected",
    }));
  }, [connections, isError, isLoading]);

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
        {isLoading && <p className="text-sm text-muted-foreground">{commonT("loading")}</p>}
        {isError && <p className="text-sm text-destructive">{commonT("error")}</p>}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cardsWithStatus.map(({ card, status }) => (
          <ChannelCard key={card.id} channel={card} status={status} locale={locale} />
        ))}
      </div>
    </section>
  );
}
