import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

interface StaffScreenProps {
  onBack: () => void;
}

/** 직원 호출 안내 화면 — 데모가 막히지 않도록 항상 복귀 가능 */
export function StaffScreen({ onBack }: StaffScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber/20">
        <UserCheck className="h-14 w-14 text-caramel" aria-hidden />
      </div>

      <h2 className="text-4xl font-bold text-espresso">직원을 불렀어요</h2>
      <p className="max-w-lg text-2xl leading-relaxed text-body">
        잠시만 기다려 주세요.
        <br />
        직원이 곧 도와드릴 거예요.
      </p>

      <button type="button" onClick={onBack} className="btn-primary bg-caramel text-white">
        처음으로 돌아가기
      </button>
    </motion.div>
  );
}
