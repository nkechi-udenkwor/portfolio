'use client';

import { useEffect, useRef } from 'react';

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const touchDevice = window.matchMedia(
      '(hover: none) and (pointer: coarse)',
    ).matches;

    const el = glowRef.current;
    if (!el || reducedMotion || touchDevice) return;

    el.dataset.active = 'true';

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      el.style.setProperty('--glow-x', `${currentX}px`);
      el.style.setProperty('--glow-y', `${currentY}px`);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      el.dataset.active = 'false';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className='cursor-glow pointer-events-none fixed inset-0 opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100'
      style={{
        background:
          'radial-gradient(circle 40vmax at var(--glow-x, 50%) var(--glow-y, 50%), rgba(45, 212, 191, 0.06), rgba(45, 212, 191, 0.025) 35%, transparent 75%)',
      }}
    />
  );
}
