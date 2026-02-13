import { useState, useEffect } from 'react';

interface Fragment {
  content: string;
  mood: string;
}

export default function FragmentWidget({ fragments }: { fragments: Fragment[] }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (fragments.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % fragments.length);
        setFade(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, [fragments.length]);

  const frag = fragments[idx];
  if (!frag) return null;

  return (
    <div className="glass-panel noise-overlay rounded-2xl h-full min-h-[154px] flex flex-col justify-between p-5 group/frag">
      <span className="font-mono text-[10px] text-neon-violet/40 uppercase tracking-[0.2em]">Fragment</span>
      <div className={`flex-1 flex items-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-body text-sm text-frost/50 leading-relaxed line-clamp-3">
          {frag.content}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg">{frag.mood}</span>
        <div className="flex gap-1">
          {fragments.map((_, i) => (
            <span
              key={i}
              className={`w-1 h-1 rounded-full transition-colors ${i === idx ? 'bg-neon-violet/60' : 'bg-frost/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

