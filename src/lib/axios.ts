import axios, { AxiosInstance } from "axios";
import { AuthService } from "../features/auth/api/service";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

// 요청 인터셉터 — 모든 요청에 accessToken 자동 포함
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.headers) {
      if (isFormData(config.data)) {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
      } else if (isPlainObject(config.data)) {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function isFormData(data: unknown): data is FormData {
  if (!data) return false;
  if (typeof FormData !== "undefined" && data instanceof FormData) return true;
  return (
    typeof data === "object" &&
    typeof (data as FormData).append === "function" &&
    typeof (data as FormData).get === "function"
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

// 응답 인터셉터 — 401 시 자동 재발급
let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 → 401 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            } else {
              resolve(Promise.reject(error));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await AuthService.refreshAccessToken();

        if (result.success) {
          const newToken = AuthService.getAccessToken();
          onRefreshed(newToken);
          isRefreshing = false;

          // accessToken 교체 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          AuthService.autoLogout();
          onRefreshed(null);
          isRefreshing = false;
          return Promise.reject(error);
        }
      } catch {
        AuthService.autoLogout();
        onRefreshed(null);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
