"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { startYoutubeAuth } from "../api/youtubeApi";

export function useYoutubeConnect() {
  const t = useTranslations("youtube.messages");

  return useMutation<void>({
    mutationFn: async () => {
      // 1. startYoutubeAuth API를 호출하여 리다이렉션 URL을 서버로부터 받아옵니다.
      const response = await startYoutubeAuth();

      // 2. response.data가 null이 아닌지 확인 후 url을 가져옵니다.
      if (!response.data) {
        throw new Error(t("redirectErrorDescription"));
      }

      const { url } = response.data;

      if (!url) {
        // 서버에서 URL이 누락되었을 경우 에러 처리
        throw new Error(t("redirectErrorDescription"));
      }

      // 3. 받아온 URL로 브라우저를 이동시킵니다.
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
    },
    onError: (error) => {
      // API 호출 실패 또는 URL 누락 에러 처리
      toast({
        title: t("redirectErrorTitle"),
        description: error instanceof Error ? error.message : t("redirectErrorDescription"),
        variant: "destructive",
      });
    },
  });
}
