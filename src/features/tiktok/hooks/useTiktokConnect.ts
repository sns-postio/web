"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { AuthService } from "@/features/auth/api/service";
import { toast } from "@/hooks/use-toast";

export function useTiktokConnect() {
  const t = useTranslations("tiktok.messages");

  return useMutation<void>({
    mutationFn: async () => {
      if (typeof window === "undefined") return;

      const token = AuthService.getAccessToken();
      if (!token) {
        throw new Error(t("redirectErrorDescription"));
      }

      const response = await fetch("/api/tiktok/redirect", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || t("redirectErrorDescription"));
      }

      const data = await response.json();
      if (!data.redirectUrl) {
        throw new Error(t("redirectErrorDescription"));
      }

      window.location.href = data.redirectUrl;
    },
    onError: (error) => {
      toast({
        title: t("redirectErrorTitle"),
        description: error instanceof Error ? error.message : t("redirectErrorDescription"),
      });
    },
  });
}
