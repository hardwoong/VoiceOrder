import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';

interface MenuCardProps {
  menu: MenuItem;
  onSelect: () => void;
  index?: number;
}

/** 후보 메뉴 카드 — 모바일: 가로 compact / sm+: 세로 카드 */
export function MenuCard({ menu, onSelect, index = 0 }: MenuCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="flex flex-row overflow-hidden rounded-2xl border-2 border-line bg-card-light shadow-md sm:flex-col sm:rounded-3xl sm:shadow-lg"
    >
      <div
        className="flex w-[88px] shrink-0 items-center justify-center bg-card text-4xl sm:h-36 sm:w-full sm:text-6xl"
        aria-hidden
      >
        {menu.thumb}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <h3 className="text-base font-bold leading-snug text-espresso sm:text-xl">
          {menu.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-body sm:text-base">{menu.desc}</p>

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
