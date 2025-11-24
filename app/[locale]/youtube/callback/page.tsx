"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useYoutubeConnect } from "@/features/youtube/hooks/useYoutubeConnect";
import { useYoutubeCallback } from "@/features/youtube/hooks/useYoutubeCallback";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function YoutubeCallbackPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<CallbackFallback />}>
        <YoutubeCallbackContent />
      </Suspense>
    </DashboardLayout>
  );
}

function YoutubeCallbackContent() {
  const t = useTranslations("youtube.callbackPage");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const status = (searchParams.get("status") || "").toLowerCase();
  const message = searchParams.get("message");
  const code = searchParams.get("code");
  const { mutate: reconnect, isPending } = useYoutubeConnect();
  const {
    mutate: handleCallback,
    isPending: isCallbackPending,
    isSuccess: isCallbackSuccess,
  } = useYoutubeCallback();

  useEffect(() => {
    if (code && !isCallbackSuccess && !isCallbackPending) {
      handleCallback(code);
    }
  }, [code, handleCallback, isCallbackPending, isCallbackSuccess]);

  const isSuccess = status === "success" || status === "connected";
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;
  const iconColor = isSuccess ? "text-emerald-500" : "text-amber-500";

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>
            {isSuccess ? t("successDescription") : t("errorDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 rounded-md border border-border/60 p-4">
            <Icon className={`mt-1 h-6 w-6 ${iconColor}`} />
            <div>
              <p className="text-lg font-semibold">
                {isSuccess ? t("successTitle") : t("errorTitle")}
              </p>
              {!isSuccess && message && (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">{t("messageLabel")}:</span> {message}
                </p>
              )}
            </div>
          </div>

          {!code && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="w-full">
                <Link href={`/${locale}/youtube`}>{t("backButton")}</Link>
              </Button>
              <Button onClick={() => reconnect()} disabled={isPending} className="w-full">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("retryButton")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CallbackFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
