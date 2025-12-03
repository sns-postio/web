"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserConnections } from "@/features/channel-management/hooks/useUserConnections";
import { InstagramPostsCard } from "@/features/instagram/components/instagram-posts-card";
import { useInstagramConnect } from "@/features/instagram/hooks/useInstagramConnect";

export function InstagramPageContent() {
  const t = useTranslations("instagram.page");
  const locale = useLocale();
  const { data: connections = [], isLoading, isError, refetch } = useUserConnections();
  const { mutate: startInstagramConnect, isPending } = useInstagramConnect();

  const instagramConnections = useMemo(
    () => connections.filter((connection) => connection.platform === "INSTAGRAM"),
    [connections]
  );
  const [selectedConnectId, setSelectedConnectId] = useState<string>(
    instagramConnections.length > 0 ? instagramConnections[0].id.toString() : ""
  );
  const isConnected = instagramConnections.length > 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 lg:py-16">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription className="text-muted-foreground">{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isError && <p className="text-sm text-destructive">{t("loadError")}</p>}
          <Select value={selectedConnectId} onValueChange={setSelectedConnectId} disabled={!isConnected || isPending}>
            <SelectTrigger className="w-full sm:w-80">
              <SelectValue placeholder={t("selectPlaceholder")}>
                {selectedConnectId ? `#${selectedConnectId}` : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {instagramConnections.map((connection) => (
                <SelectItem key={connection.id} value={connection.id.toString()}>
                  #{connection.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {!isConnected && (
            <Button onClick={() => startInstagramConnect()} disabled={isPending}>
              {isPending ? t("connecting") : t("connectButton")}
            </Button>
          )}

          {isConnected && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t("connectedStatus", { count: instagramConnections.length })}</span>
              <Button variant="ghost" size="sm" onClick={() => refetch()}>
                {t("refresh")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedConnectId ? (
        <InstagramPostsCard connectId={selectedConnectId} />
      ) : (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      )}
    </div>
  );
}
