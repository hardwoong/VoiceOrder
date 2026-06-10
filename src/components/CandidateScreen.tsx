import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';
import { MenuCard } from './MenuCard';

interface CandidateScreenProps {
  utterance: string;
  keywords: string[];
  candidates: MenuItem[];
  round: number;
  onSelect: (menu: MenuItem) => void;
  onRetry: () => void;
  onRejectRound: () => void;
  onCallStaff: () => void;
  speak: (text: string) => void;
}

/**
 * 3) 후보 제시 화면 (핵심)
 * - 상위 2~3개 메뉴 카드 동시 표시
 * - 진입 시 TTS로 질문 읽기
 */
export function CandidateScreen({
  utterance,
  keywords,
  candidates,
  round,
  onSelect,
  onRetry,
  onRejectRound,
  onCallStaff,
  speak,
}: CandidateScreenProps) {
  useEffect(() => {
    const names = candidates.map((m) => m.name).join(', ');
    speak(`이 음료 맞으세요? ${names}`);
  }, [candidates, speak]);

  return (
    <div className="relative flex h-full flex-col px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl text-body/70">
            &ldquo;{utterance}&rdquo; 에서 찾았어요
            {round > 1 && ` (${round}번째 후보)`}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-teal/10 px-4 py-1 text-lg font-medium text-teal"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <CallStaffButton onClick={onCallStaff} />
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-center text-3xl font-bold text-espresso"
      >
        이 음료 맞으세요?
      </motion.h2>

      <div
        className={`mt-6 grid flex-1 gap-5 ${
          candidates.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'
        }`}
      >
        {candidates.map((menu, i) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            index={i}
            onSelect={() => onSelect(menu)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={onRetry} className="btn-secondary min-w-[220px]">
          다시 말할게요
        </button>
        <button
          type="button"
          onClick={onRejectRound}
          className="btn-secondary min-w-[220px] border-caramel/40 text-caramel"
        >
          다 아니에요
        </button>
      </div>
    </div>
  );
}
