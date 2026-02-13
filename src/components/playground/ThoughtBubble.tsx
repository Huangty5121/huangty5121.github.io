interface ThoughtBubbleProps {
  content: string;
  mood?: string;
}

export default function ThoughtBubble({ content, mood }: ThoughtBubbleProps) {
  return (
    <div className="group glass-panel noise-overlay rounded-2xl p-6 hover:bg-white/[0.04] transition-all border border-white/[0.04] hover:border-neon-violet/10 relative overflow-hidden">
      {/* Subtle corner glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-neon-violet/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {mood && <span className="text-2xl mb-3 block">{mood}</span>}
      <p className="font-hand text-frost/70 text-base leading-relaxed italic relative z-10">
        "{content}"
      </p>
      <div className="mt-3 w-8 h-px bg-gradient-to-r from-neon-violet/30 to-transparent"></div>
    </div>
  );
}
