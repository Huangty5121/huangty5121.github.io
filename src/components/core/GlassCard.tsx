import { useRef, type ReactNode } from 'react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'neon' | 'scale' | 'none';
  neonColor?: string;
  as?: 'div' | 'article' | 'section';
}

export default function GlassCard({
  children,
  className,
  hoverEffect = 'neon',
  neonColor = 'rgba(0,255,224,0.15)',
  as: Tag = 'div',
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoverEffect === 'none' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--glow-x', `${x}%`);
    ref.current.style.setProperty('--glow-y', `${y}%`);
  };

  return (
    <Tag
      ref={ref as any}
      onMouseMove={handleMouseMove}
      className={clsx(
        'glass-panel noise-overlay relative overflow-hidden group rounded-2xl',
        hoverEffect === 'neon' && 'neon-hover',
        hoverEffect === 'scale' && 'hover:scale-[1.02] transition-transform',
        className
      )}
    >
      {hoverEffect === 'neon' && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${neonColor}, transparent 40%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}

