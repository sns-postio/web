"use client";

import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../api/authApi";
import { AuthService } from "../api/service";
import type { SignupRequest, LoginResponse, User } from "../api/types";
import type { ApiResponse } from "@/lib/types/api";

export function useSignup() {
  return useMutation<ApiResponse<LoginResponse>, Error, SignupRequest>({
    mutationFn: (data) => signupApi(data),
    onSuccess: (res, variables) => {
      if (res.success && res.data) {
        const { accessToken, accountType, planType } = res.data;
        const user: User = {
          email: variables.identifier,
          accountType,
          planType,
        };
        AuthService.setAccessToken(accessToken);
        AuthService.setUser(user);
      }
    },
  });
}
