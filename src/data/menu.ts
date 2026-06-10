/** 메뉴 항목 스키마 */
export interface MenuItem {
  id: string;
  name: string;
  base: '커피' | '비커피';
  temp: 'ice' | 'hot';
  sweetness: 0 | 1 | 2 | 3;
  desc: string;
  thumb: string;
  tags: string[];
}

/** 목업 메뉴 8종 */
export const MENUS: MenuItem[] = [
  {
    id: 'ice-americano',
    name: '아이스 아메리카노',
    base: '커피',
    temp: 'ice',
    sweetness: 0,
    desc: '시원한 검은 커피, 우유 없이 깔끔해요',
    thumb: '☕️',
    tags: ['커피', '쓴맛', '시원'],
  },
  {
    id: 'ice-latte',
    name: '아이스 라떼',
    base: '커피',
    temp: 'ice',
    sweetness: 1,
    desc: '우유가 들어간 시원한 커피, 부드러워요',
    thumb: '🥛',
    tags: ['커피', '우유', '부드러운', '시원'],
  },
  {
    id: 'ice-vanilla-latte',
    name: '아이스 바닐라라떼',
    base: '커피',
    temp: 'ice',
    sweetness: 3,
    desc: '달콤한 바닐라 시럽이 들어간 시원한 라떼',
    thumb: '🍦',
    tags: ['커피', '우유', '달콤', '시럽', '시원'],
  },
  {
    id: 'ice-mocha',
    name: '아이스 카페모카',
    base: '커피',
    temp: 'ice',
    sweetness: 3,
    desc: '초콜릿 맛이 나는 달콤한 시원한 커피',
    thumb: '🍫',
    tags: ['커피', '초콜릿', '달콤', '시원'],
  },
  {
    id: 'hot-americano',
    name: '따뜻한 아메리카노',
    base: '커피',
    temp: 'hot',
    sweetness: 0,
    desc: '따뜻한 검은 커피, 쓴맛이 진해요',
    thumb: '♨️',
    tags: ['커피', '쓴맛', '따뜻'],
  },
  {
    id: 'hot-latte',
    name: '따뜻한 라떼',
    base: '커피',
    temp: 'hot',
    sweetness: 1,
    desc: '따뜻한 우유 커피, 부드럽고 포근해요',
    thumb: '🫖',
    tags: ['커피', '우유', '부드러운', '따뜻'],
  },
  {
    id: 'grapefruit-ade',
    name: '자몽에이드',
    base: '비커피',
    temp: 'ice',
    sweetness: 2,
    desc: '상큼한 자몽 맛 시원한 음료, 커피 없어요',
    thumb: '🍊',
    tags: ['에이드', '상큼', '시원', '비커피'],
  },
  {
    id: 'ice-tea',
    name: '아이스티',
    base: '비커피',
    temp: 'ice',
    sweetness: 2,
    desc: '달콤한 복숭아 맛 시원한 차, 커피 없어요',
    thumb: '🍑',
    tags: ['차', '달콤', '시원', '비커피'],
  },
];

/** 대기 화면 프리셋 문구 */
export const PRESETS = [
  '시원하고 단 커피',
  '따뜻한 거',
  '안 쓴 커피',
  '달달한 음료',
] as const;

/** 발화에서 추출한 키워드 (화면 표시 + 매칭용) */
export interface ExtractedKeywords {
  display: string[];
  wantsIce: boolean;
  wantsHot: boolean;
  wantsSweet: boolean;
  wantsMild: boolean;
  wantsCoffee: boolean;
  wantsNonCoffee: boolean;
  tagHints: string[];
}

/** 발화 문자열에서 키워드 추출 (규칙 기반) */
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
    /달|단|달달|달콤|시럽|단거|단한/i.test(text);
  const wantsMild =
    /안쓴|안쓴맛|연한|부드러운|순한|쓴맛없/i.test(text);
  const wantsCoffee = /커피|카페|라떼|아메|모카|에스프레소/i.test(text);
  const wantsNonCoffee = /에이드|차|티|주스|음료|비커피/i.test(text);

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
    display.push('안 쓴/부드러운');
    tagHints.push('부드러운');
  }
  if (/초콜릿|모카|초코/i.test(text)) {
    display.push('초콜릿');
    tagHints.push('초콜릿');
  }
  if (/우유|라떼/i.test(text)) {
    display.push('우유');
    tagHints.push('우유');
  }
  if (wantsCoffee) display.push('커피');
  if (wantsNonCoffee) display.push('비커피 음료');

  if (display.length === 0) display.push('음료');

  return {
    display,
    wantsIce,
    wantsHot,
    wantsSweet,
    wantsMild,
    wantsCoffee,
    wantsNonCoffee,
    tagHints,
  };
}

const CANDIDATES_PER_ROUND = 3;

/** 규칙 기반 메뉴 매칭 — 상위 N개 반환 */
export function matchMenu(
  utterance: string,
  excludeIds: string[] = [],
  limit = CANDIDATES_PER_ROUND,
): MenuItem[] {
  const text = utterance.replace(/\s/g, '');
  const kw = extractKeywords(utterance);

  const scored = MENUS.filter((m) => !excludeIds.includes(m.id)).map((menu) => {
    let score = 0;

    // 온도
    if (kw.wantsIce && menu.temp === 'ice') score += 5;
    if (kw.wantsIce && menu.temp === 'hot') score -= 3;
    if (kw.wantsHot && menu.temp === 'hot') score += 5;
    if (kw.wantsHot && menu.temp === 'ice') score -= 3;

    // 단맛
    if (kw.wantsSweet) {
      score += menu.sweetness * 2;
      if (menu.sweetness >= 2) score += 2;
    }

    // 안 쓴 / 연한 → 단맛·우유 있는 메뉴 가점
    if (kw.wantsMild) {
      score += menu.sweetness * 1.5;
      if (menu.tags.includes('우유') || menu.tags.includes('부드러운')) score += 3;
      if (menu.sweetness === 0) score -= 2;
    }

    // 베이스
    if (kw.wantsCoffee && menu.base === '커피') score += 3;
    if (kw.wantsNonCoffee && menu.base === '비커피') score += 4;
    if (kw.wantsCoffee && menu.base === '비커피') score -= 2;

    // 태그 힌트
    for (const hint of kw.tagHints) {
      if (menu.tags.some((t) => t.includes(hint) || hint.includes(t))) {
        score += 2;
      }
    }

    // 메뉴명 직접 언급
    const menuName = menu.name.replace(/\s/g, '');
    if (text.includes(menuName) || utterance.includes(menu.name)) {
      score += 10;
    }

    // 발화에 태그 단어 포함
    for (const tag of menu.tags) {
      if (text.includes(tag) || utterance.includes(tag)) score += 2;
    }

    return { menu, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // 점수가 모두 낮아도 후보는 반드시 제시
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
