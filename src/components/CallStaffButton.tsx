import { Bell } from 'lucide-react';

interface CallStaffButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md';
}

/** 직원 호출 — 모바일 compact */
export function CallStaffButton({ onClick, size = 'sm' }: CallStaffButtonProps) {
  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-line bg-white font-semibold text-body shadow-sm transition-colors hover:bg-card active:bg-card ${
        isSmall
          ? 'min-h-[44px] px-3 text-sm sm:min-h-[48px] sm:gap-2 sm:px-4 sm:text-base'
          : 'btn-secondary min-w-0 w-full sm:min-w-[200px] sm:w-auto'
      }`}
      aria-label="직원 부르기"
    >
      <Bell className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
      직원 부르기
    </button>
  );
}
