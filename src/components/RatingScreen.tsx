import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ScreenShell } from './ScreenShell';

interface RatingScreenProps {
  onSubmit: () => void;
}

/** 6) 평가 화면 */
export function RatingScreen({ onSubmit }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleStar = (n: number) => {
    setRating(n);
    setSubmitted(true);
    setTimeout(onSubmit, 2200);
  };

  return (
    <ScreenShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-2 text-center sm:gap-8"
      >
        <h2 className="text-2xl font-bold text-espresso sm:text-4xl">
          {submitted ? '감사합니다!' : '얼마나 비슷했나요?'}
        </h2>

        {!submitted ? (
          <>
            <p className="text-lg text-body sm:text-2xl">별을 눌러 주세요 (1~5)</p>
            <div className="grid w-full max-w-xs grid-cols-5 gap-2 sm:max-w-md sm:gap-4" role="group" aria-label="별점 선택">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleStar(n)}
                  className="flex aspect-square min-h-[56px] items-center justify-center rounded-xl border-2 border-line bg-card-light transition-colors active:border-amber active:bg-amber/10 sm:min-h-[72px] sm:rounded-2xl"
                  aria-label={`${n}점`}
                >
                  <Star className="h-8 w-8 text-amber sm:h-12 sm:w-12" aria-hidden />
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-10 w-10 sm:h-14 sm:w-14 ${
                    n <= rating ? 'fill-amber text-amber' : 'text-line'
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <p className="max-w-xs text-base leading-relaxed text-body sm:max-w-lg sm:text-2xl">
              그 매장에 맞게 더 똑똑해집니다.
              <br />
              다음에 또 만나요!
            </p>
          </>
        )}
      </motion.div>
    </ScreenShell>
  );
}
