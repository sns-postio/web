"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface SocialCallbackContentProps {
  namespace: string;
  redirectPath: string;
  delayMs?: number;
}

export function SocialCallbackContent({ namespace, redirectPath, delayMs = 1500 }: SocialCallbackContentProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${locale}${redirectPath}`);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [locale, redirectPath, router, delayMs]);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-12 lg:py-16">
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
