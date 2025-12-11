"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserConnection } from "@/features/channel-management/api/types";
import {
  useInstagramFeedUpload,
  useInstagramReelUpload,
  useInstagramStoryUpload,
} from "@/features/instagram/hooks/useInstagramUpload";

interface InstagramUploadCardProps {
  connections: UserConnection[];
}

type UploadTab = "feed" | "reel" | "story";

const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export function InstagramUploadCard({ connections }: InstagramUploadCardProps) {
  const t = useTranslations("instagram.uploadCard");
  const [selectedConnectId, setSelectedConnectId] = useState("");
  const [activeTab, setActiveTab] = useState<UploadTab>("feed");

  const [feedCaption, setFeedCaption] = useState("");
  const [feedFiles, setFeedFiles] = useState<File[]>([]);
  const [reelCaption, setReelCaption] = useState("");
  const [reelFile, setReelFile] = useState<File | null>(null);
  const [storyFile, setStoryFile] = useState<File | null>(null);

  const feedInputRef = useRef<HTMLInputElement>(null);
  const reelInputRef = useRef<HTMLInputElement>(null);
  const storyInputRef = useRef<HTMLInputElement>(null);

  const { mutate: publishFeed, isPending: isPublishingFeed } = useInstagramFeedUpload();
  const { mutate: publishReel, isPending: isPublishingReel } = useInstagramReelUpload();
  const { mutate: publishStory, isPending: isPublishingStory } = useInstagramStoryUpload();

  useEffect(() => {
    setSelectedConnectId((current) => {
      if (!connections.length) {
        return "";
      }
      const hasSelected = connections.some((connection) => connection.id.toString() === current);
      return hasSelected ? current : connections[0].id.toString();
    });
  }, [connections]);

  const hasConnection = Boolean(selectedConnectId);

  const connectionOptions = useMemo(
    () =>
      connections.map((connection) => ({
        value: connection.id.toString(),
        label: `#${connection.id}`,
      })),
    [connections]
  );

  const feedCaptionValue = feedCaption.trim();
  const reelCaptionValue = reelCaption.trim();

  const handleFeedSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasConnection || !feedFiles.length || !feedCaptionValue || isPublishingFeed) return;

    publishFeed(
      {
        connectId: selectedConnectId,
        caption: feedCaptionValue,
        files: feedFiles,
      },
      {
        onSuccess: () => {
          setFeedCaption("");
          setFeedFiles([]);
          if (feedInputRef.current) {
            feedInputRef.current.value = "";
          }
        },
      }
    );
  };

  const handleReelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasConnection || !reelFile || !reelCaptionValue || isPublishingReel) return;
    publishReel(
      {
        connectId: selectedConnectId,
        caption: reelCaptionValue,
        file: reelFile,
      },
      {
        onSuccess: () => {
          setReelCaption("");
          setReelFile(null);
          if (reelInputRef.current) {
            reelInputRef.current.value = "";
          }
        },
      }
    );
  };

  const handleStorySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasConnection || !storyFile || isPublishingStory) return;
    publishStory(
      {
        connectId: selectedConnectId,
        file: storyFile,
      },
      {
        onSuccess: () => {
          setStoryFile(null);
          if (storyInputRef.current) {
            storyInputRef.current.value = "";
          }
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          {t("connectionLabel")}
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-base"
            value={selectedConnectId}
            onChange={(event) => setSelectedConnectId(event.target.value)}
            disabled={!connections.length}
          >
            {connectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-xs font-normal text-muted-foreground">{t("connectionHint")}</span>
        </label>

        {!hasConnection ? (
          <p className="rounded-md border border-dashed px-4 py-6 text-sm text-muted-foreground">
            {t("noConnection")}
          </p>
        ) : (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UploadTab)} className="pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">{t("tabs.feed")}</TabsTrigger>
              <TabsTrigger value="reel">{t("tabs.reel")}</TabsTrigger>
              <TabsTrigger value="story">{t("tabs.story")}</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="pt-4">
              <form className="space-y-4" onSubmit={handleFeedSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="feed-caption">{t("feed.captionLabel")}</Label>
                  <Textarea
                    id="feed-caption"
                    placeholder={t("feed.captionPlaceholder")}
                    value={feedCaption}
                    onChange={(event) => setFeedCaption(event.target.value)}
                    disabled={isPublishingFeed}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feed-files">{t("feed.filesLabel")}</Label>
                  <Input
                    ref={feedInputRef}
                    id="feed-files"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(event) => setFeedFiles(Array.from(event.target.files ?? []))}
                    disabled={isPublishingFeed}
                  />
                  <p className="text-xs text-muted-foreground">{t("feed.filesHint")}</p>
                  {feedFiles.length > 0 && (
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {feedFiles.map((file) => (
                        <li key={`${file.name}-${file.lastModified}`}>
                          {file.name} · {formatFileSize(file.size)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button type="submit" disabled={!feedFiles.length || !feedCaptionValue || isPublishingFeed}>
                  {isPublishingFeed && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("feed.button")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="reel" className="pt-4">
              <form className="space-y-4" onSubmit={handleReelSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="reel-caption">{t("reel.captionLabel")}</Label>
                  <Textarea
                    id="reel-caption"
                    placeholder={t("reel.captionPlaceholder")}
                    value={reelCaption}
                    onChange={(event) => setReelCaption(event.target.value)}
                    disabled={isPublishingReel}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reel-file">{t("reel.fileLabel")}</Label>
                  <Input
                    ref={reelInputRef}
                    id="reel-file"
                    type="file"
                    accept="video/*"
                    onChange={(event) => setReelFile(event.target.files?.[0] ?? null)}
                    disabled={isPublishingReel}
                  />
                  <p className="text-xs text-muted-foreground">{t("reel.fileHint")}</p>
                  {reelFile && (
                    <p className="text-sm text-muted-foreground">
                      {reelFile.name} · {formatFileSize(reelFile.size)}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={!reelFile || !reelCaptionValue || isPublishingReel}>
                  {isPublishingReel && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("reel.button")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="story" className="pt-4">
              <form className="space-y-4" onSubmit={handleStorySubmit}>
                <div className="space-y-2">
                  <Label htmlFor="story-file">{t("story.fileLabel")}</Label>
                  <Input
                    ref={storyInputRef}
                    id="story-file"
                    type="file"
                    accept="image/*,video/*"
                    onChange={(event) => setStoryFile(event.target.files?.[0] ?? null)}
                    disabled={isPublishingStory}
                  />
                  <p className="text-xs text-muted-foreground">{t("story.fileHint")}</p>
                  {storyFile && (
                    <p className="text-sm text-muted-foreground">
                      {storyFile.name} · {formatFileSize(storyFile.size)}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={!storyFile || isPublishingStory}>
                  {isPublishingStory && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("story.button")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
