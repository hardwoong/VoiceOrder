import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface DoneScreenProps {
  orderNumber: string;
  onRate: () => void;
}

/** 5) 완료 화면 — 주문번호 + 별점 안내 */
export function DoneScreen({ orderNumber, onRate }: DoneScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center"
    >
      <CheckCircle2 className="h-24 w-24 text-teal" aria-hidden />

      <h2 className="text-5xl font-bold text-espresso">주문 완료!</h2>

      <div className="rounded-3xl border-4 border-caramel bg-card-light px-16 py-8">
        <p className="text-2xl text-body">주문 번호</p>
        <p className="mt-2 text-6xl font-bold tracking-wider text-caramel">
          {orderNumber}
        </p>
      </div>

      <p className="max-w-md text-2xl leading-relaxed text-body">
        음료 나오면 번호를 확인해 주세요.
        <br />
        마신 뒤 별점 남겨주세요.
      </p>

      <button type="button" onClick={onRate} className="btn-primary bg-caramel text-white">
        별점 남기기
      </button>
    </motion.div>
  );
}
