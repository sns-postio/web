// useYoutubeConnect.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { AuthService } from "@/features/auth/api/service";

export function useYoutubeConnect() {
  const t = useTranslations("youtube.messages");

  return useMutation<void>({
    mutationFn: async () => {
      if (typeof window === "undefined") return;

      const token = AuthService.getAccessToken();

      if (!token) {
        throw new Error(t("redirectErrorDescription"));
      }

      const response = await fetch("/api/youtube/redirect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: token,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t("redirectErrorDescription"));
      }

      const data = await response.json();

      if (!data.redirectUrl) {
        throw new Error(t("redirectErrorDescription"));
      }

      // 리다이렉트 실행
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
