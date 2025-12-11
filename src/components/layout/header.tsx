"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { AuthService } from "@/features/auth/api/service";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KeyRound, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type NavItem = {
  key: string;
  label: string;
  href: string;
};

export function Header() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const homeTranslations = useTranslations("home");
  const navTranslations = useTranslations("home.header");
  const userMenuTranslations = useTranslations("auth.userMenu");
  const [user, setUser] = useState(AuthService.getUser());
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const isAuthenticated = !!user;

  const navItems: NavItem[] = [];

  if (isAuthenticated) {
    navItems.push(
      {
        key: "channelManagement",
        label: navTranslations("channelManagement"),
        href: `/${locale}/channel-management`,
      },
      // { key: "myPage", label: navTranslations("myPage"), href: `/${locale}/mypage` }
    );
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.logout();
      toast({
        title: userMenuTranslations("logoutTitle"),
        description: userMenuTranslations("logoutDesc"),
      });
      setUser(null);
      router.push(`/${locale}`);
      router.refresh();
    } catch (error) {
      toast({
        title: userMenuTranslations("logoutFail"),
        description: userMenuTranslations("logoutFailDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handlePasswordReset = () => {
    router.push(`/${locale}/auth/change-password`);
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <Image src="/logo.png" alt={homeTranslations("brand")} width={40} height={40} />
          <span className="text-xl font-bold">{homeTranslations("brand")}</span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.length > 0 && (
            <>
              <nav className="hidden md:flex items-center gap-3 text-sm font-bold">
                {navItems.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`rounded-md px-3 py-1 transition-colors ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <nav className="md:hidden">
                {navItems.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`inline-flex items-center rounded-md border px-3 py-1 text-sm font-semibold ${
                        isActive ? "border-primary text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </>
          )}

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <UserDropdown
                user={user}
                isLoggingOut={isLoggingOut}
                onLogout={handleLogout}
                onPasswordReset={handlePasswordReset}
              />
            ) : (
              <>
                <Link href={`/${locale}/auth/login`}>
                  <Button variant="ghost">{homeTranslations("login")}</Button>
                </Link>
                <Link href={`/${locale}/auth/signup`}>
                  <Button>{homeTranslations("start")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

type UserDropdownProps = {
  user: ReturnType<typeof AuthService.getUser>;
  isLoggingOut: boolean;
  onLogout: () => Promise<void> | void;
  onPasswordReset: () => void;
};

function UserDropdown({ user, isLoggingOut, onLogout, onPasswordReset }: UserDropdownProps) {
  const userMenuTranslations = useTranslations("auth.userMenu");

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
            {user.email && <p className="font-medium">{user.email}</p>}
            <p className="text-sm text-muted-foreground capitalize">{user.accountType}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.planType}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onPasswordReset}>
          <KeyRound className="mr-2 h-4 w-4" />
          {userMenuTranslations("changePw")}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? userMenuTranslations("loggingOut") : userMenuTranslations("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
