"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertEmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AlertEmptyState({
  title = "분석하기 충분한 데이터가 없습니다",
  description = "일정량 이상의 활동 데이터가 쌓이면 아래와 같은 대시보드가 여기에 표시됩니다",
  className,
}: AlertEmptyStateProps) {
  return (
    <div className="w-full flex justify-center">
      <Alert
        className={cn(
          "flex items-start max-w-[719px] rounded-lg border border-border bg-white px-4 py-3 gap-y-0.5",
          className
        )}
      >
        <Info className="h-5 w-5 text-muted-foreground mt-0.5" />

        <div className="flex flex-col">
          <AlertTitle className="text-sm font-medium text-foreground leading-5 tracking-normal">
            {title}
          </AlertTitle>

          <AlertDescription className="text-sm font-light text-foreground tracking-normal leading-5">
            {description}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
