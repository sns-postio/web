export const INSTAGRAM_ENDPOINTS = {
  AUTH_REDIRECT: "/v1/auth/instagram",
  DISCONNECT: (connectId: string) => `/v1/auth/instagram/${connectId}`,
  POSTS: (connectId: string) => `/v1/user/instagram/posts/${connectId}`,
  PUBLISH_FEED: "/v1/user/instagram/posts/publish-feed",
  PUBLISH_REEL: "/v1/user/instagram/posts/publish-reel",
  PUBLISH_STORY: "/v1/user/instagram/posts/publish-story",
};
