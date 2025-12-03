"use client";

import { useYoutubeConnect } from "@/features/youtube/hooks/useYoutubeConnect";
import { useUserConnections } from "@/features/youtube/hooks/useUserConnections";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { YoutubeStatusCard } from "@/features/youtube/components/youtube-status-card";
import { YoutubePostsCard } from "@/features/youtube/components/youtube-posts-card";
import { YoutubeDisconnectCard } from "@/features/youtube/components/youtube-disconnect-card";
import { YoutubeGuideCard } from "@/features/youtube/components/youtube-guide-card";

export default function YoutubeIntegrationPage() {
  return (
      <YoutubeIntegrationContent />
  );
}

function YoutubeIntegrationContent() {
  const locale = useLocale();
  const { data: connections = [], isLoading, isError, refetch } = useUserConnections();
  const { mutate: startYoutubeConnect, isPending } = useYoutubeConnect();

  const youtubeConnections = useMemo(
    () => connections.filter((connection) => connection.platform === "YOUTUBE"),
    [connections]
  );
  const isConnected = youtubeConnections.length > 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <YoutubeStatusCard
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        isConnected={isConnected}
        isConnecting={isPending}
        onConnect={() => startYoutubeConnect()}
        manageHref={isConnected ? `/${locale}/youtube/videos` : undefined}
      />
      {isConnected && (
        <>
          <YoutubePostsCard connections={youtubeConnections} />
          <YoutubeDisconnectCard connections={youtubeConnections} />
        </>
      )}
      <YoutubeGuideCard />
    </div>
  );
}
