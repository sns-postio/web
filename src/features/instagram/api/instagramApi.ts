import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { INSTAGRAM_ENDPOINTS } from "./endpoint";
import type { InstagramPostsParams, InstagramPostsPayload } from "./types";

export const disconnectInstagram = async (connectId: string): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(INSTAGRAM_ENDPOINTS.DISCONNECT(connectId));
  return res.data;
};

export const fetchInstagramPosts = async ({
  connectId,
  page,
  limit,
}: InstagramPostsParams): Promise<ApiResponse<InstagramPostsPayload>> => {
  const res = await api.get<ApiResponse<InstagramPostsPayload>>(INSTAGRAM_ENDPOINTS.POSTS(connectId), {
    params: { page, limit },
  });
  return res.data;
};
