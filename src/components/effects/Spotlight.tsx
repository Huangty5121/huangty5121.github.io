import { useEffect, useRef }from 'react';

export default function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = spotRef.current;
    if (!el) return;

    let rafId = 0;
    let currentAnim: Animation | null = null;

    const handleMove = (e: PointerEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (currentAnim) currentAnim.cancel();
        currentAnim = el.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 2000, fill: 'forwards', easing: 'ease-out' }
        );
        rafId = 0;
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (currentAnim) currentAnim.cancel();
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2
                 w-[600px] h-[600px] rounded-full opacity-20
                 bg-[radial-gradient(circle,rgba(191,90,242,0.4)_0%,rgba(0,255,224,0.1)_50%,transparent_70%)]
                 blur-[100px] mix-blend-screen"
      style={{ left: '50%', top: '50%' }}
    />
  );
}
