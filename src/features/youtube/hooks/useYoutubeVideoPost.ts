"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadYoutubeVideo } from "../api/youtubeApi";
import type { YoutubeVideoPostRequest } from "../api/types";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export function useYoutubeVideoPost() {
  const t = useTranslations("youtube.uploadPage");

  return useMutation({
    mutationFn: async (payload: YoutubeVideoPostRequest) => {
      if (process.env.NODE_ENV !== "production") {
        // 업로드 직전에 파일 객체가 올바른지 확인
        console.log("Uploading YouTube file:", payload.file);
      }
      const res = await uploadYoutubeVideo(payload);
      if (!res.success) {
        throw new Error(res.message || t("uploadError"));
      }
      return res;
    },
    onSuccess: (res) => {
      toast({
        title: t("uploadSuccessTitle"),
        description: res.message || t("uploadSuccessDesc"),
      });
    },
    onError: (error) => {
      toast({
        title: t("uploadErrorTitle"),
        description: error.message || t("uploadError"),
      });
    },
  });
}
