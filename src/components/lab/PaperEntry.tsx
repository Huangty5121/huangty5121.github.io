import { useState } from 'react';
import { createPortal }from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { renderAuthors } from '@utils/author-helpers';

interface PaperEntryProps {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  bibtex: string;
  doi?: string;
  pdf?: string;
  code?: string;
  links?: { label: string; url: string }[];
  accentColor?: 'neon-cyan' | 'neon-violet' | 'neon-amber';
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function PaperEntry({
  title, authors, venue, year, abstract, bibtex, doi, pdf, code, links,
  accentColor = 'neon-cyan',
  isOpen: controlledOpen,
  onToggle,
}: PaperEntryProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleToggle = onToggle || (() => setInternalOpen(!internalOpen));
  const [copied, setCopied] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hoverBorder = accentColor === 'neon-violet'
    ? 'hover:border-neon-violet/20'
    : accentColor === 'neon-amber'
    ? 'hover:border-neon-amber/20'
    : 'hover:border-neon-cyan/20';
  const yearColor = accentColor === 'neon-violet'
    ? 'text-neon-violet/60'
    : accentColor === 'neon-amber'
    ? 'text-neon-amber/60'
    : 'text-neon-cyan/60';
  const tagBg = accentColor === 'neon-violet'
    ? 'bg-neon-violet/5 border-neon-violet/20 text-neon-violet/70'
    : accentColor === 'neon-amber'
    ? 'bg-neon-amber/5 border-neon-amber/20 text-neon-amber/70'
    : 'bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan/70';

  return (
    <div
      className={`group glass-panel noise-overlay rounded-xl p-4 border border-white/[0.04] ${hoverBorder} transition-all duration-300 cursor-pointer mb-3`}
      onClick={handleToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg text-frost font-medium group-hover:text-white transition-colors">{title}</h4>
          <p className="font-mono text-xs text-frost/40 mt-1.5">
            {renderAuthors(authors)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${tagBg}`}>{venue}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`font-mono text-sm font-bold ${yearColor}`}>{year}</span>
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
            <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-3" onClick={(e) => e.stopPropagation()}>
              <p className="font-body text-sm text-frost/50 leading-relaxed">{abstract}</p>
              <div className="flex gap-2 flex-wrap">
                {pdf && (
                  <>
                    <button
                      onClick={() => setShowPdf(true)}
                      className="px-2.5 py-1 text-xs font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors"
                    >
                      Preview PDF
                    </button>
                    <a href={pdf} download
                       className="px-2.5 py-1 text-xs font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                      Download PDF ↓
                    </a>
                  </>
                )}
                {code && (
                  <a href={code} target="_blank" rel="noopener noreferrer"
                     className="px-2.5 py-1 text-xs font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    Code ↗
                  </a>
                )}
                {doi && (
                  <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer"
                     className="px-2.5 py-1 text-xs font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    DOI ↗
                  </a>
                )}
                {links && links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                     className="px-2.5 py-1 text-xs font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors">
                    {link.label} ↗
                  </a>
                ))}
                <button
                  onClick={copyBibtex}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-colors ${
                    copied
                      ? 'text-green-400 border-green-400/30'
                      : 'text-frost/50 border-white/10 hover:border-neon-cyan/30 hover:text-neon-cyan/70'
                  }`}
                >
                  {copied ? 'Copied ✓' : 'Copy BibTeX'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Preview Modal */}
      {showPdf && pdf && createPortal(
        <AnimatePresence>
          <motion.div
            key="pdf-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center pt-[8vh] p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPdf(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl h-[80vh] glass-panel rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="font-mono text-xs text-frost/60 truncate pr-4">{title}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={pdf}
                    download
                    className="px-2.5 py-1 text-[11px] font-mono text-frost/50 border border-white/10 rounded-md hover:border-neon-cyan/30 hover:text-neon-cyan/70 transition-colors"
                  >
                    Download ↓
                  </a>
                  <button
                    onClick={() => setShowPdf(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-frost/40 hover:text-frost/80 hover:bg-white/5 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={pdf}
                className="w-full h-[calc(100%-52px)]"
                title={`PDF preview: ${title}`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}