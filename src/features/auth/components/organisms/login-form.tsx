"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { InputField } from "../atoms/input-field";
import { PasswordField } from "../atoms/password-field";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { identifier: email, password },
      {
        onSuccess: (res) => {
          if (res.success) router.push(`/${locale}/youtube`);
          else setError(res.message);
        },
        onError: () => setError(t("networkError")),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        type="email"
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        id="password"
        label={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        <Loader2 className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : "hidden"}`} />
        {t("button")}
      </Button>
    </form>
  );
}
