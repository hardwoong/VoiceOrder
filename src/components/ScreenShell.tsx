import type { ReactNode } from 'react';

interface ScreenShellProps {
  children: ReactNode;
  /** 본문만 스크롤 (헤더·하단 고정용) */
  scrollBody?: boolean;
  className?: string;
}

/**
 * 모바일(QR) 퍼스트 화면 껍데기
 * - safe-area · 가로 overflow 방지 · dvh 높이
 */
export function ScreenShell({
  children,
  scrollBody = false,
  className = '',
}: ScreenShellProps) {
  return (
    <div
      className={`screen-shell flex min-h-dvh flex-col overflow-x-hidden ${scrollBody ? 'overflow-hidden' : 'overflow-y-auto'} ${className}`}
    >
      {children}
    </div>
  );
}

/** 스크롤 가능한 본문 영역 */
export function ScreenBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
}
