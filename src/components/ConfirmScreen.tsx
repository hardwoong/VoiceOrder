import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';

interface ConfirmScreenProps {
  menu: MenuItem;
  onConfirm: () => void;
  onBack: () => void;
  onCallStaff: () => void;
}

/** 4) 확인 화면 — 선택 음료 크게 표시 후 주문 */
export function ConfirmScreen({
  menu,
  onConfirm,
  onBack,
  onCallStaff,
}: ConfirmScreenProps) {
  return (
    <div className="relative flex h-full flex-col px-6 py-8">
      <div className="flex justify-end">
        <CallStaffButton onClick={onCallStaff} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg overflow-hidden rounded-3xl border-2 border-line bg-card-light shadow-xl"
        >
          <div className="flex h-48 items-center justify-center bg-card text-8xl">
            {menu.thumb}
          </div>
          <div className="p-8">
            <h2 className="text-4xl font-bold text-espresso">{menu.name}</h2>
            <p className="mt-4 text-2xl leading-relaxed text-body">{menu.desc}</p>
          </div>
        </motion.div>

        <p className="text-3xl font-semibold text-espresso">이걸로 주문할까요?</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="btn-primary min-w-[280px] bg-teal text-white"
          >
            주문할게요
          </button>
          <button type="button" onClick={onBack} className="btn-secondary min-w-[200px]">
            다시 고를게요
          </button>
        </div>
      </div>
    </div>
  );
}
