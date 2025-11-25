"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchYoutubePosts } from "../api/youtubeApi";
import type { YoutubePostsParams } from "../api/types";

export function useYoutubePosts(params: YoutubePostsParams, enabled = true) {
  return useQuery({
    queryKey: ["youtubePosts", params],
    queryFn: async () => {
      const response = await fetchYoutubePosts(params);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load YouTube posts");
      }
      return response.data;
    },
    enabled: enabled && Boolean(params.connectId),
  });
}
