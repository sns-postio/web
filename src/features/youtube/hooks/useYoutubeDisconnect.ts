"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disconnectYoutube } from "../api/youtubeApi";
import { USER_CONNECTIONS_QUERY_KEY } from "@/features/channel-management/hooks/useUserConnections";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export function useYoutubeDisconnect() {
  const queryClient = useQueryClient();
  const t = useTranslations("youtube.messages");

  return useMutation({
    mutationFn: async (connectId: string) => {
      const res = await disconnectYoutube(connectId);
      if (!res.success) {
        throw new Error(res.message || "Failed to disconnect");
      }
      return res;
    },
    onSuccess: (res) => {
      toast({
        title: t("disconnectSuccessTitle"),
        description: res.message || t("disconnectSuccessDesc"),
      });
      queryClient.invalidateQueries({ queryKey: USER_CONNECTIONS_QUERY_KEY });
    },
    onError: (error) => {
      toast({
        title: t("disconnectErrorTitle"),
        description: error.message || t("disconnectErrorDesc"),
      });
    },
  });
}
