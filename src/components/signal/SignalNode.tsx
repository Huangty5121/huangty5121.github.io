interface SignalNodeProps {
  title: string;
  date: string;
  channel: 'frequency' | 'noise';
  slug: string;
  description: string;
  index?: number;
}

export default function SignalNode({ title, date, channel, slug, description, index = 0 }: SignalNodeProps) {
  const isFrequency = channel === 'frequency';
  const hoverTextClass = isFrequency ? 'group-hover:text-neon-cyan' : 'group-hover:text-neon-violet';
  const readColor = isFrequency ? 'text-neon-cyan/60' : 'text-neon-violet/60';

  return (
    <a
      href={`/signal/${slug}`}
      className="group flex items-start gap-6 py-6 relative animate-fade-in-up hover:translate-x-1.5 transition-transform duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Timeline node */}
      <div className="flex-shrink-0 relative z-10 mt-1.5">
        {isFrequency ? (
          <div className="w-[15px] h-[15px] rounded-[3px] border border-neon-cyan/50 bg-neon-cyan/20 group-hover:bg-neon-cyan/40 group-hover:shadow-[0_0_12px_rgba(0,255,224,0.3)] transition-all" />
        ) : (
          <div className="w-[15px] h-[15px] rounded-full border-2 border-neon-violet/50 bg-neon-violet/10 group-hover:bg-neon-violet/30 group-hover:shadow-[0_0_12px_rgba(191,90,242,0.3)] transition-all" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 min-w-0 glass-panel rounded-xl px-5 py-4 border border-white/[0.04] group-hover:border-white/[0.08] group-hover:shadow-lg group-hover:shadow-black/10 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[11px] text-frost/30">{date}</span>
          <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${
            isFrequency
              ? 'text-neon-cyan/70 bg-neon-cyan/5 border-neon-cyan/20'
              : 'text-neon-violet/70 bg-neon-violet/5 border-neon-violet/20'
          }`}>
            {channel}
          </span>
        </div>
        <h3 className={`font-display text-xl text-frost ${hoverTextClass} transition-colors`}>
          {title}
        </h3>
        <p className="font-body text-sm text-frost/40 line-clamp-2 mt-1.5 leading-relaxed">{description}</p>

        {/* Read indicator */}
        <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          <span className={`font-mono text-[10px] ${readColor}`}>Read signal →</span>
        </div>
      </div>
    </a>
  );
}
