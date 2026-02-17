import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpItem {
  name: string;
  shortName?: string;
  role: string;
  period: string;
  description: string;
  url?: string;
  logo?: string;
  supervisor?: string;
  category?: string;
}

/* ─── Standalone Logo ─── */
function Logo({ logo, alt, fallback, active, size = 'normal' }: {
  logo?: string; alt: string; fallback: string; active: boolean; size?: 'normal' | 'mobile';
}) {
  const isMobile = size === 'mobile';
  const containerCls = isMobile
    ? 'w-14 h-14 rounded-lg'
    : 'w-24 h-24 md:w-28 md:h-28 rounded-xl';
  const imgCls = isMobile
    ? 'w-10 h-10'
    : 'w-16 h-16 md:w-20 md:h-20';
  return (
    <div className={`relative ${containerCls} flex items-center justify-center transition-all duration-300 ${active ? 'ring-1 ring-neon-cyan/40 bg-white/[0.04] scale-110' : 'hover:bg-white/[0.03]'}`}>
      {logo ? (
        <img src={logo} alt={alt} className={`${imgCls} object-contain transition-all duration-300 ${active ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`} />
      ) : (
        <span className={`font-mono ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} font-bold transition-colors duration-300 ${active ? 'text-frost/80' : 'text-frost/30 hover:text-frost/60'}`}>
          {fallback}
        </span>
      )}
    </div>
  );
}

/* ─── Close icon SVG ─── */
const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
);

/* ─── External link icon SVG ─── */
const ExtIcon = ({ size = 'w-3.5 h-3.5' }: { size?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={size}>
    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
  </svg>
);

/* ─── Category badge class ─── */
function catBadge(cat?: string) {
  if (cat === 'research') return 'text-neon-cyan/60 bg-neon-cyan/10 border border-neon-cyan/20';
  if (cat === 'service') return 'text-neon-violet/60 bg-neon-violet/10 border border-neon-violet/20';
  return 'text-neon-amber/60 bg-neon-amber/10 border border-neon-amber/20';
}

/* ─── Inline Detail Panel (desktop, expands below logos) ─── */
function InlineDetail({ item, onClose }: { item: ExpItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      <div className="glass-panel noise-overlay rounded-2xl p-5 md:p-6 border border-neon-cyan/10 mt-4 mb-2 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-frost/20 hover:text-frost/60 transition-colors" type="button"><CloseIcon /></button>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white/[0.04] shrink-0">
            {item.logo ? <img src={item.logo} alt="" className="w-12 h-12 object-contain" /> : <span className="font-mono text-base font-bold text-frost/50">{(item.shortName || item.name).slice(0, 3).toUpperCase()}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-frost">{item.name}</h3>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-frost/20 hover:text-neon-cyan/60 transition-colors shrink-0"><ExtIcon /></a>}
            </div>
            <p className="font-mono text-xs text-neon-cyan/50 mt-0.5">{item.role}</p>
            <p className="font-mono text-[11px] text-frost/25 mt-0.5">{item.period}</p>
          </div>
        </div>
        <p className="font-body text-sm text-frost/50 mt-3 leading-relaxed">{item.description}</p>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          {item.supervisor && <span className="font-mono text-[10px] text-frost/20">Supervisor: <span className="text-frost/40">{item.supervisor}</span></span>}
          {item.category && <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full ${catBadge(item.category)}`}>{item.category}</span>}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Modal (overlay) ─── */
function MobileModal({ item, onClose }: { item: ExpItem; onClose: () => void }) {
  const ab = (item.shortName || item.name).slice(0, 3).toUpperCase();
  return (
    <motion.div initial={{ opacity: 0 }}animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}className="fixed inset-0 z-[200] flex items-center justify-center p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative glass-panel noise-overlay rounded-2xl p-6 max-w-lg w-full border border-neon-cyan/10 shadow-2xl shadow-black/40" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-frost/20 hover:text-frost/60 transition-colors" type="button"><CloseIcon /></button>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white/[0.04] shrink-0">
            {item.logo ? <img src={item.logo} alt="" className="w-12 h-12 object-contain" /> : <span className="font-mono text-base font-bold text-frost/50">{ab}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-frost">{item.name}</h3>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-frost/20 hover:text-neon-cyan/60 transition-colors shrink-0"><ExtIcon size="w-4 h-4" /></a>}
            </div>
            <p className="font-mono text-xs text-neon-cyan/50 mt-1">{item.role}</p>
            <p className="font-mono text-[11px] text-frost/25 mt-0.5">{item.period}</p>
          </div>
        </div>
        <p className="font-body text-sm text-frost/50 mt-4 leading-relaxed">{item.description}</p>
        {item.supervisor && <div className="mt-4 pt-3 border-t border-white/5"><p className="font-mono text-[10px] text-frost/20">Supervisor: <span className="text-frost/40">{item.supervisor}</span></p></div>}
        {item.category && <div className="mt-3"><span className={`font-mono text-[9px] px-2 py-0.5 rounded-full ${catBadge(item.category)}`}>{item.category}</span></div>}
      </motion.div>
    </motion.div>
  );
}


export default function ExperienceWall({ items }: { items: ExpItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const label = (item: ExpItem) => item.shortName || item.name;
  const ab = (item: ExpItem) => label(item).slice(0, 3).toUpperCase();
  const toggle = (i: number) => setActive(prev => prev === i ? null : i);

  /* Build desktop rows */
  const ITEM_W = 160;
  const containerW = 896;
  const perRow = Math.max(2, Math.floor(containerW / ITEM_W));
  const dRows: { item: ExpItem; idx: number }[][] = [];
  for (let i = 0; i < items.length; i++) {
    const ri = Math.floor(i / perRow);
    if (!dRows[ri]) dRows[ri] = [];
    dRows[ri].push({ item: items[i], idx: i });
  }

  /* Build mobile rows (3 per row) */
  const mPerRow = 3;
  const mRows: { item: ExpItem; idx: number }[][] = [];
  for (let i = 0; i < items.length; i++) {
    const ri = Math.floor(i / mPerRow);
    if (!mRows[ri]) mRows[ri] = [];
    mRows[ri].push({ item: items[i], idx: i });
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:block mt-6 space-y-6">
        {dRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center justify-center gap-8">
            {row.map(({ item, idx }) => (
              <motion.button key={idx} onClick={() => toggle(idx)} whileHover={{ scale: 1.08, y: -3 }}whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2 cursor-pointer group/logo" type="button">
                <Logo logo={item.logo} alt={item.name} fallback={ab(item)} active={active === idx} />
                <span className={`font-mono text-xs transition-colors duration-300 text-center leading-tight whitespace-nowrap ${active === idx ? 'text-frost/70' : 'text-frost/25 group-hover/logo:text-frost/50'}`}>{label(item)}</span>
              </motion.button>
            ))}
          </div>
        ))}
        <AnimatePresence mode="wait">
          {active !== null && isDesktop && items[active] && (
            <InlineDetail key={active} item={items[active]} onClose={close} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile layout: logo-only staggered */}
      <div className="md:hidden mt-6 space-y-6">
        {mRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center justify-center gap-4">
            {row.map(({ item, idx }) => (
              <motion.button key={idx} onClick={() => setActive(idx)} whileTap={{ scale: 0.92 }} className="flex items-center justify-center cursor-pointer" type="button">
                <Logo logo={item.logo} alt={item.name} fallback={ab(item)}active={false} size="mobile" />
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile modal */}
      {typeof document !== 'undefined' && !isDesktop && createPortal(
        <AnimatePresence>
          {active !== null && items[active] && (
            <MobileModal item={items[active]} onClose={close} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
