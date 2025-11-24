"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export function YoutubeGuideCard() {
  const t = useTranslations("youtube.connectPage");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {t("guide.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
          <li>{t("guide.line1")}</li>
          <li>{t("guide.line2")}</li>
          <li>{t("guide.line3")}</li>
        </ol>
      </CardContent>
    </Card>
  );
}
