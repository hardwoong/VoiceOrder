import { motion } from 'framer-motion';
import { History, Mic } from 'lucide-react';
import { BRAND } from '../data/brand';
import { PRESETS } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';
import { ScreenShell } from './ScreenShell';

interface IdleScreenProps {
  speechSupported: boolean;
  hasLastOrder: boolean;
  onStartTalk: () => void;
  onStopTalk: () => void;
  isListening: boolean;
  onPreset: (text: string) => void;
  onReorder: () => void;
  onCallStaff: () => void;
}

/** 1) 대기 화면 — 모바일(QR) 퍼스트 */
export function IdleScreen({
  speechSupported,
  hasLastOrder,
  onStartTalk,
  onStopTalk,
  isListening,
  onPreset,
  onReorder,
  onCallStaff,
}: IdleScreenProps) {
  const handleTalkDown = () => {
    if (speechSupported) onStartTalk();
  };

  const handleTalkUp = () => {
    if (speechSupported && isListening) onStopTalk();
  };

  return (
    <ScreenShell className="gap-4 pb-6">
      {/* 상단: 브랜드 + 액션 — 모바일에서 세로 스택 */}
      <header className="flex shrink-0 flex-col gap-3">
        <div className="rounded-xl bg-gongcha/10 px-3 py-2">
          <p className="text-xs font-semibold text-gongcha sm:text-sm">{BRAND.nameEn}</p>
          <p className="text-base font-bold text-espresso sm:text-lg">
            {BRAND.name} × Voice Order
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {hasLastOrder && (
            <button
              type="button"
              onClick={onReorder}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border-2 border-amber/40 bg-amber/10 px-3 text-sm font-semibold text-espresso sm:gap-2 sm:px-4 sm:text-base"
            >
              <History className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              지난번 그 음료
            </button>
          )}
          <CallStaffButton onClick={onCallStaff} />
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-2 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-5xl sm:text-6xl" aria-hidden>
            🧋
          </p>
          <h1 className="mt-2 text-2xl font-bold text-espresso sm:text-4xl">말하고 주문하기</h1>
          <p className="mt-2 text-lg text-body sm:mt-3 sm:text-2xl">{BRAND.tagline}</p>
        </motion.div>

        <motion.button
          type="button"
          className={`flex w-full max-w-sm min-h-[100px] flex-col items-center justify-center gap-2 rounded-3xl px-6 text-xl font-bold text-white shadow-xl transition-transform active:scale-[0.97] sm:min-h-[120px] sm:text-3xl ${
            isListening ? 'bg-teal ring-4 ring-teal/30' : 'bg-gongcha'
          }`}
          onMouseDown={handleTalkDown}
          onMouseUp={handleTalkUp}
          onMouseLeave={handleTalkUp}
          onTouchStart={(e) => {
            e.preventDefault();
            handleTalkDown();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTalkUp();
          }}
          aria-label="말하고 주문하기"
        >
          <Mic className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden />
          {isListening ? '말씀하세요…' : '🎙 말하고 주문하기'}
        </motion.button>

        {!speechSupported && (
          <p className="w-full rounded-xl bg-card px-4 py-3 text-center text-base text-body sm:text-xl">
            이 기기에서는 음성 대신 아래 버튼을 눌러 주세요
          </p>
        )}

        <div className="w-full">
          <p className="mb-3 text-center text-base text-body/80 sm:mb-4 sm:text-xl">
            {BRAND.name}에서 이렇게 말씀해 보세요
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onPreset(preset)}
                className="btn-secondary bg-card-light text-espresso hover:border-gongcha/50"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
