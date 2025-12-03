import api from "@/lib/axios";
import type { ApiResponse } from "@/lib/types/api";
import { CHANNEL_MANAGEMENT_ENDPOINTS } from "./endpoint";
import type { UserConnection } from "./types";

export const fetchUserConnections = async (): Promise<ApiResponse<UserConnection[]>> => {
  const res = await api.get<ApiResponse<UserConnection[]>>(CHANNEL_MANAGEMENT_ENDPOINTS.CONNECTIONS);
  return res.data;
};
