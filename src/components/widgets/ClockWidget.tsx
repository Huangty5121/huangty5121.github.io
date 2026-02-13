import { useState, useEffect } from 'react';
import GlassCard from '@components/core/GlassCard';

export default function ClockWidget() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassCard className="h-full min-h-[154px]">
      <div className="flex flex-col items-center justify-center gap-1 h-full w-full p-4">
        <span className="font-mono text-3xl font-bold text-frost tracking-tight tabular-nums">
          {time || '--:--:--'}
        </span>
        <span className="font-mono text-[10px] text-frost/30 uppercase tracking-wider">
          {date || '---'}
        </span>
      </div>
    </GlassCard>
  );
}

