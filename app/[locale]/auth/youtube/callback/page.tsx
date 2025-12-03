"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function YoutubeCallbackPage() {
  return (
      <YoutubeCallbackContent />
  );
}

function YoutubeCallbackContent() {
  const t = useTranslations("youtube.callbackPage");
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${locale}/youtube`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router, locale]);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("successTitle")}</CardTitle>
          <CardDescription>{t("successDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("redirecting")}</span>
        </CardContent>
      </Card>
    </div>
  );
}
