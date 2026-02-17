import { useState, useRef, useEffect } from 'react';

const emails = [
  { label: 'PolyU', address: 'tin-yeh.huang@connect.polyu.hk' },
  { label: 'Tsinghua', address: 'hty25@mails.tsinghua.edu.cn' },
  { label: 'X-Institute', address: 'huangtianye@mails.x-institute.edu.cn' },
  { label: 'Personal', address: 'hty051210@outlook.com' },
  { label: 'Personal', address: 'hty051210@gmail.com' },
];

export default function EmailPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keep popover within viewport on mobile
  useEffect(() => {
    if (!open || !popRef.current) return;
    const el = popRef.current;
    const rect = el.getBoundingClientRect();
    let nudge = 0;
    // If overflowing right edge, nudge left
    if (rect.right > window.innerWidth - 12) {
      nudge = window.innerWidth - 12 - rect.right;
    }
    // If overflowing left edge, nudge right
    if (rect.left < 12) {
      nudge = 12 - rect.left;
    }
    if (nudge !== 0) {
      // Combine with existing -translate-x-1/2
      el.style.transform = `translateX(calc(-50% + ${nudge}px))`;
    }
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            if (ref.current && !ref.current.matches(':hover')) setOpen(false);
          }, 100);
        }}
        className="text-frost/30 hover:text-neon-cyan transition-colors"
        aria-label="Email"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </button>

      {open && (
        <div
          ref={popRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="glass-panel noise-overlay rounded-xl p-2 border border-white/10 shadow-2xl shadow-black/50 min-w-[400px]">
            <p className="font-mono text-[10px] text-frost/30 px-2 pt-1 pb-1.5">Choose an email</p>
            {emails.map((e) => (
              <a
                key={e.address}
                href={`mailto:${e.address}`}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors group/email"
              >
                <span className="font-mono text-[10px] text-neon-cyan/50 w-[72px] shrink-0 whitespace-nowrap group-hover/email:text-neon-cyan/80 transition-colors">
                  {e.label}
                </span>
                <span className="font-mono text-[11px] text-frost/50 whitespace-nowrap group-hover/email:text-frost/80 transition-colors">
                  {e.address}
                </span>
              </a>
            ))}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10" />
        </div>
      )}
    </div>
  );
}

