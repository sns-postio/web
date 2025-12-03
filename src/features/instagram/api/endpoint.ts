export const INSTAGRAM_ENDPOINTS = {
  AUTH_REDIRECT: "/v1/auth/instagram",
  DISCONNECT: (connectId: string) => `/v1/auth/instagram/${connectId}`,
  POSTS: (connectId: string) => `/v1/user/instagram/posts/${connectId}`,
};
