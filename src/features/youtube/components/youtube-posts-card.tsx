"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import type { UserConnection, YoutubePostsPayload } from "../api/types";

interface YoutubePostsCardProps {
  connections: UserConnection[];
  activeConnectId: string;
  onConnectChange: (id: string) => void;
  postsData?: YoutubePostsPayload;
  postsLoading: boolean;
  postsError: boolean;
  onRetry: () => void;
  postsPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export function YoutubePostsCard({
  connections,
  activeConnectId,
  onConnectChange,
  postsData,
  postsLoading,
  postsError,
  onRetry,
  postsPage,
  onPageChange,
  pageSize,
}: YoutubePostsCardProps) {
  const t = useTranslations("youtube.connectPage.posts");
  const locale = useLocale();
  const totalPages = postsData?.total ? Math.max(1, Math.ceil(postsData.total / pageSize)) : 1;
  const items = postsData?.items ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium sm:w-72">
          {t("selectLabel")}
          <select
            value={activeConnectId}
            onChange={(e) => onConnectChange(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-base"
          >
            {connections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                #{connection.id} · {connection.platform}
              </option>
            ))}
          </select>
        </label>

        {postsLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("loading")}</span>
          </div>
        ) : postsError ? (
          <Alert variant="destructive">
            <AlertTitle>{t("errorTitle")}</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{t("errorDescription")}</span>
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("retry")}
              </Button>
            </AlertDescription>
          </Alert>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left font-semibold">
                  <tr>
                    <th className="px-4 py-2">{t("columns.title")}</th>
                    <th className="px-4 py-2">{t("columns.publishedAt")}</th>
                    <th className="px-4 py-2">{t("columns.privacy")}</th>
                    <th className="px-4 py-2">{t("columns.stats")}</th>
                    <th className="px-4 py-2">{t("columns.link")}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((post) => (
                    <tr key={post.id} className="border-t">
                      <td className="px-4 py-3 font-medium">{post.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleString(locale)}
                      </td>
                      <td className="px-4 py-3 capitalize">{post.privacyStatus}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        <div>
                          {t("stats.views")}: <span className="font-medium">{post.viewCount}</span>
                        </div>
                        <div>
                          {t("stats.likes")}: <span className="font-medium">{post.likeCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          {t("linkLabel")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {postsData && postsData.total > pageSize && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("pagination.page", { current: postsPage, total: totalPages })}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={postsPage === 1}
                    onClick={() => onPageChange(Math.max(1, postsPage - 1))}
                  >
                    {t("pagination.prev")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={postsPage >= totalPages}
                    onClick={() => onPageChange(Math.min(totalPages, postsPage + 1))}
                  >
                    {t("pagination.next")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
