import { useState, useEffect, useCallback } from 'react';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const DISPLAY_TEXT = 'FROSTY NEON';

export default function GlitchText() {
  const [text, setText] = useState(DISPLAY_TEXT);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        DISPLAY_TEXT.split('')
          .map((char, i) => {
            if (i < iteration) return DISPLAY_TEXT[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= DISPLAY_TEXT.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
      iteration += 1 / 3;
    }, 30);
  }, [isGlitching]);

  return (
    <h1
      onMouseEnter={glitch}
      className="font-display text-6xl md:text-7xl lg:text-8xl font-bold
                 text-frost tracking-tighter cursor-default select-none
                 transition-all duration-300"
    >
      {text}
    </h1>
  );
}
