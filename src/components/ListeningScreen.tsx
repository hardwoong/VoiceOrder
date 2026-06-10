import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { CallStaffButton } from './CallStaffButton';

interface ListeningScreenProps {
  interimTranscript: string;
  keywords: string[];
  onCallStaff: () => void;
}

/**
 * 2) 듣는 중 화면
 * - 마이크 애니메이션 + 인식 중 텍스트/키워드 표시
 */
export function ListeningScreen({
  interimTranscript,
  keywords,
  onCallStaff,
}: ListeningScreenProps) {
  return (
    <div className="relative flex h-full flex-col px-6 py-8">
      <div className="flex justify-end">
        <CallStaffButton onClick={onCallStaff} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="flex h-36 w-36 items-center justify-center rounded-full bg-teal/15"
        >
          <Mic className="h-16 w-16 text-teal" aria-hidden />
        </motion.div>

        <h2 className="text-4xl font-bold text-espresso">말씀하세요</h2>

        {interimTranscript && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl rounded-2xl bg-card px-8 py-4 text-2xl text-body"
          >
            &ldquo;{interimTranscript}&rdquo;
          </motion.p>
        )}

        {keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-amber/20 px-5 py-2 text-xl font-semibold text-caramel"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
