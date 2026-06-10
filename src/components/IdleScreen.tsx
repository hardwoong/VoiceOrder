import { motion } from 'framer-motion';
import { History, Mic } from 'lucide-react';
import { BRAND } from '../data/brand';
import { PRESETS } from '../data/menu';
import { CallStaffButton } from './CallStaffButton';

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

/**
 * 1) 대기 화면 — 공차 × Voice Order
 * - Push-to-talk 큰 버튼
 * - 프리셋 문구 (음성 폴백)
 * - 지난번 재주문 / 직원 호출
 */
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
    <div className="relative flex h-full flex-col px-6 py-8">
      {/* 상단: 브랜드 + 유틸 */}
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-xl bg-gongcha/10 px-4 py-2">
          <p className="text-sm font-semibold text-gongcha">{BRAND.nameEn}</p>
          <p className="text-lg font-bold text-espresso">{BRAND.name} × Voice Order</p>
        </div>
        <div className="flex items-center gap-3">
          {hasLastOrder && (
            <button
              type="button"
              onClick={onReorder}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-amber/40 bg-amber/10 px-4 text-lg font-semibold text-espresso"
            >
              <History className="h-5 w-5" aria-hidden />
              지난번 그 음료
            </button>
          )}
          <CallStaffButton onClick={onCallStaff} />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-6xl" aria-hidden>
            🧋
          </p>
          <h1 className="mt-2 text-4xl font-bold text-espresso">말하고 주문하기</h1>
          <p className="mt-3 text-2xl text-body">{BRAND.tagline}</p>
        </motion.div>

        <motion.button
          type="button"
          className={`flex min-h-[120px] min-w-[320px] flex-col items-center justify-center gap-3 rounded-3xl px-10 text-3xl font-bold text-white shadow-xl transition-transform active:scale-[0.97] ${
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
          <Mic className="h-12 w-12" aria-hidden />
          {isListening ? '말씀하세요…' : '🎙 말하고 주문하기'}
        </motion.button>

        {!speechSupported && (
          <p className="rounded-xl bg-card px-6 py-3 text-xl text-body">
            이 기기에서는 음성 대신 아래 버튼을 눌러 주세요
          </p>
        )}

        <div className="w-full max-w-2xl">
          <p className="mb-4 text-center text-xl text-body/80">
            {BRAND.name}에서 이렇게 말씀해 보세요
          </p>
          <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
