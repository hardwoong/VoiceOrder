import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';
import { MenuCard } from './MenuCard';
import { ScreenBody, ScreenShell } from './ScreenShell';

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

/** 3) 후보 제시 — 모바일 1열 스크롤 / 태블릿+ 2~3열 */
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
    <ScreenShell scrollBody className="gap-3 pb-4">
      <header className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="break-words text-sm text-body/70 sm:text-lg">
            &ldquo;{utterance}&rdquo; 에서 찾았어요
            {round > 1 && ` (${round}번째 후보)`}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2 sm:gap-2">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-teal/10 px-2.5 py-0.5 text-sm font-medium text-teal sm:px-4 sm:py-1 sm:text-base"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <CallStaffButton onClick={onCallStaff} />
      </header>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="shrink-0 text-center text-xl font-bold text-espresso sm:text-3xl"
      >
        이 음료 맞으세요?
      </motion.h2>

      <ScreenBody className="py-1">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {candidates.map((menu, i) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              index={i}
              onSelect={() => onSelect(menu)}
            />
          ))}
        </div>
      </ScreenBody>

      <footer className="flex shrink-0 flex-col gap-2 pt-2 sm:flex-row sm:justify-center sm:gap-4">
        <button type="button" onClick={onRetry} className="btn-secondary w-full sm:w-auto sm:min-w-[200px]">
          다시 말할게요
        </button>
        <button
          type="button"
          onClick={onRejectRound}
          className="btn-secondary w-full border-caramel/40 text-caramel sm:w-auto sm:min-w-[200px]"
        >
          다 아니에요
        </button>
      </footer>
    </ScreenShell>
  );
}
