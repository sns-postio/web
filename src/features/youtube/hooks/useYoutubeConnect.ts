"use client";

import { useMutation } from "@tanstack/react-query";
import { requestYoutubeRedirectUrl } from "../api/connectionApi";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export function useYoutubeConnect() {
  const t = useTranslations("youtube.messages");

  return useMutation<string>({
    mutationFn: async () => {
      const response = await requestYoutubeRedirectUrl();
      if (!response.success || !response.data?.redirectUrl) {
        throw new Error(response.message || t("redirectErrorDescription"));
      }
      return response.data.redirectUrl;
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
