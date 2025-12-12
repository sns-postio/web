"use client";

import Link from "next/link";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthService } from "@/features/auth/api/service";
import { toast } from "@/hooks/use-toast";

type PrimaryNavItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      items: {
        label: string;
        href: string;
      }[];
    };

const buildPrimaryNavigation = (t: (key: string) => string): PrimaryNavItem[] => [
  { label: t("serviceIntro"), href: "/" },
  {
    label: t("channelManagement"),
    items: [
      { label: t("analysis"), href: "/channel/analytics" },
      { label: t("publish"), href: "/channel/publish" },
      { label: t("integration"), href: "/channel/integration" },
    ],
  },
  {
    label: t("mypage"),
    items: [{ label: t("mypage"), href: "/mypage" }],
  },
];

const buildLocaleHref = (locale: string, path: string) => {
  if (path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
};

type MobileNavProps = {
  locale: string;
  isLoggedIn: boolean;
  loginHref: string;
  onLogout: () => void;
  isLoggingOut: boolean;
};

const MobileNav = ({ locale, isLoggedIn, loginHref, onLogout, isLoggingOut }: MobileNavProps) => {
  const gnbTranslations = useTranslations("gnb");
  const primaryNavigation = buildPrimaryNavigation(gnbTranslations);

  if (!isLoggedIn) {
    return (
      <Button asChild className="rounded-lg px-5 py-2 md:hidden">
        <Link href={buildLocaleHref(locale, loginHref)}>{gnbTranslations("login")}</Link>
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
          aria-label="모바일 메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <div className="flex h-full flex-col">
          <SheetHeader className="items-start text-left">
            <SheetTitle className="text-xl font-semibold">Postio</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex-1 space-y-5 overflow-y-auto text-sm">
            {primaryNavigation.map((item) => {
              if ("items" in item) {
                return (
                  <div key={item.label} className="space-y-3 rounded-md p-3">
                    <p className="text-base font-semibold text-foreground">{item.label}</p>
                    <div className="space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={buildLocaleHref(locale, subItem.href)}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={buildLocaleHref(locale, item.href)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground transition hover:bg-accent"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Separator />
          <div className="px-2 py-2 sm:px-4">
            <Button className="w-full rounded-lg px-6" onClick={onLogout} disabled={isLoggingOut}>
              {isLoggingOut ? gnbTranslations("loggingOut") : gnbTranslations("logout")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

type GNBBaseProps = {
  locale: string;
  isLoggedIn: boolean;
  loginHref: string;
  onLogout: () => void;
  isLoggingOut?: boolean;
};

const GNBBase = ({
  locale,
  isLoggedIn,
  loginHref,
  onLogout,
  isLoggingOut = false,
}: GNBBaseProps) => {
  const gnbTranslations = useTranslations("gnb");
  const primaryNavigation = buildPrimaryNavigation(gnbTranslations);

  return (
    <header className="w-full h-[68px] border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <Link
          href={buildLocaleHref(locale, "/")}
          className="text-2xl leading-[20px] font-bold tracking-tight text-foreground"
        >
          Postio
        </Link>

        {isLoggedIn ? (
          <>
            <div className="hidden items-center gap-[13px] md:flex">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-1">
                  {primaryNavigation.map((item) => {
                    if ("items" in item) {
                      return (
                        <NavigationMenuItem key={item.label}>
                          <NavigationMenuTrigger className="text-sm font-medium">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="shadow-md">
                            <div className="min-w-[314px] bg-popover p-2">
                              <ul className="flex flex-col p-1">
                                {item.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={buildLocaleHref(locale, subItem.href)}
                                        className="flex flex-col gap-1 rounded-md px-2 py-3 text-left text-sm hover:bg-accent"
                                      >
                                        <span className="font-medium">{subItem.label}</span>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={buildLocaleHref(locale, item.href)}
                            className="text-sm font-medium px-4 py-2 text-foreground transition hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
                <NavigationMenuIndicator className="hidden" />
              </NavigationMenu>

              <div>
                <Button
                  size="sm"
                  className="flex h-[36px] w-fit items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow-sm"
                  onClick={onLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? gnbTranslations("loggingOut") : gnbTranslations("logout")}
                </Button>
              </div>
            </div>
            <MobileNav
              locale={locale}
              isLoggedIn
              loginHref={loginHref}
              onLogout={onLogout}
              isLoggingOut={isLoggingOut}
            />
          </>
        ) : (
          <Button asChild className="rounded-lg px-5 py-2">
            <Link href={buildLocaleHref(locale, loginHref)}>{gnbTranslations("login")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export const GNBBaseComponent = GNBBase;

const GNB = () => {
  const locale = useLocale();
  const router = useRouter();
  const userMenuTranslations = useTranslations("auth.userMenu");
  const [user, setUser] = useState(AuthService.getUser());
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const isAuthenticated = !!user;
  const loginHref = "/auth/login";

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

  return (
    <GNBBase
      locale={locale}
      isLoggedIn={isAuthenticated}
      loginHref={loginHref}
      onLogout={handleLogout}
      isLoggingOut={isLoggingOut}
    />
  );
};

export default GNB;
