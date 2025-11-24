"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { YOUTUBE_ENDPOINTS } from "../api/endpoint";

export function useYoutubeConnect() {
  const t = useTranslations("youtube.messages");
  const redirectEndpoint =
    (process.env.NEXT_PUBLIC_API_BASE ?? "") + YOUTUBE_ENDPOINTS.AUTH_REDIRECT;

  return useMutation<string>({
    mutationFn: async () => {
      if (!redirectEndpoint) {
        throw new Error(t("redirectErrorDescription"));
      }
      return redirectEndpoint;
    },
    onSuccess: (redirectUrl) => {
      if (typeof window === "undefined") return;
      window.location.href = redirectUrl;
    },
    onError: (error) => {
      toast({
        title: t("redirectErrorTitle"),
        description: error.message || t("redirectErrorDescription"),
      });
    },
  });
}
