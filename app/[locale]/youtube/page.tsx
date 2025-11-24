"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useYoutubeConnect } from "@/features/youtube/hooks/useYoutubeConnect";
import { useUserConnections } from "@/features/youtube/hooks/useUserConnections";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useYoutubePosts } from "@/features/youtube/hooks/useYoutubePosts";
import { YoutubeStatusCard } from "@/features/youtube/components/youtube-status-card";
import { YoutubePostsCard } from "@/features/youtube/components/youtube-posts-card";
import { YoutubeDisconnectCard } from "@/features/youtube/components/youtube-disconnect-card";
import { YoutubeGuideCard } from "@/features/youtube/components/youtube-guide-card";

export default function YoutubeIntegrationPage() {
  return (
    <DashboardLayout>
      <YoutubeIntegrationContent />
    </DashboardLayout>
  );
}

function YoutubeIntegrationContent() {
  const locale = useLocale();
  const { data: connections = [], isLoading, isError, refetch } = useUserConnections();
  const { mutate: startYoutubeConnect, isPending } = useYoutubeConnect();
  const [activeConnectId, setActiveConnectId] = useState("");
  const [postsPage, setPostsPage] = useState(1);
  const POSTS_LIMIT = 5;

  const youtubeConnections = useMemo(
    () => connections.filter((connection) => connection.platform === "YOUTUBE"),
    [connections]
  );
  const isConnected = youtubeConnections.length > 0;

  useEffect(() => {
    if (youtubeConnections.length === 0) {
      setActiveConnectId("");
      return;
    }
    setActiveConnectId((prev) => {
      const exists = youtubeConnections.some((conn) => conn.id.toString() === prev);
      return exists && prev ? prev : youtubeConnections[0].id.toString();
    });
  }, [youtubeConnections]);

  useEffect(() => {
    setPostsPage(1);
  }, [activeConnectId]);

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
  } = useYoutubePosts(
    { connectId: activeConnectId, page: postsPage, limit: POSTS_LIMIT },
    Boolean(activeConnectId)
  );

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
        <YoutubePostsCard
          connections={youtubeConnections}
          activeConnectId={activeConnectId}
          onConnectChange={setActiveConnectId}
          postsPage={postsPage}
          onPageChange={setPostsPage}
          postsData={postsData}
          postsLoading={postsLoading}
          postsError={postsError}
          onRetry={refetchPosts}
          pageSize={POSTS_LIMIT}
        />
      )}
      {isConnected && <YoutubeDisconnectCard connections={youtubeConnections} />}
      <YoutubeGuideCard />
    </div>
  );
}
