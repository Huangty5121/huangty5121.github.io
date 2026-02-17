import { useEffect, useRef } from 'react';

const randChar = () => (Math.random() < 0.5 ? '0' : '1');

interface Drop {
  x: number;
  headY: number;
  length: number;
  speed: number;
  chars: string[];
  active: boolean;
  cooldown: number;
  mutateCounter: number;
}

export default function DotMatrixBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const fontSize = 14;
    const colSpacing = fontSize + 4;
    let drops: Drop[] = [];
    let w = 0;
    let h = 0;
    let maxRow = 0;

    function makeDrop(col: number, scattered: boolean): Drop {
      const len = 4 + Math.floor(Math.random() * 11);
      return {
        x: col * colSpacing,
        headY: scattered ? Math.random() * maxRow : -(len + Math.random() * 20),
        length: len,
        speed: 0.08 + Math.random() * 0.14,
        chars: Array.from({ length: len }, randChar),
        active: scattered ? Math.random() < 0.25 : false,
        cooldown: scattered
          ? Math.floor(Math.random() * 120)
          : 30 + Math.floor(Math.random() * 150),
        mutateCounter: 0,
      };
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      maxRow = Math.ceil(h / fontSize);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / colSpacing);
      const old = drops;
      drops = Array.from({ length: cols }, (_, i) =>
        i < old.length ? old[i] : makeDrop(i, true),
      );
    }

    resize();
    window.addEventListener('resize', resize);
    const isDark = () => document.documentElement.classList.contains('dark');

    let animId: number;
    let lastTime = 0;
    const interval = 33;

    function draw(time: number) {
      animId = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      const dark = isDark();
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = fontSize + 'px "Geist Mono",ui-monospace,monospace';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        if (!d.active) {
          d.cooldown--;
          if (d.cooldown <= 0) {
            d.active = true;
            d.headY = -(d.length + Math.random() * 20);
            d.speed = 0.06 + Math.random() * 0.1;
            d.length = 4 + Math.floor(Math.random() * 11);
            d.chars = Array.from({ length: d.length }, randChar);
            d.mutateCounter = 0;
          }
          continue;
        }

        d.mutateCounter++;
        if (d.mutateCounter >= 5) {
          d.mutateCounter = 0;
          const idx = Math.floor(Math.random() * d.chars.length);
          d.chars[idx] = randChar();
        }

        const headCell = Math.floor(d.headY);
        for (let j = 0; j < d.length; j++) {
          const cellY = headCell - j;
          if (cellY < 0 || cellY > maxRow) continue;
          const py = cellY * fontSize;
          const ratio = 1 - j / d.length;
          const baseAlpha = dark ? 0.35 : 0.22;
          const alpha = baseAlpha * ratio;
          if (alpha < 0.005) continue;
          const r = dark ? 200 : 80;
          const g = dark ? 210 : 90;
          const b = dark ? 220 : 100;
          ctx!.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
          ctx!.fillText(d.chars[j % d.chars.length], d.x, py);
        }

        d.headY += d.speed;
        if (d.headY - d.length > maxRow + 2) {
          d.active = false;
          d.cooldown = 40 + Math.floor(Math.random() * 140);
        }
      }
    }

    animId = requestAnimationFrame(draw);
    const obs = new MutationObserver(() => {
      ctx!.clearRect(0, 0, w * 2, h * 2);
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}