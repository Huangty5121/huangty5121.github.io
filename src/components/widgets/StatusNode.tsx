import GlassCard from '@components/core/GlassCard';

type Status = 'working' | 'studying' | 'gaming' | 'chilling' | 'traveling' | 'online' | 'offline';

interface StatusNodeProps {
  status?: Status;
  message?: string;
}

const statusConfig: Record<Status, { color: string; label: string; glow: string; emoji: string }> = {
  working:   { color: 'bg-neon-violet',  label: 'Working',   glow: 'shadow-neon-violet', emoji: '💻' },
  studying:  { color: 'bg-neon-amber',   label: 'Studying',  glow: 'shadow-neon-amber',  emoji: '📚' },
  gaming:    { color: 'bg-neon-rose',    label: 'Gaming',    glow: 'shadow-neon-rose',   emoji: '🎮' },
  chilling:  { color: 'bg-neon-cyan',    label: 'Chilling',  glow: 'shadow-neon-cyan',   emoji: '🌙' },
  traveling: { color: 'bg-neon-cyan',    label: 'Traveling', glow: 'shadow-neon-cyan',   emoji: '✈️' },
  online:    { color: 'bg-neon-cyan',    label: 'Online',    glow: 'shadow-neon-cyan',   emoji: '🟢' },
  offline:   { color: 'bg-frost/30',     label: 'Offline',   glow: '',                   emoji: '⚫' },
};

export default function StatusNode({
  status = 'online',
  message = '',
}: StatusNodeProps) {
  const config = statusConfig[status] || statusConfig.online;
  const isActive = status !== 'offline';
  const dotCls = [
    'block w-5 h-5 rounded-full',
    config.color,
    config.glow,
    isActive ? 'animate-pulse' : '',
  ].filter(Boolean).join(' ');

  return (
    <GlassCard className="h-full min-h-[154px]">
      <div className="flex flex-col items-center justify-center gap-2 h-full w-full p-4">
        <span className="text-2xl">{config.emoji}</span>
        <div className="flex items-center gap-2">
          <span className={dotCls}/>
          <span className="font-mono text-sm text-frost/80">{config.label}</span>
        </div>
        {message && (
          <span className="font-mono text-[10px] text-frost/30 text-center">
            {message}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
