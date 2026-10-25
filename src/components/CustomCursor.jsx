import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const points = useRef([]);
  const hasMoved = useRef(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);
  const isHoveredRef = useRef(false);
  const isProjectRef = useRef(false);

  // Pointer detection
  useEffect(() => {
    const checkPointer = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  // Title easter egg on tab switch
  useEffect(() => {
    let originalTitle = document.title;
    const handleVisibility = () => {
      if (document.hidden) {
        originalTitle = document.title;
        document.title = 'Come back! 🥺';
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Canvas physics trail and mouse listeners
  useEffect(() => {
    if (!isFinePointer) return;

    if (points.current.length === 0) {
      const initX = window.innerWidth / 2;
      const initY = window.innerHeight / 2;
      mousePos.current = { x: initX, y: initY };
      points.current = Array(12).fill(null).map(() => ({
        x: initX,
        y: initY,
        dx: 0,
        dy: 0
      }));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const updatePos = (x, y) => {
      mousePos.current.x = x;
      mousePos.current.y = y;
    };

    const handleMouseMove = (e) => {
      hasMoved.current = true;
      updatePos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      hasMoved.current = true;
      if (e.targetTouches.length > 0) {
        updatePos(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hovered = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor-hover]')
      );
      setIsHovered(hovered);
      isHoveredRef.current = hovered;

      const project = Boolean(target.closest('[data-cursor="project"]'));
      setIsProjectHover(project);
      isProjectRef.current = project;
    };

    const handleClick = (e) => {
      hasMoved.current = true;
      updatePos(e.clientX, e.clientY);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    resizeCanvas();

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = points.current;

      pts.forEach((pt, i) => {
        const target = i === 0 ? mousePos.current : pts[i - 1];
        const spring = i === 0 ? 0.16 : 0.4;
        pt.dx += (target.x - pt.x) * spring;
        pt.dy += (target.y - pt.y) * spring;
        pt.dx *= 0.5;
        pt.dy *= 0.5;
        pt.x += pt.dx;
        pt.y += pt.dy;
      });

      ctx.lineCap = 'round';
      ctx.strokeStyle = '#ffffff';
      const isEnlarged = isHoveredRef.current || isProjectRef.current;

      if (hasMoved.current && pts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const midX = 0.5 * (pts[i].x + pts[i + 1].x);
          const midY = 0.5 * (pts[i].y + pts[i + 1].y);
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
          ctx.lineWidth = 0.5 * (12 - i) * (isEnlarged ? 2.5 : 1);
          ctx.stroke();
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [isFinePointer]);

  // Direct DOM cursor position tracking for instant, lag-free cursor rendering
  const cursorDotRef = useRef(null);
  useEffect(() => {
    if (!isFinePointer) return;
    const dot = cursorDotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (dot.style.opacity === '0') {
        dot.style.opacity = '1';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Physics Trail Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))'
        }}
      />

      {/* Pointer & Badges */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10001,
          mixBlendMode: 'difference',
          opacity: 0,
          willChange: 'transform'
        }}
      >
        <div
          style={{
            position: 'relative',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Default Arrow Pointer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${isProjectHover ? 0 : isHovered ? 0.6 : 1})`,
              opacity: isProjectHover ? 0 : 1,
              transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1), opacity 200ms cubic-bezier(0.2, 0, 0, 1)'
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: 'rotate(-15deg) translate(9px, 9px)',
                filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))'
              }}
            >
              <path
                d="M3 3L11.5 21L14.5 13.5L22 10.5L3 3Z"
                fill="white"
                stroke="black"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Project Hover Rotating Badge */}
          {isProjectHover && (
            <div
              style={{
                position: 'absolute',
                width: '110px',
                height: '110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'badge-pop 300ms cubic-bezier(0.2, 0, 0, 1) forwards'
              }}
            >
              {/* Arrow Up Right Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', zIndex: 10 }}
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>

              {/* Rotating Circular Text */}
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '8px',
                  animation: 'spin 8s linear infinite'
                }}
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text
                  style={{
                    fontSize: '8.5px',
                    fontWeight: 900,
                    fill: 'white',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sofia), system-ui, sans-serif'
                  }}
                >
                  <textPath href="#circlePath">
                    Babe! • Crafted with Precision •
                  </textPath>
                </text>
              </svg>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes badge-pop {
          from {
            transform: scale(0) rotate(-90deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
