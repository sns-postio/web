"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUserConnections } from "@/features/integration/hooks/useUserConnections";
import { InstagramStatusCard } from "@/features/instagram/components/instagram-status-card";
import { InstagramPostsCard } from "@/features/instagram/components/instagram-posts-card";
import { InstagramDisconnectCard } from "@/features/instagram/components/instagram-disconnect-card";
import { InstagramGuideCard } from "@/features/instagram/components/instagram-guide-card";
import { useInstagramConnect } from "@/features/instagram/hooks/useInstagramConnect";
import { InstagramUploadCard } from "@/features/instagram/components/instagram-upload-card";

export function InstagramPageContent() {
  const t = useTranslations("instagram.page");
  const { data: connections = [], isLoading, isError, refetch } = useUserConnections();
  const { mutate: startInstagramConnect, isPending } = useInstagramConnect();

  const instagramConnections = useMemo(
    () => connections.filter((connection) => connection.platform === "INSTAGRAM"),
    [connections]
  );
  const isConnected = instagramConnections.length > 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 lg:py-16">
      <InstagramStatusCard
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        isConnected={isConnected}
        isConnecting={isPending}
        onConnect={() => startInstagramConnect()}
      />

      {isConnected && (
        <>
          <InstagramUploadCard connections={instagramConnections} />
          <InstagramPostsCard connections={instagramConnections} />
          <InstagramDisconnectCard connections={instagramConnections} />
        </>
      )}

      <InstagramGuideCard />
    </div>
  );
}
