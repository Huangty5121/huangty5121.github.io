import { useState }from 'react';
import { AnimatePresence, motion }from 'framer-motion';
import { renderAuthors } from '@utils/author-helpers';

interface ResearchCardProps {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  abstract: string;
  bibtex: string;
  doi?: string;
  pdf?: string;
  code?: string;
  links?: { label: string; url: string }[];
}

const ACCENT: Record<string, { border: string; bg: string; text: string }> = {
  conference: { border: 'border-neon-cyan/20', bg: 'bg-neon-cyan/10', text: 'text-neon-cyan/60' },
  journal: { border: 'border-neon-amber/20', bg: 'bg-neon-amber/10', text: 'text-neon-amber/60' },
  preprint: { border: 'border-neon-violet/20', bg: 'bg-neon-violet/10', text: 'text-neon-violet/60' },
};

export default function ResearchCard({
  title, authors, venue, year, type, abstract, bibtex, doi, pdf, code, links,
}: ResearchCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const accent = ACCENT[type] || ACCENT.preprint;

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`glass-panel noise-overlay neon-hover rounded-xl p-4 border border-white/[0.04] hover:border-neon-cyan/20 transition-all duration-300 cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <span className={`font-mono text-[9px] ${accent.text} px-1.5 py-0.5 rounded ${accent.bg}`}>{venue}</span>
          <p className="font-body text-sm text-frost/60 leading-relaxed line-clamp-2">{title}</p>
          <p className="font-mono text-[9px] text-frost/25">{renderAuthors(authors, true)}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`font-mono text-sm font-bold ${accent.text}`}>{year}</span>
          <span className={`font-mono text-[10px] text-frost/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-3" onClick={(e) => e.stopPropagation()}>
              <p className="font-body text-xs text-frost/50 leading-relaxed">{abstract}</p>
              <div className="flex gap-2 flex-wrap">
                {pdf && (
                  <a href={pdf} target="_blank" rel="noopener noreferrer"
                     className="px-2 py-0.5 text-[10px] font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    PDF ↗
                  </a>
                )}
                {doi && (
                  <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer"
                     className="px-2 py-0.5 text-[10px] font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    DOI ↗
                  </a>
                )}
                {code && (
                  <a href={code} target="_blank" rel="noopener noreferrer"
                     className="px-2 py-0.5 text-[10px] font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    Code ↗
                  </a>
                )}
                {links?.map((link, idx) => (
                  <a key={idx}href={link.url} target="_blank" rel="noopener noreferrer"
                     className="px-2 py-0.5 text-[10px] font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    {link.label} ↗
                  </a>
                ))}
                <button
                  onClick={copyBibtex}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-md border transition-colors ${
                    copied
                      ? 'text-green-400 border-green-400/30'
                      : 'text-frost/50 border-white/10 hover:border-neon-cyan/30 hover:text-neon-cyan/70'
                  }`}
                >
                  {copied ? 'Copied ✓' : 'BibTeX'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

