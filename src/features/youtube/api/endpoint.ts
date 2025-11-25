export const YOUTUBE_ENDPOINTS = {
  CONNECTIONS: "/v1/user/connections",
  AUTH_REDIRECT: "/v1/auth/youtube",
  POSTS: (connectId: string) => `/v1/user/youtube/posts/${connectId}`,
  DISCONNECT: (connectId: string) => `/v1/auth/youtube/${connectId}`,
  VIDEO_POST: (connectId: string) => `/v1/user/youtube/${connectId}/videos`,
};
