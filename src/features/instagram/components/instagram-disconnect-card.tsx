"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { UserConnection } from "@/features/channel/integration/api/types";
import { useInstagramDisconnect } from "../hooks/useInstagramDisconnect";

interface InstagramDisconnectCardProps {
  connections: UserConnection[];
}

export function InstagramDisconnectCard({ connections }: InstagramDisconnectCardProps) {
  const t = useTranslations("instagram.page.disconnect");
  const { mutate: disconnect, isPending } = useInstagramDisconnect();
  const [selectedId, setSelectedId] = useState(connections[0]?.id.toString() ?? "");

  useEffect(() => {
    if (!selectedId && connections[0]) {
      setSelectedId(connections[0].id.toString());
      return;
    }

    if (selectedId) {
      const exists = connections.some((connection) => connection.id.toString() === selectedId);
      if (!exists) {
        setSelectedId(connections[0]?.id.toString() ?? "");
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
            onChange={(event) => setSelectedId(event.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-base"
          >
            {connections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                #{connection.id}
              </option>
            ))}
          </select>
        </label>

        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          disabled={!selectedId || isPending}
          onClick={() => selectedId && disconnect(selectedId)}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("button")}
        </Button>
      </CardContent>
    </Card>
  );
}
