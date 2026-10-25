import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: '01',
    title: 'Curiosity',
    description:
      "Every project begins with a question. I enjoy exploring unfamiliar ideas, learning through experimentation, and discovering better ways to build. Curiosity has never been a phase for me—it's the reason I keep creating.",
    offset: 0
  },
  {
    num: '02',
    title: 'Precision',
    description:
      'The smallest details often leave the strongest impression. I believe thoughtful refinement always outlasts unnecessary complexity.',
    offset: 110
  },
  {
    num: '03',
    title: 'Purpose',
    description: 'Build with intention. Leave every project better than the last.',
    offset: 220
  }
];

export default function Principles() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.principle-card');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '96px clamp(20px, 4vw, 64px)',
        background: '#F7F7F7'
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-sofia), system-ui, sans-serif',
          fontSize: 'clamp(48px, 12vw, 96px)',
          fontWeight: 700,
          lineHeight: 1,
          color: '#101010',
          textAlign: 'left',
          margin: '0 0 80px',
          willChange: 'transform'
        }}
      >
        Principles
      </h2>

      <div
        className="principles-grid"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: '48px',
          perspective: '1200px'
        }}
      >
        {PRINCIPLES.map((item, idx) => (
          <div
            key={idx}
            className={`principle-card principle-offset-${idx}`}
            style={{
              flex: '1 1 0',
              maxWidth: '360px',
              minHeight: '340px',
              marginTop: `${item.offset}px`,
              border: '5px solid #101010',
              boxShadow: '9px 9px 0 #D2D2D2',
              background: '#F7F7F7',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '48px',
              transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1), box-shadow 200ms cubic-bezier(0.2, 0, 0, 1)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                fontSize: '52px',
                fontWeight: 600,
                lineHeight: 1,
                color: '#AAAAAA'
              }}
            >
              {item.num}
            </span>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  color: '#101010',
                  margin: '0 0 24px'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  letterSpacing: 0,
                  color: '#606060',
                  margin: 0
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .principle-card:hover {
          transform: translateY(-6px);
          box-shadow: 13px 13px 0 #D2D2D2 !important;
        }
        @media (max-width: 1024px) {
          .principles-grid {
            flex-direction: column !important;
            align-items: center !important;
            gap: 40px !important;
          }
          .principle-card {
            max-width: 100% !important;
            width: 100% !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
