"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useInstagramPosts } from "../hooks/useInstagramPosts";
import { useTranslations } from "next-intl";

interface InstagramPostsCardProps {
  connectId: string;
}

export function InstagramPostsCard({ connectId }: InstagramPostsCardProps) {
  const t = useTranslations("instagram.postsCard");
  const { data, isLoading, isError } = useInstagramPosts(connectId, 1, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        )}

        {isError && <p className="text-sm text-destructive">{t("error")}</p>}

        {!isLoading && !isError && data && (
          <div className="grid grid-cols-2 gap-4">
            {data.items.map((post) => (
              <Link key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="group">
                <div className="overflow-hidden rounded-lg border">
                  <div className="relative h-32 w-full">
                    <Image
                      src={post.mediaUrl}
                      alt={post.caption ?? "Instagram post"}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 text-xs text-muted-foreground">
                    <p className="line-clamp-2">{post.caption || t("noCaption")}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span>❤️ {post.likeCount}</span>
                      <span>💬 {post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
