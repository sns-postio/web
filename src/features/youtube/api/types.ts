// 연동된 플랫폼 항목
export interface UserConnection {
  id: number;
  platform: string;
}

export interface YoutubePost {
  id: number;
  videoId: string;
  title: string;
  description: string | null;
  publishedAt: string;
  durationSec: number;
  privacyStatus: string;
  viewCount: number;
  likeCount: number;
  url: string;
  isShort: number;
}

export interface YoutubePostsPayload {
  items: YoutubePost[];
  total: number;
  page: number;
  limit: number;
}

export interface YoutubePostsParams {
  connectId: string;
  page?: number;
  limit?: number;
}

export interface YoutubeVideoPostRequest {
  connectId: string;
  title: string;
  description?: string | null;
  privacyStatus: "public" | "private";
  file: File;
}

export interface YoutubeRedirectInfo {
  redirectUrl: string;
}

export interface YoutubeCallbackRequest {
  code: string;
}
