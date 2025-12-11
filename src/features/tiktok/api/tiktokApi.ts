import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { TIKTOK_ENDPOINTS } from "./endpoint";

export const disconnectTiktok = async (connectId: string | number): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(TIKTOK_ENDPOINTS.DISCONNECT(connectId));
  return res.data;
};
