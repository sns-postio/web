import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { YOUTUBE_ENDPOINTS } from "./endpoint";
import {
  type UserConnection,
  type YoutubePostsPayload,
  type YoutubePostsParams,
  type YoutubeVideoPostRequest,
  type YoutubeCallbackRequest,
  urlbody,
} from "./types";

/**
 * 연동된 플랫폼 목록 조회
 */
export const fetchUserConnections = async (): Promise<ApiResponse<UserConnection[]>> => {
  const res = await api.get<ApiResponse<UserConnection[]>>(YOUTUBE_ENDPOINTS.CONNECTIONS);
  return res.data;
};

/**
 * 유튜브 연동 시작 (인증 URL 요청)
 * GET /v1/auth/youtube 엔드포인트에 요청하여 OAuth 리다이렉션 URL을 받습니다.
 */
export const startYoutubeAuth = async (): Promise<ApiResponse<urlbody>> => {
  const res = await api.get<ApiResponse<urlbody>>(YOUTUBE_ENDPOINTS.AUTH_REDIRECT);
  return res.data;
};

/**
 * 유튜브 게시글 목록 조회
 */
export const fetchYoutubePosts = async ({
  connectId,
  page,
  limit,
}: YoutubePostsParams): Promise<ApiResponse<YoutubePostsPayload>> => {
  const res = await api.get<ApiResponse<YoutubePostsPayload>>(
    YOUTUBE_ENDPOINTS.POSTS(connectId),
    {
      params: {
        page,
        limit,
      },
    }
  );
  return res.data;
};

/**
 * 유튜브 연동 끊기
 */
export const disconnectYoutube = async (connectId: string): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(YOUTUBE_ENDPOINTS.DISCONNECT(connectId));
  return res.data;
};

/**
 * 유튜브 게시물 업로드
 */
export const uploadYoutubeVideo = async (
  payload: YoutubeVideoPostRequest
): Promise<ApiResponse<null>> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.description) formData.append("description", payload.description);
  formData.append("privacyStatus", payload.privacyStatus);
  formData.append("file", payload.file);

  const res = await api.post<ApiResponse<null>>(
    YOUTUBE_ENDPOINTS.VIDEO_POST(payload.connectId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
