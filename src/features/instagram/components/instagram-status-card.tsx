"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Instagram, Loader2, RefreshCw } from "lucide-react";

interface InstagramStatusCardProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  manageHref?: string;
}

export function InstagramStatusCard({
  isLoading,
  isError,
  onRetry,
  isConnected,
  isConnecting,
  onConnect,
  manageHref,
}: InstagramStatusCardProps) {
  const t = useTranslations("instagram.page");

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("loading")}</span>
          </div>
        ) : (
          <StatusBlock isConnected={isConnected} />
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>{t("error.title")}</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{t("error.description")}</span>
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("cta.retry")}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={onConnect}
            disabled={isConnecting || isLoading}
            className="w-full sm:w-auto"
          >
            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isConnected ? t("cta.reconnect") : t("cta.connect")}
          </Button>
          {isConnected && manageHref && (
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href={manageHref}>{t("cta.manage")}</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBlock({ isConnected }: { isConnected: boolean }) {
  const t = useTranslations("instagram.page");

  return (
    <div className="flex items-start gap-4 rounded-lg border border-border/60 p-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          isConnected ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"
        }`}
      >
        <Instagram className="h-6 w-6" />
      </div>
      <div>
        <p className="text-lg font-semibold">
          {isConnected ? t("status.connected") : t("status.disconnected")}
        </p>
        <p className="text-sm text-muted-foreground">
          {isConnected ? t("statusDetail.connected") : t("statusDetail.disconnected")}
        </p>
      </div>
    </div>
  );
}
