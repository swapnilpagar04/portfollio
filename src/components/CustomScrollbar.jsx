import React, { useEffect, useRef, useState } from 'react';

export default function CustomScrollbar() {
  const [metrics, setMetrics] = useState({ winH: 0, docH: 0 });
  const thumbRef = useRef(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const measure = () => {
      setMetrics({
        winH: window.innerHeight,
        docH: document.documentElement.scrollHeight
      });
    };
    measure();
    const t = setTimeout(measure, 150);
    window.addEventListener('resize', measure);

    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);

  const { winH, docH } = metrics;
  const isScrollable = docH > winH;
  const thumbHeight = isScrollable && winH ? Math.max(40, (winH / docH) * winH) : 0;
  const maxTravel = winH - thumbHeight;

  useEffect(() => {
    if (!isScrollable) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = docH - winH;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      targetY.current = progress * maxTravel;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let frameId;
    const animate = () => {
      // Spring smoothing
      currentY.current += (targetY.current - currentY.current) * 0.15;
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0, ${currentY.current}px, 0)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [isScrollable, winH, docH, maxTravel]);

  if (!isScrollable) return null;

  return (
    <div
      ref={thumbRef}
      style={{
        position: 'fixed',
        top: 0,
        right: '2px',
        width: '5px',
        height: `${thumbHeight}px`,
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        borderRadius: '4px',
        zIndex: 99999,
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    />
  );
}
