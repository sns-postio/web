"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserConnections } from "../api/connectionApi";
import type { UserConnection } from "../api/types";

export const USER_CONNECTIONS_QUERY_KEY = ["userConnections"];

export function useUserConnections() {
  return useQuery<UserConnection[]>({
    queryKey: USER_CONNECTIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchUserConnections();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch connections");
      }
      return response.data ?? [];
    },
  });
}
