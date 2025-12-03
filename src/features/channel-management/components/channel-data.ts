"use client";

import { Facebook, Instagram, LucideIcon, Music3, PlaySquare, AtSign } from "lucide-react";

export type PlatformMeta = {
  name: string;
  descriptionKey: string;
  icon: LucideIcon;
  accentClass: string;
  pageHref?: string;
  analyticsHref?: string;
};

export const PLATFORM_META: Record<string, PlatformMeta> = {
  YOUTUBE: {
    name: "YouTube",
    descriptionKey: "youtube",
    icon: PlaySquare,
    accentClass: "bg-red-500/10 text-red-600",
    pageHref: "/youtube",
    analyticsHref: "/youtube/videos",
  },
  FACEBOOK: {
    name: "Facebook",
    descriptionKey: "facebook",
    icon: Facebook,
    accentClass: "bg-blue-500/10 text-blue-600",
  },
  INSTAGRAM: {
    name: "Instagram",
    descriptionKey: "instagram",
    icon: Instagram,
    accentClass: "bg-pink-500/10 text-pink-600",
  },
  THREADS: {
    name: "Threads",
    descriptionKey: "threads",
    icon: AtSign,
    accentClass: "bg-muted text-foreground",
  },
  TIKTOK: {
    name: "TikTok",
    descriptionKey: "tiktok",
    icon: Music3,
    accentClass: "bg-muted text-foreground",
  },
};

export const SUPPORTED_PLATFORMS = ["YOUTUBE", "FACEBOOK", "INSTAGRAM", "THREADS", "TIKTOK"];
