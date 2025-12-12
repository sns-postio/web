"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { UserConnection } from "@/features/channel/integration/api/types";
import { useYoutubeDisconnect } from "../hooks/useYoutubeDisconnect";

interface YoutubeDisconnectCardProps {
  connections: UserConnection[];
}

export function YoutubeDisconnectCard({ connections }: YoutubeDisconnectCardProps) {
  const t = useTranslations("youtube.connectPage.disconnect");
  const { mutate: disconnect, isPending } = useYoutubeDisconnect();
  const [selectedId, setSelectedId] = useState(connections[0]?.id.toString() ?? "");

  useEffect(() => {
    if (!selectedId && connections[0]) {
      setSelectedId(connections[0].id.toString());
    }
    if (selectedId) {
      const exists = connections.some((c) => c.id.toString() === selectedId);
      if (!exists && connections[0]) {
        setSelectedId(connections[0].id.toString());
      }
    }
  }, [connections, selectedId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          {t("selectLabel")}
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-base"
          >
            {connections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                #{connection.id} · {connection.platform}
              </option>
            ))}
          </select>
        </label>

        <Button
          variant="destructive"
          disabled={!selectedId || isPending}
          onClick={() => selectedId && disconnect(selectedId)}
          className="w-full sm:w-auto"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("button")}
        </Button>
      </CardContent>
    </Card>
  );
}
