export const TIKTOK_ENDPOINTS = {
  AUTH_REDIRECT: "/v1/auth/tiktok",
  DISCONNECT: (connectId: string | number) => `/v1/auth/tiktok/${connectId}`,
};
