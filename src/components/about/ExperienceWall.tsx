import { useState, useEffect, useCallback }from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence }from 'framer-motion';

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

function LogoBox({ logo, alt, fallback }: { logo?: string; alt: string; fallback: string }) {
  return (
    <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white/[0.03] group-hover/logo:bg-white/[0.06] transition-colors">
      {logo ? (
        <img src={logo} alt={alt} className="w-10 h-10 object-contain opacity-60 group-hover/logo:opacity-100 transition-opacity" />
      ) : (
        <span className="font-mono text-xs font-bold text-frost/40 group-hover/logo:text-frost/70 transition-colors">
          {fallback}
        </span>
      )}
    </div>
  );
}

function DetailModal({ item, onClose }: { item: ExpItem; onClose: () => void }) {
  const ab = (item.shortName || item.name).slice(0, 3).toUpperCase();
  const catClass = item.category === 'research'
    ? 'text-neon-cyan/50 bg-neon-cyan/10 border border-neon-cyan/20'
    : 'text-neon-violet/50 bg-neon-violet/10 border border-neon-violet/20';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative glass-panel noise-overlay rounded-2xl p-6 md:p-8 max-w-lg w-full border border-neon-cyan/10 shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-frost/20 hover:text-frost/60 transition-colors" type="button">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white/[0.04] shrink-0">
            {item.logo ? (
              <img src={item.logo} alt="" className="w-10 h-10 object-contain" />
            ) : (
              <span className="font-mono text-sm font-bold text-frost/50">{ab}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-frost">{item.name}</h3>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-frost/20 hover:text-neon-cyan/60 transition-colors shrink-0">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
            <p className="font-mono text-xs text-neon-cyan/50 mt-1">{item.role}</p>
            <p className="font-mono text-[11px] text-frost/25 mt-0.5">{item.period}</p>
          </div>
        </div>
        <p className="font-body text-sm text-frost/50 mt-4 leading-relaxed">{item.description}</p>
        {item.supervisor && (
          <div className="mt-4 pt-3 border-t border-white/5">
            <p className="font-mono text-[10px] text-frost/20">
              Supervisor: <span className="text-frost/40">{item.supervisor}</span>
            </p>
          </div>
        )}
        {item.category && (
          <div className="mt-3">
            <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full ${catClass}`}>{item.category}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceWall({ items }: { items: ExpItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const label = (item: ExpItem) => item.shortName || item.name;
  const ab = (item: ExpItem) => label(item).slice(0, 3).toUpperCase();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {items.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glass-panel noise-overlay rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-2 p-4 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 group/logo cursor-pointer"
            type="button"
          >
            <LogoBox logo={item.logo} alt={item.name} fallback={ab(item)} />
            <span className="font-mono text-[10px] text-frost/30 group-hover/logo:text-frost/60 transition-colors text-center leading-tight">
              {label(item)}
            </span>
          </motion.button>
        ))}
      </div>
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {active !== null && items[active] && (
            <DetailModal item={items[active]} onClose={close} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
