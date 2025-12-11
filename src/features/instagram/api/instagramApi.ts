import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { INSTAGRAM_ENDPOINTS } from "./endpoint";
import type {
  InstagramFeedUploadRequest,
  InstagramPostsParams,
  InstagramPostsPayload,
  InstagramReelUploadRequest,
  InstagramStoryUploadRequest,
} from "./types";

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

export const publishInstagramFeed = async (
  payload: InstagramFeedUploadRequest
): Promise<ApiResponse<null>> => {
  const formData = new FormData();
  formData.append("connectId", payload.connectId);
  formData.append("caption", payload.caption);
  payload.files.forEach((file) => {
    formData.append("files", file);
  });
  const res = await api.post<ApiResponse<null>>(INSTAGRAM_ENDPOINTS.PUBLISH_FEED, formData);
  return res.data;
};

export const publishInstagramReel = async (
  payload: InstagramReelUploadRequest
): Promise<ApiResponse<null>> => {
  const formData = new FormData();
  formData.append("connectId", payload.connectId);
  formData.append("caption", payload.caption);
  formData.append("file", payload.file);
  const res = await api.post<ApiResponse<null>>(INSTAGRAM_ENDPOINTS.PUBLISH_REEL, formData);
  return res.data;
};

export const publishInstagramStory = async (
  payload: InstagramStoryUploadRequest
): Promise<ApiResponse<null>> => {
  const formData = new FormData();
  formData.append("connectId", payload.connectId);
  formData.append("file", payload.file);
  const res = await api.post<ApiResponse<null>>(INSTAGRAM_ENDPOINTS.PUBLISH_STORY, formData);
  return res.data;
};
