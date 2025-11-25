"use client";

import { useMutation } from "@tanstack/react-query";

import type { ApiResponse } from "@/lib/types/api";
import { LoginRequest, LoginResponse, User } from "../api/types";
import { loginApi } from "../api/authApi";
import { AuthService } from "../api/service";

export function useLogin() {
  return useMutation<ApiResponse<LoginResponse>, Error, LoginRequest>({
    mutationFn: (data) => loginApi(data),
    onSuccess: (res, variables) => {
      if (res.success && res.data) {
        const { accessToken, accountType, planType } = res.data;
        const user: User = {
          accountType,
          planType,
        };
        AuthService.setAccessToken(accessToken);
        AuthService.setUser(user);
      }
    },
  });
}
