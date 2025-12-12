"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import GNB from "@/components/layout/GNB";


export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="bg-background">
      <GNB />
      <section id="service" className="container mx-auto space-y-8 px-4 py-16 text-center">
        <h1 className="text-balance text-4xl font-bold md:text-6xl">
          {t("heroTitle")}
          <br />
          <span className="text-muted-foreground">{t("heroSubtitle")}</span>
        </h1>
        <p className="text-pretty mx-auto max-w-2xl text-xl text-muted-foreground">
          {t("heroDesc")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/auth/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              {t("start")}
            </Button>
          </Link>
          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              {t("login")}
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto mt-24 grid gap-8 px-4 md:grid-cols-3">
        {[
          { icon: Shield, title: t("features.secure") },
          { icon: Users, title: t("features.collab") },
          { icon: Zap, title: t("features.schedule") },
        ].map(({ icon: Icon, title }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>{title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
      <Footer/>
    </div>
  );
}
