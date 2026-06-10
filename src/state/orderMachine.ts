import {
  extractKeywords,
  getMenuById,
  matchMenu,
  type MenuItem,
} from '../data/menu';

/** 화면 단계 — 한 화면에 한 결정 */
export type Screen =
  | 'idle'
  | 'listening'
  | 'candidates'
  | 'confirm'
  | 'done'
  | 'rating'
  | 'staff';

export interface AppState {
  screen: Screen;
  /** 사용자 발화 원문 */
  utterance: string;
  /** 화면에 보여줄 추출 키워드 */
  keywords: string[];
  /** 현재 라운드 후보 메뉴 */
  candidates: MenuItem[];
  /** 후보 제시 라운드 (1~3) */
  candidateRound: number;
  /** 이미 보여준 메뉴 ID (다음 라운드 제외용) */
  shownMenuIds: string[];
  /** 사용자가 고른 메뉴 */
  selectedMenu: MenuItem | null;
  /** 주문 번호 */
  orderNumber: string;
  /** Web Speech API 사용 가능 여부 */
  speechSupported: boolean;
}

export type AppAction =
  | { type: 'SET_SPEECH_SUPPORTED'; supported: boolean }
  | { type: 'START_LISTENING' }
  | { type: 'FINISH_LISTENING'; utterance: string }
  | { type: 'USE_PRESET'; utterance: string }
  | { type: 'SELECT_MENU'; menu: MenuItem }
  | { type: 'REJECT_ROUND' }
  | { type: 'RETRY_SPEAK' }
  | { type: 'CALL_STAFF' }
  | { type: 'CONFIRM_ORDER' }
  | { type: 'GO_RATING' }
  | { type: 'SUBMIT_RATING' }
  | { type: 'RESET' }
  | { type: 'REORDER_LAST' };

const MAX_ROUNDS = 3;
const LAST_ORDER_KEY = 'voice-order-last';

export const initialState: AppState = {
  screen: 'idle',
  utterance: '',
  keywords: [],
  candidates: [],
  candidateRound: 0,
  shownMenuIds: [],
  selectedMenu: null,
  orderNumber: '',
  speechSupported: false,
};

/** 주문 번호 생성 (예: A-07) */
function generateOrderNumber(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 3));
  const num = String(Math.floor(Math.random() * 20) + 1).padStart(2, '0');
  return `${letter}-${num}`;
}

/** 발화로 후보 화면 진입 */
function enterCandidates(
  state: AppState,
  utterance: string,
  round: number,
  excludeIds: string[],
): AppState {
  const kw = extractKeywords(utterance);
  const candidates = matchMenu(utterance, excludeIds);
  const shownMenuIds = [...excludeIds, ...candidates.map((m) => m.id)];

  return {
    ...state,
    screen: 'candidates',
    utterance,
    keywords: kw.display,
    candidates,
    candidateRound: round,
    shownMenuIds,
    selectedMenu: null,
  };
}

/** 지난 주문 localStorage 저장/조회 */
export function saveLastOrder(menuId: string): void {
  try {
    localStorage.setItem(LAST_ORDER_KEY, menuId);
  } catch {
    /* 오프라인/시크릿 모드 폴백 */
  }
}

export function getLastOrderId(): string | null {
  try {
    return localStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
}

/** 단일 화면 상태 머신 리듀서 */
export function orderReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SPEECH_SUPPORTED':
      return { ...state, speechSupported: action.supported };

    case 'START_LISTENING':
      return { ...state, screen: 'listening', utterance: '', keywords: [] };

    case 'FINISH_LISTENING':
    case 'USE_PRESET': {
      const utterance = action.utterance.trim() || '음료';
      return enterCandidates(state, utterance, 1, []);
    }

    case 'SELECT_MENU':
      return {
        ...state,
        screen: 'confirm',
        selectedMenu: action.menu,
      };

    case 'REJECT_ROUND': {
      const nextRound = state.candidateRound + 1;
      if (nextRound > MAX_ROUNDS) {
        return { ...state, screen: 'staff' };
      }
      return enterCandidates(
        state,
        state.utterance,
        nextRound,
        state.shownMenuIds,
      );
    }

    case 'RETRY_SPEAK':
      return {
        ...state,
        screen: 'idle',
        utterance: '',
        keywords: [],
        candidates: [],
        candidateRound: 0,
        shownMenuIds: [],
        selectedMenu: null,
      };

    case 'CALL_STAFF':
      return { ...state, screen: 'staff' };

    case 'CONFIRM_ORDER': {
      const orderNumber = generateOrderNumber();
      if (state.selectedMenu) saveLastOrder(state.selectedMenu.id);
      return {
        ...state,
        screen: 'done',
        orderNumber,
      };
    }

    case 'GO_RATING':
      return { ...state, screen: 'rating' };

    case 'SUBMIT_RATING':
      return { ...initialState, speechSupported: state.speechSupported };

    case 'RESET':
      return { ...initialState, speechSupported: state.speechSupported };

    case 'REORDER_LAST': {
      const lastId = getLastOrderId();
      const menu = lastId ? getMenuById(lastId) : undefined;
      if (!menu) return state;
      return {
        ...state,
        screen: 'confirm',
        selectedMenu: menu,
        utterance: '지난번 그 음료',
        keywords: ['단골 재주문'],
      };
    }

    default:
      return state;
  }
}
