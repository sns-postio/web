"use client";

interface CardProps {
  title?: string;
  children?: React.ReactNode;
}

export function PostioCard({ title, children}: CardProps) {
  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
      {title && (
        <span className="text-lg  font-bold leading-7 tracking-normal text-foreground">
          {title}
        </span>
      )}

      <div className="overflow-x-auto scroll-hide">{children}</div>
    </div>
  );
}
