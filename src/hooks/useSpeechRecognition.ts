import { useCallback, useEffect, useRef, useState } from 'react';

/** Web Speech API 지원 여부 확인 */
export function isSpeechRecognitionSupported(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

interface UseSpeechRecognitionOptions {
  onResult: (transcript: string) => void;
  onError?: () => void;
  /** 인식 종료됐지만 결과가 없을 때 (대기 화면 복귀용) */
  onEmpty?: () => void;
}

/**
 * Push-to-talk 음성 인식 훅
 * - 한국어(ko-KR) 고정
 * - 미지원/거부 시 에러 없이 폴백 가능하도록 설계
 */
export function useSpeechRecognition({
  onResult,
  onError,
  onEmpty,
}: UseSpeechRecognitionOptions) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  const onEmptyRef = useRef(onEmpty);
  const lastTranscriptRef = useRef('');
  const deliveredRef = useRef(false);

  onResultRef.current = onResult;
  onErrorRef.current = onError;
  onEmptyRef.current = onEmpty;

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) return;

    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      const combined = (final || interim).trim();
      if (combined) {
        lastTranscriptRef.current = combined;
        setInterimTranscript(combined);
      }

      if (final) {
        deliveredRef.current = true;
        onResultRef.current(final.trim());
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      onErrorRef.current?.();
    };

    recognition.onend = () => {
      setIsListening(false);

      // final 미수신이어도 interim 결과가 있으면 사용
      if (!deliveredRef.current && lastTranscriptRef.current) {
        deliveredRef.current = true;
        onResultRef.current(lastTranscriptRef.current);
      } else if (!deliveredRef.current) {
        onEmptyRef.current?.();
      }

      lastTranscriptRef.current = '';
      deliveredRef.current = false;
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      onErrorRef.current?.();
      return false;
    }

    setInterimTranscript('');
    setIsListening(true);
    lastTranscriptRef.current = '';
    deliveredRef.current = false;

    try {
      recognitionRef.current.abort();
      recognitionRef.current.start();
      return true;
    } catch {
      setIsListening(false);
      onErrorRef.current?.();
      return false;
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      /* 이미 종료된 경우 무시 */
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    interimTranscript,
    startListening,
    stopListening,
    supported: isSpeechRecognitionSupported(),
  };
}
