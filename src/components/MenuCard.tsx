import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';

interface MenuCardProps {
  menu: MenuItem;
  onSelect: () => void;
  index?: number;
}

/** 후보 메뉴 카드 — 이미지(이모지) + 쉬운 설명 + [이거예요] */
export function MenuCard({ menu, onSelect, index = 0 }: MenuCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      className="flex flex-col overflow-hidden rounded-3xl border-2 border-line bg-card-light shadow-lg"
    >
      {/* 이모지 썸네일 — 외부 이미지 없이 로컬 표시 */}
      <div
        className="flex h-40 items-center justify-center bg-card text-7xl"
        aria-hidden
      >
        {menu.thumb}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-2xl font-bold text-espresso">{menu.name}</h3>
        <p className="flex-1 text-xl leading-relaxed text-body">{menu.desc}</p>

        <button
          type="button"
          onClick={onSelect}
          className="btn-primary w-full bg-teal text-white hover:bg-teal/90"
        >
          이거예요
        </button>
      </div>
    </motion.article>
  );
}
