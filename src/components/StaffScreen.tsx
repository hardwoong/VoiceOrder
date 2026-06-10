import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import { ScreenShell } from './ScreenShell';

interface StaffScreenProps {
  onBack: () => void;
}

/** 직원 호출 안내 */
export function StaffScreen({ onBack }: StaffScreenProps) {
  return (
    <ScreenShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-2 text-center sm:gap-8"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber/20 sm:h-28 sm:w-28">
          <UserCheck className="h-10 w-10 text-caramel sm:h-14 sm:w-14" aria-hidden />
        </div>

        <h2 className="text-2xl font-bold text-espresso sm:text-4xl">직원을 불렀어요</h2>
        <p className="max-w-xs text-base leading-relaxed text-body sm:max-w-lg sm:text-2xl">
          잠시만 기다려 주세요.
          <br />
          직원이 곧 도와드릴 거예요.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="btn-primary w-full max-w-xs bg-caramel text-white sm:max-w-sm"
        >
          처음으로 돌아가기
        </button>
      </motion.div>
    </ScreenShell>
  );
}
