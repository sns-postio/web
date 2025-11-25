// src/components/layout/user-menu.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/features/auth/api/service";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, KeyRound } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function UserMenu() {
  const [user, setUser] = useState(AuthService.getUser());
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const t = useTranslations("auth.userMenu");

  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.logout();
      toast({
        title: t("logoutTitle"),
        description: t("logoutDesc"),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: t("logoutFail"),
        description: t("logoutFailDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handlePasswordReset = () => {
    router.push(`/auth/change-password`);
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium capitalize">{user.accountType}</p>
            <p className="text-sm text-muted-foreground capitalize">{user.planType}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handlePasswordReset}>
          <KeyRound className="mr-2 h-4 w-4" />
          {t("changePw")}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? t("loggingOut") : t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
