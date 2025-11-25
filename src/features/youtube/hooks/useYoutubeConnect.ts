"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { AuthService } from "@/features/auth/api/service";
import { YOUTUBE_ENDPOINTS } from "../api/endpoint";

export function useYoutubeConnect() {
  const t = useTranslations("youtube.messages");
  const redirectEndpoint =
    (process.env.NEXT_PUBLIC_API_BASE ?? "") + YOUTUBE_ENDPOINTS.AUTH_REDIRECT;

  return useMutation<void>({
    mutationFn: async () => {
      if (typeof window === "undefined") return;

      if (!redirectEndpoint) {
        throw new Error(t("redirectErrorDescription"));
      }

      const token = AuthService.getAccessToken();
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(redirectEndpoint, {
        method: "GET",
        headers,
        credentials: "include",
        redirect: "manual",
      });

      const location = response.headers.get("Location");

      if (
        !location ||
        ![301, 302, 303, 307, 308].includes(response.status)
      ) {
        throw new Error(t("redirectErrorDescription"));
      }

      window.location.href = location;
    },
    onError: (error) => {
      toast({
        title: t("redirectErrorTitle"),
        description: error instanceof Error ? error.message : t("redirectErrorDescription"),
      });
    },
  });
}
