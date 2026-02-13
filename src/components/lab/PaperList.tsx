import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaperEntry from './PaperEntry';

type PaperType = 'conference' | 'journal' | 'preprint';

interface PaperData {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PaperType;
  abstract: string;
  bibtex: string;
  doi?: string;
  pdf?: string;
  code?: string;
  links?: { label: string; url: string }[];
}

interface PaperListProps {
  papers: PaperData[];
}

const FILTERS: { key: PaperType | 'all'; label: string; accent: string; activeClass: string }[] = [
  { key: 'all',        label: 'All',        accent: 'neon-cyan',   activeClass: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan' },
  { key: 'conference', label: 'Conference',  accent: 'neon-violet', activeClass: 'border-neon-violet/40 bg-neon-violet/10 text-neon-violet' },
  { key: 'journal',    label: 'Journal',     accent: 'neon-amber',  activeClass: 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber' },
  { key: 'preprint',   label: 'Preprint',    accent: 'neon-cyan',   activeClass: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan' },
];

const ACCENT_MAP: Record<PaperType, 'neon-cyan' | 'neon-violet' | 'neon-amber'> = {
  conference: 'neon-violet',
  journal: 'neon-amber',
  preprint: 'neon-cyan',
};

export default function PaperList({ papers }: PaperListProps) {
  const [filter, setFilter] = useState<PaperType | 'all'>('all');
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const filtered = filter === 'all' ? papers : papers.filter(p => p.type === filter);

  // Count per type
  const counts: Record<string, number> = {
    all: papers.length,
    conference: papers.filter(p => p.type === 'conference').length,
    journal: papers.filter(p => p.type === 'journal').length,
    preprint: papers.filter(p => p.type === 'preprint').length,
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {FILTERS.map(f => {
          const isActive = filter === f.key;
          const count = counts[f.key];
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`
                px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200
                ${isActive
                  ? f.activeClass
                  : 'border-white/[0.06] text-frost/40 hover:border-white/10 hover:text-frost/60'
                }
              `}
            >
              {f.label}
              <span className={`ml-1.5 ${isActive ? 'opacity-80' : 'opacity-40'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Paper list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? filtered.map((paper, i) => (
            <motion.div
              key={paper.title}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <PaperEntry
                title={paper.title}
                authors={paper.authors}
                venue={paper.venue}
                year={paper.year}
                abstract={paper.abstract}
                bibtex={paper.bibtex}
                doi={paper.doi}
                pdf={paper.pdf}
                code={paper.code}
                links={paper.links}
                accentColor={ACCENT_MAP[paper.type]}
                isOpen={expandedTitle === paper.title}
                onToggle={() => setExpandedTitle(expandedTitle === paper.title ? null : paper.title)}
              />
            </motion.div>
          )) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm text-frost/20 text-center py-12"
            >
              No {filter === 'all' ? '' : filter + ' '}publications yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

