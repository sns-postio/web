"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GoLinkButtonProps {
  href: string;
  label: string;
}

export function GoLinkButton({ href, label }: GoLinkButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border bg-white shadow-xs "
    >
      <span className="text-foreground text-sm font-medium leading-5 tracking-normal">{label}</span>
      <ExternalLink size={16} strokeWidth={2} />
    </Link>
  );
}
