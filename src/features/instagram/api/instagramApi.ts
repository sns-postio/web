import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { INSTAGRAM_ENDPOINTS } from "./endpoint";

export const disconnectInstagram = async (connectId: string): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(INSTAGRAM_ENDPOINTS.DISCONNECT(connectId));
  return res.data;
};
