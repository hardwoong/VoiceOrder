import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { CallStaffButton } from './CallStaffButton';
import { ScreenShell } from './ScreenShell';

interface ListeningScreenProps {
  interimTranscript: string;
  keywords: string[];
  onCallStaff: () => void;
}

/** 2) 듣는 중 화면 */
export function ListeningScreen({
  interimTranscript,
  keywords,
  onCallStaff,
}: ListeningScreenProps) {
  return (
    <ScreenShell className="gap-4">
      <div className="flex shrink-0 justify-end">
        <CallStaffButton onClick={onCallStaff} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-teal/15 sm:h-36 sm:w-36"
        >
          <Mic className="h-12 w-12 text-teal sm:h-16 sm:w-16" aria-hidden />
        </motion.div>

        <h2 className="text-2xl font-bold text-espresso sm:text-4xl">말씀하세요</h2>

        {interimTranscript && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-sm break-words rounded-2xl bg-card px-4 py-3 text-lg text-body sm:max-w-xl sm:px-8 sm:py-4 sm:text-2xl"
          >
            &ldquo;{interimTranscript}&rdquo;
          </motion.p>
        )}

        {keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold text-caramel sm:px-5 sm:py-2 sm:text-lg"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </ScreenShell>
  );
}
