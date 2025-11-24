"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { handleYoutubeCallback } from "../api/connectionApi";
import { USER_CONNECTIONS_QUERY_KEY } from "./useUserConnections";

export function useYoutubeCallback() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("youtube.messages");

  return useMutation({
    mutationFn: async (code: string) => {
      const response = await handleYoutubeCallback({ code });
      if (!response.success) {
        throw new Error(response.message || t("callbackErrorDescription"));
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CONNECTIONS_QUERY_KEY });
      toast({
        title: t("connectSuccessTitle"),
        description: t("connectSuccessDescription"),
      });
      router.push("/settings?youtube_connected=true");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("callbackErrorTitle"),
        description: error.message || t("callbackErrorDescription"),
      });
      router.push("/settings?youtube_error=connection_failed");
    },
  });
}
