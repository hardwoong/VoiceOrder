import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';
import { ScreenShell } from './ScreenShell';

interface ConfirmScreenProps {
  menu: MenuItem;
  onConfirm: () => void;
  onBack: () => void;
  onCallStaff: () => void;
}

/** 4) 확인 화면 */
export function ConfirmScreen({
  menu,
  onConfirm,
  onBack,
  onCallStaff,
}: ConfirmScreenProps) {
  return (
    <ScreenShell className="gap-4">
      <div className="flex shrink-0 justify-end">
        <CallStaffButton onClick={onCallStaff} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center sm:gap-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full overflow-hidden rounded-2xl border-2 border-line bg-card-light shadow-xl sm:max-w-lg sm:rounded-3xl"
        >
          <div className="flex h-32 items-center justify-center bg-card text-6xl sm:h-48 sm:text-8xl">
            {menu.thumb}
          </div>
          <div className="p-4 sm:p-8">
            <h2 className="text-2xl font-bold text-espresso sm:text-4xl">{menu.name}</h2>
            <p className="mt-2 text-base leading-relaxed text-body sm:mt-4 sm:text-2xl">
              {menu.desc}
            </p>
          </div>
        </motion.div>

        <p className="text-xl font-semibold text-espresso sm:text-3xl">이걸로 주문할까요?</p>

        <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="btn-primary w-full bg-teal text-white sm:min-w-[240px] sm:w-auto"
          >
            주문할게요
          </button>
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary w-full sm:min-w-[180px] sm:w-auto"
          >
            다시 고를게요
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
