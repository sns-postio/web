// 모든 API의 공통 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
  error?: string;
  statusCode?: number;
}
