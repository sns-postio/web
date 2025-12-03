"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchInstagramPosts } from "@/features/instagram/api/instagramApi";
import type { InstagramPostsPayload } from "@/features/instagram/api/types";

export const INSTAGRAM_POSTS_QUERY_KEY = (connectId: string, page?: number, limit?: number) => [
  "instagramPosts",
  connectId,
  page,
  limit,
];

export function useInstagramPosts(connectId: string, page = 1, limit = 10) {
  return useQuery<InstagramPostsPayload>({
    queryKey: INSTAGRAM_POSTS_QUERY_KEY(connectId, page, limit),
    queryFn: async () => {
      const response = await fetchInstagramPosts({ connectId, page, limit });
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch Instagram posts");
      }
      return response.data;
    },
    enabled: Boolean(connectId),
  });
}
