"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("home.footer");
  const locale = useLocale();

  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <footer className="border-t border-border mt-24 text-sm">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>{t("copy")}</p>
        <p>{t("info")}</p>
        <div className="flex justify-center gap-2">
          <Link href={withLocale("/agreement/privacy-policy")}>{t("policy")}</Link>
          <span>·</span>
          <Link href={withLocale("/agreement/service")}>{t("terms")}</Link>
          <span>·</span>
          <Link href={withLocale("/agreement/dispute-resolution")}>{t("dispute")}</Link>
        </div>
      </div>
    </footer>
  );
}
