import { BRAND } from './brand';

/** 메뉴 항목 스키마 — 공차 브랜드별 데이터 레이어 목업 */
export interface MenuItem {
  id: string;
  name: string;
  /** 공차 카테고리 (음성 매칭·설명용) */
  category: '밀크티' | '차' | '스무디';
  base: '커피' | '비커피';
  temp: 'ice' | 'hot';
  sweetness: 0 | 1 | 2 | 3;
  desc: string;
  thumb: string;
  tags: string[];
}

/** 공차 대표 메뉴 10종 — 실제 메뉴명·맛 프로필 기반 목업 */
export const MENUS: MenuItem[] = [
  {
    id: 'ice-gongcha-milk-tea',
    name: '아이스 고봉밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'ice',
    sweetness: 3,
    desc: '공차 대표 달콤한 밀크티, 펄(쫄깃한 알갱이) 추가 가능',
    thumb: '🧋',
    tags: ['밀크티', '달콤', '시원', '펄', '대표'],
  },
  {
    id: 'ice-black-sugar',
    name: '아이스 흑당 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'ice',
    sweetness: 3,
    desc: '흑당 시럽이 들어간 진한 달콤함, 시원한 밀크티',
    thumb: '🟤',
    tags: ['밀크티', '흑당', '달콤', '시원', '펄'],
  },
  {
    id: 'ice-taro',
    name: '아이스 타로 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'ice',
    sweetness: 3,
    desc: '타로(보라색 고구마) 맛, 부드럽고 달달한 시원한 밀크티',
    thumb: '💜',
    tags: ['밀크티', '타로', '달콤', '부드러운', '시원'],
  },
  {
    id: 'ice-earl-grey',
    name: '아이스 얼그레이 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'ice',
    sweetness: 2,
    desc: '홍차 향의 밀크티, 고봉보다 덜 달고 은은해요',
    thumb: '🍊',
    tags: ['밀크티', '홍차', '얼그레이', '부드러운', '시원'],
  },
  {
    id: 'ice-matcha',
    name: '아이스 말차 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'ice',
    sweetness: 2,
    desc: '녹차(말차) 맛 밀크티, 고소하고 산뜻해요',
    thumb: '🍵',
    tags: ['밀크티', '말차', '녹차', '시원'],
  },
  {
    id: 'hot-gongcha-milk-tea',
    name: '따뜻한 고봉밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'hot',
    sweetness: 3,
    desc: '따뜻한 달콤한 밀크티, 겨울에 인기 많아요',
    thumb: '♨️',
    tags: ['밀크티', '달콤', '따뜻', '펄'],
  },
  {
    id: 'hot-taro',
    name: '따뜻한 타로 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'hot',
    sweetness: 3,
    desc: '따뜻한 타로 맛, 포근하고 달달해요',
    thumb: '🫖',
    tags: ['밀크티', '타로', '달콤', '따뜻', '부드러운'],
  },
  {
    id: 'hot-earl-grey',
    name: '따뜻한 얼그레이 밀크티',
    category: '밀크티',
    base: '비커피',
    temp: 'hot',
    sweetness: 2,
    desc: '따뜻한 홍차 향 밀크티, 고봉보다 덜 달아요',
    thumb: '🍊',
    tags: ['밀크티', '홍차', '얼그레이', '부드러운', '따뜻'],
  },
  {
    id: 'ice-passion-green-tea',
    name: '아이스 패션후르츠 그린티',
    category: '차',
    base: '비커피',
    temp: 'ice',
    sweetness: 2,
    desc: '상큼한 패션후르츠 + 녹차, 밀크티보다 가벼워요',
    thumb: '🍹',
    tags: ['차', '녹차', '과일', '상큼', '시원'],
  },
  {
    id: 'ice-lemon-tea',
    name: '아이스 레몬 홍차',
    category: '차',
    base: '비커피',
    temp: 'ice',
    sweetness: 1,
    desc: '레몬이 들어간 홍차, 달지 않고 깔끔해요',
    thumb: '🍋',
    tags: ['차', '홍차', '레몬', '상큼', '시원'],
  },
  {
    id: 'ice-strawberry-smoothie',
    name: '아이스 딸기 스무디',
    category: '스무디',
    base: '비커피',
    temp: 'ice',
    sweetness: 3,
    desc: '딸기 과육 스무디, 커피·차 없이 달달해요',
    thumb: '🍓',
    tags: ['스무디', '과일', '달콤', '시원'],
  },
];

/** 대기 화면 프리셋 — brand.ts와 동기화 */
export const PRESETS = BRAND.presets;

/** 발화에서 추출한 키워드 (화면 표시 + 매칭용) */
export interface ExtractedKeywords {
  display: string[];
  wantsIce: boolean;
  wantsHot: boolean;
  wantsSweet: boolean;
  wantsMild: boolean;
  wantsCoffee: boolean;
  wantsNonCoffee: boolean;
  wantsMilkTea: boolean;
  wantsTaro: boolean;
  wantsMatcha: boolean;
  tagHints: string[];
}

