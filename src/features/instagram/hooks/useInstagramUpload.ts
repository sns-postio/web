"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import {
  publishInstagramFeed,
  publishInstagramReel,
  publishInstagramStory,
} from "@/features/instagram/api/instagramApi";
import type {
  InstagramFeedUploadRequest,
  InstagramReelUploadRequest,
  InstagramStoryUploadRequest,
} from "@/features/instagram/api/types";
import type { ApiResponse } from "@/lib/types/api";

interface UploadHookParams<TPayload> {
  typeKey: "feed" | "reel" | "story";
  requestFn: (payload: TPayload) => Promise<ApiResponse<null>>;
}

function useInstagramUploadMutation<TPayload>({
  typeKey,
  requestFn,
}: UploadHookParams<TPayload>) {
  const messageT = useTranslations("instagram.messages");
  const typeT = useTranslations("instagram.uploadCard.tabs");
  const targetLabel = typeT(typeKey);

  return useMutation<ApiResponse<null>, Error, TPayload>({
    mutationFn: async (payload: TPayload) => {
      const response = await requestFn(payload);
      if (!response.success) {
        throw new Error(response.message || messageT("uploadErrorDescription", { target: targetLabel }));
      }
      return response;
    },
    onSuccess: (response) => {
      toast({
        title: messageT("uploadSuccessTitle", { target: targetLabel }),
        description: response.message || messageT("uploadSuccessDescription", { target: targetLabel }),
      });
    },
    onError: (error) => {
      toast({
        title: messageT("uploadErrorTitle", { target: targetLabel }),
        description: error.message || messageT("uploadErrorDescription", { target: targetLabel }),
        variant: "destructive",
      });
    },
  });
}

export function useInstagramFeedUpload() {
  return useInstagramUploadMutation<InstagramFeedUploadRequest>({
    typeKey: "feed",
    requestFn: publishInstagramFeed,
  });
}

export function useInstagramReelUpload() {
  return useInstagramUploadMutation<InstagramReelUploadRequest>({
    typeKey: "reel",
    requestFn: publishInstagramReel,
  });
}

export function useInstagramStoryUpload() {
  return useInstagramUploadMutation<InstagramStoryUploadRequest>({
    typeKey: "story",
    requestFn: publishInstagramStory,
  });
}
