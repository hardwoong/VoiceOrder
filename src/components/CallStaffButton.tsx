import { Bell } from 'lucide-react';

interface CallStaffButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md';
}

/** 우측 상단 등에 항상 노출되는 직원 호출 버튼 */
export function CallStaffButton({ onClick, size = 'sm' }: CallStaffButtonProps) {
  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border-2 border-line bg-white font-semibold text-body shadow-sm transition-colors hover:bg-card ${
        isSmall ? 'min-h-[48px] px-4 text-lg' : 'btn-secondary min-w-[200px]'
      }`}
      aria-label="직원 부르기"
    >
      <Bell className={isSmall ? 'h-5 w-5' : 'h-6 w-6'} aria-hidden />
      직원 부르기
    </button>
  );
}
