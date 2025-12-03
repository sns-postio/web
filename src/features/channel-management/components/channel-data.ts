"use client";

import { Facebook, Instagram, LucideIcon, Music3, PlaySquare } from "lucide-react";

export type ChannelStatus = "connected" | "disconnected";

export type ChannelCardConfig = {
  id: string;
  name: string;
  platformKey: string;
  defaultStatus?: ChannelStatus;
  handle?: string;
  connectedAt?: string;
  lastSynced?: string;
  descriptionKey: string;
  icon: LucideIcon;
  accentClass: string;
  pageHref?: string;
  analyticsHref?: string;
};

export const channelCards: ChannelCardConfig[] = [
  {
    id: "youtube",
    name: "YouTube",
    platformKey: "YOUTUBE",
    defaultStatus: "connected",
    handle: "@PostioChannel",
    connectedAt: "2025.10.01 14:30",
    lastSynced: "2025.11.26 12:20",
    descriptionKey: "youtube",
    icon: PlaySquare,
    accentClass: "bg-red-500/10 text-red-600",
    pageHref: "/youtube",
    analyticsHref: "/youtube/videos",
  },
  {
    id: "facebook",
    name: "Facebook",
    platformKey: "FACEBOOK",
    defaultStatus: "connected",
    handle: "Postio Official",
    connectedAt: "2025.10.10 09:15",
    lastSynced: "2025.11.26 13:45",
    descriptionKey: "facebook",
    icon: Facebook,
    accentClass: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "instagram",
    name: "Instagram",
    platformKey: "INSTAGRAM",
    defaultStatus: "connected",
    handle: "@postio_official",
    connectedAt: "2025.10.15 16:20",
    lastSynced: "2025.11.26 14:30",
    descriptionKey: "instagram",
    icon: Instagram,
    accentClass: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    platformKey: "TIKTOK",
    defaultStatus: "disconnected",
    descriptionKey: "tiktok",
    icon: Music3,
    accentClass: "bg-muted text-foreground",
  },
];
