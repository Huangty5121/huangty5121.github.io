import { useState } from 'react';
import { motion } from 'framer-motion';

interface GadgetCardProps {
  name: string;
  image: string;
  specs: Record<string, string>;
  rating: number;
  purchaseLink?: string;
}

export default function GadgetCard({ name, image, specs, rating, purchaseLink }: GadgetCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-[1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-72"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 glass-panel noise-overlay rounded-xl overflow-hidden backface-hidden border border-white/[0.04] hover:border-white/[0.08] transition-colors">
          <img src={image}alt={name}className="w-full h-44 object-cover" loading="lazy" />
          <div className="p-4">
            <h4 className="font-display text-sm text-frost font-bold truncate">{name}</h4>
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xs ${i < rating ? 'text-neon-amber' : 'text-frost/15'}`}>★</span>
              ))}
              <span className="ml-2 font-mono text-[10px] text-frost/30">tap to flip</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-panel noise-overlay rounded-xl p-5 flex flex-col justify-between backface-hidden border border-white/[0.04]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <h4 className="font-display text-sm text-frost font-bold mb-4">{name}</h4>
            <dl className="space-y-2">
              {Object.entries(specs).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs">
                  <dt className="font-mono text-frost/40 uppercase">{key}</dt>
                  <dd className="font-mono text-neon-cyan/70">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
          {purchaseLink && (
            <a
              href={purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-center text-xs font-mono text-neon-cyan/70 hover:text-neon-cyan transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Purchase →
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
