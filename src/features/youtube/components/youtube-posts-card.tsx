"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import type { UserConnection } from "../api/types";
import { useYoutubePosts } from "../hooks/useYoutubePosts";

interface YoutubePostsCardProps {
  connections: UserConnection[];
}

const PAGE_SIZE = 5;

export function YoutubePostsCard({ connections }: YoutubePostsCardProps) {
  const t = useTranslations("youtube.connectPage.posts");
  const locale = useLocale();
  const [selectedConnectId, setSelectedConnectId] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!connections.length) {
      setSelectedConnectId("");
      return;
    }
    const hasSelected = connections.some((connection) => connection.id.toString() === selectedConnectId);
    if (!hasSelected) {
      setSelectedConnectId(connections[0].id.toString());
    }
  }, [connections, selectedConnectId]);

  useEffect(() => {
    setPage(1);
  }, [selectedConnectId]);

  const hasConnection = Boolean(selectedConnectId);

  const { data, isLoading, isError, isFetching, refetch } = useYoutubePosts(
    { connectId: selectedConnectId, page, limit: PAGE_SIZE },
    hasConnection
  );

  const items = data?.items ?? [];
  const totalPages = data?.total ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  const connectionOptions = useMemo(
    () =>
      connections.map((connection) => ({
        value: connection.id.toString(),
        label: `#${connection.id} · ${connection.platform}`,
      })),
    [connections]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-2 text-sm font-medium">
            {t("selectLabel")}
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-base"
              value={selectedConnectId}
              onChange={(e) => setSelectedConnectId(e.target.value)}
            >
              {connectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <Button type="button" variant="outline" onClick={() => refetch()} disabled={!hasConnection || isFetching}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t("retry")}
          </Button>
        </div>

        {!hasConnection && <p className="text-sm text-muted-foreground">{t("hint")}</p>}

        {hasConnection && isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("loading")}</span>
          </div>
        ) : hasConnection && isError ? (
          <Alert variant="destructive">
            <AlertTitle>{t("errorTitle")}</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{t("errorDescription")}</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("retry")}
              </Button>
            </AlertDescription>
          </Alert>
        ) : hasConnection && items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        ) : hasConnection ? (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left font-semibold">
                  <tr>
                    <th className="px-4 py-2">{t("columns.title")}</th>
                    <th className="px-4 py-2">{t("columns.publishedAt")}</th>
                    <th className="px-4 py-2">{t("columns.privacy")}</th>
                    <th className="px-4 py-2">{t("columns.type")}</th>
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
                      <td className="px-4 py-3 capitalize">
                        {post.isShort ? t("types.short") : t("types.video")}
                      </td>
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

            {data && data.total > PAGE_SIZE && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("pagination.page", { current: page, total: totalPages })}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1 || isFetching}
                    onClick={() => setPage(Math.max(1, page - 1))}
                  >
                    {t("pagination.prev")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages || isFetching}
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                  >
                    {t("pagination.next")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