/** 발화 문자열에서 키워드 추출 — 공차 메뉴·옵션 언어 반영 */
export function extractKeywords(utterance: string): ExtractedKeywords {
  const text = utterance.replace(/\s/g, '');

  const display: string[] = [];
  const tagHints: string[] = [];

  const wantsIce =
    /시원|차가운|차갑|아이스|콜드|ice/i.test(text) ||
    utterance.includes('시원');
  const wantsHot =
    /따뜻|뜨거운|뜨거|따듯|핫|hot|따뜻한/i.test(text) ||
    utterance.includes('따뜻');
  const wantsSweet =
    /달|단|달달|달콤|시럽|단거|단한|고봉/i.test(text);
  const wantsMild =
    /안쓴|안쓴맛|연한|부드러운|순한|덜달|안달/i.test(text);
  const wantsCoffee = /커피|카페|라떼|아메|모카|에스프레소/i.test(text);
  const wantsNonCoffee =
    /밀크티|차|티|스무디|에이드|주스|음료|비커피|공cha|공차/i.test(text);
  const wantsMilkTea = /밀크티|밀크|고봉|흑당|타로|펄|타피오카|버블/i.test(text);
  const wantsTaro = /타로|taro|보라/i.test(text);
  const wantsMatcha = /말차|녹차|그린티/i.test(text);

  if (wantsIce) {
    display.push('시원한');
    tagHints.push('시원');
  }
  if (wantsHot) {
    display.push('따뜻한');
    tagHints.push('따뜻');
  }
  if (wantsSweet) {
    display.push('달콤한');
    tagHints.push('달콤');
  }
  if (wantsMild) {
    display.push('덜 단/부드러운');
    tagHints.push('부드러운');
  }
  if (wantsMilkTea) {
    display.push('밀크티');
    tagHints.push('밀크티');
  }
  if (wantsTaro) {
    display.push('타로');
    tagHints.push('타로');
  }
  if (/흑당|브라운슈가|brown/i.test(text)) {
    display.push('흑당');
    tagHints.push('흑당');
  }
  if (wantsMatcha) {
    display.push('말차');
    tagHints.push('말차');
  }
  if (/얼그레이|홍차|earl/i.test(text)) {
    display.push('홍차');
    tagHints.push('홍차');
  }
  if (/패션|과일|상큼/i.test(text)) {
    display.push('과일·상큼');
    tagHints.push('과일');
  }
  if (/펄|타피오카|쫄깃|알갱이/i.test(text)) {
    display.push('펄(쫄깃)');
    tagHints.push('펄');
  }
  if (wantsCoffee) display.push('커피');
  if (wantsNonCoffee && !wantsMilkTea) display.push('차·음료');

  if (display.length === 0) display.push('음료');

  return {
    display,
    wantsIce,
    wantsHot,
    wantsSweet,
    wantsMild,
    wantsCoffee,
    wantsNonCoffee,
    wantsMilkTea,
    wantsTaro,
    wantsMatcha,
    tagHints,
  };
}

const CANDIDATES_PER_ROUND = 3;

/** 규칙 기반 메뉴 매칭 — 공차 메뉴 풀에서 상위 N개 반환 */
export function matchMenu(
  utterance: string,
  excludeIds: string[] = [],
  limit = CANDIDATES_PER_ROUND,
): MenuItem[] {
  const text = utterance.replace(/\s/g, '');
  const kw = extractKeywords(utterance);

  const scored = MENUS.filter((m) => !excludeIds.includes(m.id)).map((menu) => {
    let score = 0;

    // 온도 — 한쪽만 요청하면 반대 온도 강하게 감점
    if (kw.wantsIce && menu.temp === 'ice') score += 5;
    if (kw.wantsHot && menu.temp === 'hot') score += 5;
    if (kw.wantsHot && !kw.wantsIce && menu.temp === 'ice') score -= 8;
    if (kw.wantsIce && !kw.wantsHot && menu.temp === 'hot') score -= 8;

    // 단맛
    if (kw.wantsSweet) {
      score += menu.sweetness * 2;
      if (menu.sweetness >= 2) score += 2;
      if (menu.tags.includes('대표')) score += 1;
    }

    // 덜 단 / 연한
    if (kw.wantsMild) {
      score += menu.sweetness <= 2 ? 3 : -1;
      if (menu.tags.includes('부드러운') || menu.tags.includes('홍차')) score += 2;
      if (menu.sweetness === 3) score -= 1;
    }

    // 밀크티·타로·말cha 등 공차 특화
    if (kw.wantsMilkTea && menu.category === '밀크티') score += 5;
    if (kw.wantsTaro && menu.tags.includes('타로')) score += 8;
    if (kw.wantsMatcha && menu.tags.includes('말차')) score += 8;
    if (/흑당|브라운/i.test(text) && menu.tags.includes('흑당')) score += 8;

    // 커피 요청은 공차에서 비커피로 유도 (데모 맥락)
    if (kw.wantsCoffee && menu.base === '커피') score += 3;
    if (kw.wantsNonCoffee && menu.base === '비커피') score += 2;

    // 스무디·과일
    if (/스무디|딸기|과일/i.test(text) && menu.category === '스무디') score += 6;
    if (/상큼|레몬|패션/i.test(text) && menu.category === '차') score += 4;

    // 태그 힌트
    for (const hint of kw.tagHints) {
      if (menu.tags.some((t) => t.includes(hint) || hint.includes(t))) {
        score += 2;
      }
    }

    // 메뉴명·별칭 직접 언급
    const menuName = menu.name.replace(/\s/g, '');
    if (text.includes(menuName) || utterance.includes(menu.name)) {
      score += 10;
    }
    if (/고봉|공cha|공차/i.test(text) && menu.id.includes('gongcha')) score += 6;

    for (const tag of menu.tags) {
      if (text.includes(tag) || utterance.includes(tag)) score += 2;
    }

    return { menu, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const pool =
    scored[0]?.score > 0
      ? scored
      : MENUS.filter((m) => !excludeIds.includes(m.id)).map((menu) => ({
          menu,
          score: 0,
        }));

  return pool.slice(0, limit).map((s) => s.menu);
}

/** ID로 메뉴 조회 */
export function getMenuById(id: string): MenuItem | undefined {
  return MENUS.find((m) => m.id === id);
}
