import { useCallback, useEffect, useReducer, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CandidateScreen } from './components/CandidateScreen';
import { ConfirmScreen } from './components/ConfirmScreen';
import { DoneScreen } from './components/DoneScreen';
import { IdleScreen } from './components/IdleScreen';
import { ListeningScreen } from './components/ListeningScreen';
import { RatingScreen } from './components/RatingScreen';
import { StaffScreen } from './components/StaffScreen';
import { extractKeywords } from './data/menu';
import {
  isSpeechRecognitionSupported,
  useSpeechRecognition,
} from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import {
  getLastOrderId,
  initialState,
  orderReducer,
} from './state/orderMachine';

/**
 * 보이스 오더 메인 앱
 * - useReducer로 화면 상태 머신 관리
 * - 음성 실패 시 프리셋 버튼으로 데모 완주 가능
 */
function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const [hasLastOrder, setHasLastOrder] = useState(!!getLastOrderId());
  const { speak, cancel } = useSpeechSynthesis();

  // 마운트 시 음성 API 지원 여부 확인
  useEffect(() => {
    dispatch({
      type: 'SET_SPEECH_SUPPORTED',
      supported: isSpeechRecognitionSupported(),
    });
    setHasLastOrder(!!getLastOrderId());
  }, []);

  const handleSpeechResult = useCallback((transcript: string) => {
    const text = transcript.trim() || '음료';
    dispatch({ type: 'FINISH_LISTENING', utterance: text });
  }, []);

  const handleSpeechError = useCallback(() => {
    // 인식 실패해도 대기 화면으로 — 프리셋 사용 유도
    dispatch({ type: 'RETRY_SPEAK' });
  }, []);

  const handleSpeechEmpty = useCallback(() => {
    dispatch({ type: 'RETRY_SPEAK' });
  }, []);

  const { isListening, interimTranscript, startListening, stopListening } =
    useSpeechRecognition({
      onResult: handleSpeechResult,
      onError: handleSpeechError,
      onEmpty: handleSpeechEmpty,
    });

  const handleStartTalk = () => {
    cancel();
    dispatch({ type: 'START_LISTENING' });
    startListening();
  };

  const handleStopTalk = () => {
    stopListening();
  };

  // listening 화면에서 interim 키워드 실시간 표시
  const listeningKeywords =
    state.screen === 'listening' && interimTranscript
      ? extractKeywords(interimTranscript).display
      : [];

  const screenKey = state.screen;

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div
          key={screenKey}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="min-h-dvh"
        >
          {state.screen === 'idle' && (
            <IdleScreen
              speechSupported={state.speechSupported}
              hasLastOrder={hasLastOrder}
              isListening={isListening}
              onStartTalk={handleStartTalk}
              onStopTalk={handleStopTalk}
              onPreset={(text) => dispatch({ type: 'USE_PRESET', utterance: text })}
              onReorder={() => dispatch({ type: 'REORDER_LAST' })}
              onCallStaff={() => dispatch({ type: 'CALL_STAFF' })}
            />
          )}

          {state.screen === 'listening' && (
            <ListeningScreen
              interimTranscript={interimTranscript}
              keywords={listeningKeywords}
              onCallStaff={() => dispatch({ type: 'CALL_STAFF' })}
            />
          )}

          {state.screen === 'candidates' && (
            <CandidateScreen
              utterance={state.utterance}
              keywords={state.keywords}
              candidates={state.candidates}
              round={state.candidateRound}
              speak={speak}
              onSelect={(menu) => dispatch({ type: 'SELECT_MENU', menu })}
              onRetry={() => {
                cancel();
                dispatch({ type: 'RETRY_SPEAK' });
              }}
              onRejectRound={() => dispatch({ type: 'REJECT_ROUND' })}
              onCallStaff={() => dispatch({ type: 'CALL_STAFF' })}
            />
          )}

          {state.screen === 'confirm' && state.selectedMenu && (
            <ConfirmScreen
              menu={state.selectedMenu}
              onConfirm={() => dispatch({ type: 'CONFIRM_ORDER' })}
              onBack={() => dispatch({ type: 'RETRY_SPEAK' })}
              onCallStaff={() => dispatch({ type: 'CALL_STAFF' })}
            />
          )}

          {state.screen === 'done' && (
            <DoneScreen
              orderNumber={state.orderNumber}
              onRate={() => dispatch({ type: 'GO_RATING' })}
            />
          )}

          {state.screen === 'rating' && (
            <RatingScreen
              onSubmit={() => {
                dispatch({ type: 'SUBMIT_RATING' });
                setHasLastOrder(!!getLastOrderId());
              }}
            />
          )}

          {state.screen === 'staff' && (
            <StaffScreen
              onBack={() => {
                cancel();
                dispatch({ type: 'RESET' });
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
