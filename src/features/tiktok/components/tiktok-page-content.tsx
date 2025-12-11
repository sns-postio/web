"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUserConnections } from "@/features/channel-management/hooks/useUserConnections";
import { useTiktokConnect } from "@/features/tiktok/hooks/useTiktokConnect";
import { TiktokStatusCard } from "./tiktok-status-card";
import { TiktokDisconnectCard } from "./tiktok-disconnect-card";

export function TiktokPageContent() {
  const t = useTranslations("tiktok.page");
  const { data: connections = [], isLoading, isError, refetch } = useUserConnections();
  const { mutate: startTiktokConnect, isPending } = useTiktokConnect();

  const tiktokConnections = useMemo(
    () => connections.filter((connection) => connection.platform === "TIKTOK"),
    [connections]
  );
  const isConnected = tiktokConnections.length > 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 lg:py-16">
      <TiktokStatusCard
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        isConnected={isConnected}
        isConnecting={isPending}
        onConnect={() => startTiktokConnect()}
      />

      {isConnected && <TiktokDisconnectCard connections={tiktokConnections} />}

      {!isConnected && !isLoading && (
        <p className="rounded-lg border border-dashed px-4 py-6 text-sm text-muted-foreground">
          {t("statusDetail.disconnected")}
        </p>
      )}
    </div>
  );
}
