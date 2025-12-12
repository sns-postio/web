"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  button?: string;
  onRetry?: () => void;
  buttonHref?: string;
}

export type ErrorStateVariantProps = Partial<ErrorStateProps>;

export function ErrorState({
  title = "일시적인 오류가 발생했습니다",
  description = "잠시 후 다시 시도해주세요",
  button = "다시 시도하기",
  onRetry,
  buttonHref,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center min-w-max gap-6 py-16">
      <div className="flex flex-col items-center gap-1 ">
        <p className="text-[15px] md:text-lg font-bold leading-7 tracking-normal text-foreground">
          {title}
        </p>
        <p className="text-sm md:text-base font-medium leading-6 tracking-normal text-muted-foreground">
          {description}
        </p>
      </div>

      {buttonHref ? (
        <Button
          asChild
          variant="outline"
          className="h-8 px-4 py-2 rounded-lg border border-border bg-secondary text-sm text-secondary-foreground shadow-xs"
        >
          <Link href={buttonHref}>{button}</Link>
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          className="h-8 px-4 py-2 rounded-lg border border-border bg-secondary text-sm text-secondary-foreground shadow-xs"
        >
          {button}
        </Button>
      )}
    </div>
  );
}

export function TemporaryError(props: ErrorStateVariantProps) {
  return (
    <ErrorState
      title="일시적인 오류가 발생했습니다"
      description="잠시 후 다시 시도해주세요"
      button="다시 시도하기"
      {...props}
    />
  );
}

export function NoDataError(props: ErrorStateVariantProps) {
  return (
    <ErrorState
      title="해당 기간에는 아직 분석하기 충분한 데이터가 없습니다"
      description="데이터가 쌓일 때까지 조금 더 기다려주세요"
      button="전 월 분석 보기"
      {...props}
    />
  );
}

export function NoConnectionError(props: ErrorStateVariantProps) {
  return (
    <ErrorState
      title="연동된 SNS 계정이 없습니다"
      description="계정을 연동하면 성과 분석을 확인할 수 있습니다"
      button="계정 연동하기"
      {...props}
    />
  );
}
