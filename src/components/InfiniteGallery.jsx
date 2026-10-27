import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_LOGOS = [
  { src: '/images/java.png', alt: 'Java' },
  { src: '/images/python.png', alt: 'Python' },
  { src: '/images/cpp.png', alt: 'C++' },
  { src: '/images/javascript.png', alt: 'JavaScript' },
  { src: '/images/tailwind.png', alt: 'Tailwind CSS' },
  { src: '/images/react.png', alt: 'React' },
  { src: '/images/postgres.png', alt: 'PostgreSQL' },
  { src: '/images/mongodb.png', alt: 'MongoDB' },
  { src: '/images/Git.png', alt: 'Git' }
];

export default function InfiniteGallery({ images = DEFAULT_LOGOS }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const displayItems = [...images, ...images];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }, containerRef);

    // Refresh ScrollTrigger once DOM layout stabilizes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [images]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '24px 0 64px',
        background: '#000000',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 2
      }}
    >
      {/* Edge gradient fade masks for smooth entrance and exit */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, #000000 25%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to left, #000000 25%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* Horizontal scrolling logo track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          padding: '0 80px',
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="logo-card"
            style={{
              width: '190px',
              height: '190px',
              flexShrink: 0,
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px',
              transition:
                'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, background-color 0.4s, box-shadow 0.4s',
              cursor: 'pointer'
            }}
          >
            <img
              src={item.src}
              alt={item.alt || ''}
              loading="lazy"
              style={{
                maxWidth: '90px',
                maxHeight: '90px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))',
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'transform 0.4s ease'
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .logo-card:hover {
          transform: translateY(-6px) scale(1.04);
          background-color: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 255, 255, 0.05);
        }
        .logo-card:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 768px) {
          .logo-card {
            width: 150px !important;
            height: 150px !important;
            padding: 20px !important;
            border-radius: 16px !important;
          }
          .logo-card img {
            max-width: 70px !important;
            max-height: 70px !important;
          }
        }
      `}</style>
    </section>
  );
}
