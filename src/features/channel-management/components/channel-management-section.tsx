"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelCard } from "./channel-card";
import { PLATFORM_META, SUPPORTED_PLATFORMS } from "./channel-data";
import { useUserConnections } from "../hooks/useUserConnections";
import { useYoutubeConnect } from "@/features/youtube/hooks/useYoutubeConnect";
import { useInstagramConnect } from "@/features/instagram/hooks/useInstagramConnect";

export function ChannelManagementSection() {
  const t = useTranslations("channelManagement");
  const commonT = useTranslations("common");
  const locale = useLocale();
  const { data: connections = [], isLoading, isError } = useUserConnections();
  const { mutate: startYoutubeConnect, isPending: isYoutubeConnecting } = useYoutubeConnect();
  const { mutate: startInstagramConnect, isPending: isInstagramConnecting } = useInstagramConnect();

  const mappedConnections = useMemo(() => {
    const connectionMap = new Map(connections.map((connection) => [connection.platform, connection]));
    return SUPPORTED_PLATFORMS.map((platform) => ({
      platform,
      connection: connectionMap.get(platform),
      meta: PLATFORM_META[platform],
    }));
  }, [connections]);

  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
        {isLoading && <p className="text-sm text-muted-foreground">{commonT("loading")}</p>}
        {isError && <p className="text-sm text-destructive">{commonT("error")}</p>}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mappedConnections.map(({ platform, connection, meta }) => {
          const handleConnect = () => {
            if (platform === "YOUTUBE") {
              startYoutubeConnect();
            } else if (platform === "INSTAGRAM") {
              startInstagramConnect();
            }
          };

          const isConnecting =
            platform === "YOUTUBE"
              ? isYoutubeConnecting
              : platform === "INSTAGRAM"
                ? isInstagramConnecting
                : false;

          return (
            <ChannelCard
              key={platform}
              connection={connection}
              meta={meta}
              locale={locale}
              onConnect={!connection ? handleConnect : undefined}
              connectLoading={!connection ? isConnecting : false}
            />
          );
        })}
      </div>
    </section>
  );
}
