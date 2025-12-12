"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { disconnectTiktok } from "@/features/tiktok/api/tiktokApi";
import { USER_CONNECTIONS_QUERY_KEY } from "@/features/channel/integration/hooks/useUserConnections";

export function useTiktokDisconnect() {
  const t = useTranslations("tiktok.messages");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectId: string | number) => {
      const response = await disconnectTiktok(connectId);
      if (!response.success) {
        throw new Error(response.message || t("disconnectErrorDescription"));
      }
      return response;
    },
    onSuccess: (response) => {
      toast({
        title: t("disconnectSuccessTitle"),
        description: response.message || t("disconnectSuccessDescription"),
      });
      queryClient.invalidateQueries({ queryKey: USER_CONNECTIONS_QUERY_KEY });
    },
    onError: (error) => {
      toast({
        title: t("disconnectErrorTitle"),
        description: error instanceof Error ? error.message : t("disconnectErrorDescription"),
        variant: "destructive",
      });
    },
  });
}
