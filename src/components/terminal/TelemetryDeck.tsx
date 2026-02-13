import type { ReactNode } from 'react';

interface TelemetryDeckProps {
  children: ReactNode;
}

export default function TelemetryDeck({ children }: TelemetryDeckProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 h-full content-center max-w-md mx-auto">
      {children}
    </div>
  );
}
