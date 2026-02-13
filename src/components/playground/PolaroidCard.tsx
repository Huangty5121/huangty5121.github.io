import { motion } from 'framer-motion';

interface PolaroidCardProps {
  src: string;
  alt: string;
  caption?: string;
  exif?: {
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutter?: string;
  };
}

export default function PolaroidCard({ src, alt, caption, exif }: PolaroidCardProps) {
  // Deterministic rotation based on alt text hash to avoid hydration mismatch
  let hash = 0;
  for (let i = 0; i < alt.length; i++) {
    hash = ((hash << 5) - hash + alt.charCodeAt(i)) | 0;
  }
  const rotate = ((hash % 600) / 100) - 3; // -3 to 3 degrees

  return (
    <motion.div
      className="group glass-panel noise-overlay p-2 pb-8 rounded-xl shadow-lg cursor-grab active:cursor-grabbing break-inside-avoid mb-5 border border-white/[0.04] hover:border-neon-amber/10 transition-colors overflow-hidden relative"
      style={{ rotate }}
      drag
      dragElastic={0.3}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full aspect-[4/3] object-cover rounded-lg"
        loading="lazy"
      />

      {caption && (
        <p className="mt-3 text-center font-hand text-sm text-frost/60">{caption}</p>
      )}

      {exif && (
        <div className="mt-1.5 flex justify-center gap-3 text-[9px] text-frost/30 font-mono">
          {exif.camera && <span>{exif.camera}</span>}
          {exif.aperture && <span>{exif.aperture}</span>}
          {exif.iso && <span>ISO {exif.iso}</span>}
        </div>
      )}
    </motion.div>
  );
}
