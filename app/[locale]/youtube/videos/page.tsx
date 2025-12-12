"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UploadCloud } from "lucide-react";
import { useUserConnections } from "@/features/channel/integration/hooks/useUserConnections";
import { useYoutubeVideoPost } from "@/features/youtube/hooks/useYoutubeVideoPost";

export default function YoutubeVideoPostPage() {
  return (
      <YoutubeVideoPostContent />
  );
}

function YoutubeVideoPostContent() {
  const t = useTranslations("youtube.uploadPage");
  const locale = useLocale();
  const { data: connections = [], isLoading } = useUserConnections();
  const hasConnection = connections.length > 0;
  const [selectedConnectId, setSelectedConnectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState<"public" | "private">("private");
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const { mutate: uploadVideo, isPending } = useYoutubeVideoPost();

  useEffect(() => {
    if (connections.length > 0 && !selectedConnectId) {
      setSelectedConnectId(connections[0].id.toString());
    }
  }, [connections, selectedConnectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConnectId) {
      setFormError(t("errors.noConnection"));
      return;
    }
    if (!file) {
      setFormError(t("errors.noFile"));
      return;
    }
    if (!title.trim()) {
      setFormError(t("errors.noTitle"));
      return;
    }
    setFormError("");
    uploadVideo(
      {
        connectId: selectedConnectId,
        title: title.trim(),
        description: description.trim() || undefined,
        privacyStatus,
        file,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setFile(null);
          setPrivacyStatus("private");
        },
      }
    );
  };

  if (!isLoading && !hasConnection) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <Card>
          <CardHeader>
            <CardTitle>{t("noConnection.title")}</CardTitle>
            <CardDescription>{t("noConnection.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href={`/${locale}/youtube`}>{t("noConnection.button")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium">
                {t("fields.connection")}
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-base"
                  value={selectedConnectId}
                  onChange={(e) => setSelectedConnectId(e.target.value)}
                  disabled={isLoading || isPending}
                >
                  {connections.map((connection) => (
                    <option key={connection.id} value={connection.id}>
                      #{connection.id} · {connection.platform}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium">
                {t("fields.privacy")}
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-base"
                  value={privacyStatus}
                  onChange={(e) => setPrivacyStatus(e.target.value as "public" | "private")}
                  disabled={isPending}
                >
                  <option value="private">{t("privacy.private")}</option>
                  <option value="public">{t("privacy.public")}</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium">
              {t("fields.title")}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("placeholders.title")}
                disabled={isPending}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              {t("fields.description")}
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("placeholders.description")}
                disabled={isPending}
              />
            </label>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t("fields.file")}</p>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 p-6 text-center">
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{file ? file.name : t("upload.placeholder")}</p>
                  <p className="text-xs text-muted-foreground">{t("upload.helper")}</p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }}
                  disabled={isPending}
                />
              </label>
            </div>

            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isPending || isLoading} className="w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
