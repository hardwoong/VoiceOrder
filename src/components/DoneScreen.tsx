import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ScreenShell } from './ScreenShell';

interface DoneScreenProps {
  orderNumber: string;
  onRate: () => void;
}

/** 5) 완료 화면 */
export function DoneScreen({ orderNumber, onRate }: DoneScreenProps) {
  return (
    <ScreenShell>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-2 text-center sm:gap-8"
      >
        <CheckCircle2 className="h-16 w-16 text-teal sm:h-24 sm:w-24" aria-hidden />

        <h2 className="text-3xl font-bold text-espresso sm:text-5xl">주문 완료!</h2>

        <div className="w-full max-w-xs rounded-2xl border-4 border-caramel bg-card-light px-8 py-6 sm:max-w-md sm:rounded-3xl sm:px-16 sm:py-8">
          <p className="text-lg text-body sm:text-2xl">주문 번호</p>
          <p className="mt-1 text-4xl font-bold tracking-wider text-caramel sm:mt-2 sm:text-6xl">
            {orderNumber}
          </p>
        </div>

        <p className="max-w-xs text-base leading-relaxed text-body sm:max-w-md sm:text-2xl">
          음료 나오면 번호를 확인해 주세요.
          <br />
          마신 뒤 별점 남겨주세요.
        </p>

        <button
          type="button"
          onClick={onRate}
          className="btn-primary w-full max-w-xs bg-caramel text-white sm:max-w-sm"
        >
          별점 남기기
        </button>
      </motion.div>
    </ScreenShell>
  );
}
