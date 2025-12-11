"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TiktokGuideCard() {
  const t = useTranslations("tiktok.page.guide");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
          <li>{t("line1")}</li>
          <li>{t("line2")}</li>
          <li>{t("line3")}</li>
        </ol>
      </CardContent>
    </Card>
  );
}
