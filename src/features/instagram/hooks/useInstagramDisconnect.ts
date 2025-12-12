"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disconnectInstagram } from "@/features/instagram/api/instagramApi";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { USER_CONNECTIONS_QUERY_KEY } from "@/features/integration/hooks/useUserConnections";

export function useInstagramDisconnect() {
  const queryClient = useQueryClient();
  const t = useTranslations("instagram.messages");

  return useMutation({
    mutationFn: async (connectId: string) => {
      const res = await disconnectInstagram(connectId);
      if (!res.success) {
        throw new Error(res.message || t("disconnectErrorDescription"));
      }
      return res;
    },
    onSuccess: (res) => {
      toast({
        title: t("disconnectSuccessTitle"),
        description: res.message || t("disconnectSuccessDescription"),
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
