/** 공차 매장 목업 — Voice Order 데모용 브랜드 설정 */
export const BRAND = {
  id: 'gongcha',
  name: '공차',
  nameEn: 'GONG cha',
  tagline: '원하는 맛을 말씀해 주세요',
  /** 발표 대본·슬라이드와 맞춘 데모 프리셋 */
  presets: [
    '시원하고 단 밀크티',
    '타로 맛 음료',
    '따뜻한 밀크티',
    '달달한 음료',
  ] as const,
} as const;

export type PresetUtterance = (typeof BRAND.presets)[number];
