import React, { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isCountingDone, setIsCountingDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const textRef = useRef(null);
  const hasSeenRef = useRef(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = "PS: Most of my best ideas arrive long after sunset.";
    const chars = fullText.split("");
    const charDelay = (800 / chars.length);
    let index = 0;
    let timer;

    const typeNext = () => {
      index++;
      if (textRef.current) {
        textRef.current.textContent = chars.slice(0, index).join("");
      }
      if (index < chars.length) {
        timer = setTimeout(typeNext, charDelay);
      }
    };

    timer = setTimeout(typeNext, 100);
    return () => clearTimeout(timer);
  }, []);

  // Progress counter
  useEffect(() => {
    // Check session storage
    try {
      if (sessionStorage.getItem('intro-seen') === '1') {
        hasSeenRef.current = true;
      } else {
        sessionStorage.setItem('intro-seen', '1');
      }
    } catch {
      // ignore
    }

    if (hasSeenRef.current) {
      document.documentElement.classList.add('loaded');
      setIsFinished(true);
      return;
    }

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1800;
    const startTime = performance.now();
    let frameId;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = duration <= 0 ? 1 : Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));

      if (pct < 1) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        setIsCountingDone(true);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Trigger fade out after counting completes
  useEffect(() => {
    if (!isCountingDone) return;
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [isCountingDone]);

  // Remove preloader after fade out
  useEffect(() => {
    if (!isFadingOut) return;
    const timer = setTimeout(() => {
      document.documentElement.classList.add('loaded');
      setIsFinished(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [isFadingOut]);

  // Safety fallback timeout
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      document.documentElement.classList.add('loaded');
      setIsFinished(true);
    }, 4200);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (!isFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFinished]);

  if (isFinished) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#F7F7F7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 400ms cubic-bezier(0.2, 0, 0, 1)'
      }}
    >
      <img
        src="/coffee-cup.svg"
        alt=""
        aria-hidden="true"
        width={240}
        className="loader-cup"
        style={{
          height: 'auto',
          filter: 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.12))'
        }}
      />

      <div
        ref={textRef}
        style={{
          fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
          fontSize: 'clamp(18px, 3vw, 30px)',
          letterSpacing: '0.5px',
          color: '#606060',
          textAlign: 'center',
          minHeight: '1.5em',
          padding: '0 24px'
        }}
      />

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '2px',
          background: '#D2D2D2'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#101010',
            transition: 'width 80ms linear'
          }}
        />
      </div>

      {/* Percentage Display */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          right: '24px',
          fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
          fontSize: '30px',
          color: '#606060',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {progress}%
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        Loading {progress} percent
      </span>
    </div>
  );
}
