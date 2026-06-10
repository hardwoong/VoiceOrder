import { useCallback, useEffect, useRef } from 'react';

/** TTS로 한국어 문장 읽기 */
export function useSpeechSynthesis() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [cancel],
  );

  useEffect(() => cancel, [cancel]);

  return { speak, cancel };
}
