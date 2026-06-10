import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingScreenProps {
  onSubmit: () => void;
}

/** 6) 평가 화면 — 별 1~5 터치 (목업) */
export function RatingScreen({ onSubmit }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleStar = (n: number) => {
    setRating(n);
    setSubmitted(true);
    setTimeout(onSubmit, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center"
    >
      <h2 className="text-4xl font-bold text-espresso">
        {submitted ? '감사합니다!' : '얼마나 비슷했나요?'}
      </h2>

      {!submitted ? (
        <>
          <p className="text-2xl text-body">별을 눌러 주세요 (1~5)</p>
          <div className="flex gap-4" role="group" aria-label="별점 선택">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleStar(n)}
                className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-line bg-card-light transition-colors hover:border-amber hover:bg-amber/10"
                aria-label={`${n}점`}
              >
                <Star className="h-12 w-12 text-amber" aria-hidden />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`h-14 w-14 ${
                  n <= rating ? 'fill-amber text-amber' : 'text-line'
                }`}
                aria-hidden
              />
            ))}
          </div>
          <p className="max-w-lg text-2xl leading-relaxed text-body">
            그 매장에 맞게 더 똑똑해집니다.
            <br />
            다음에 또 만나요!
          </p>
        </>
      )}
    </motion.div>
  );
}
