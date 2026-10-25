import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    label: 'ORACLE : Become an Oracle AI Database Foundations Associate',
    image: '/Certifications/oracle.jpg',
    url: null
  },
  {
    label: 'Apna Collage : DELTA (Full Stack Web Develepment)',
    image: '/Certifications/sigma-feb24-development.png',
    url: 'NULL'
  },
  {
    label: 'Apna Collage : ALPHA (DSA WITH JAVA)',
    image: '/Certifications/sigma-2-dsa.png',
    url: 'NULL'
  },
  {
    label: 'UDEMY : Complete Data Science , Machine Learning , DL , NLP , BOOTCAMP',
    image: '/Certifications/udemy.png',
    url: null
  }
];

const lerp = (a, b, t) => a + (b - a) * t;

export default function Certifications() {
  const listRef = useRef(null);
  const previewImgRef = useRef(null);
  const [activeImage, setActiveImage] = useState(CERTIFICATIONS[0].image);
  const [isMobile, setIsMobile] = useState(false);

  const targetState = useRef({ x: 0, y: 0, scale: 0 });
  const currentState = useRef({ x: 0, y: 0, scale: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Stagger entry animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = listRef.current?.children;
      if (items && items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Floating cursor follow spring loop
  useEffect(() => {
    if (isMobile) return;

    let frameId;
    const factor = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.12;

    const loop = () => {
      const cur = currentState.current;
      const tgt = targetState.current;

      cur.x = lerp(cur.x, tgt.x, factor);
      cur.y = lerp(cur.y, tgt.y, factor);
      cur.scale = lerp(cur.scale, tgt.scale, factor);

      const img = previewImgRef.current;
      if (img) {
        img.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%) scale(${cur.scale})`;
        img.style.opacity = String(cur.scale);
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    targetState.current.x = e.clientX;
    targetState.current.y = e.clientY;
  };

  const handleMouseEnter = (img) => {
    if (isMobile) return;
    setActiveImage(img);
    targetState.current.scale = 1;
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    targetState.current.scale = 0;
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '96px clamp(20px, 4vw, 64px)',
        background: '#F7F7F7',
        position: 'relative'
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-sofia), system-ui, sans-serif',
          fontSize: 'clamp(44px, 12vw, 96px)',
          fontWeight: 700,
          lineHeight: 1,
          color: '#101010',
          margin: '0 0 48px'
        }}
      >
        Certifications
      </h2>

      <div ref={listRef} style={{ borderTop: '1px solid #101010' }}>
        {CERTIFICATIONS.map((item, idx) => {
          const Tag = item.url ? 'a' : 'div';
          return (
            <Tag
              key={idx}
              href={item.url || undefined}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noopener noreferrer' : undefined}
              className="cert-row"
              onMouseEnter={() => handleMouseEnter(item.image)}
              onMouseLeave={handleMouseLeave}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 0',
                borderBottom: '1px solid #101010',
                color: '#101010',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 200ms ease, padding 200ms ease'
              }}
            >
              <span
                className="cert-label"
                style={{
                  fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                  fontSize: 'clamp(20px, 3.2vw, 32px)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)'
                }}
              >
                {item.label}
              </span>

              <span
                aria-hidden="true"
                className="cert-arrow"
                style={{
                  fontSize: '24px',
                  lineHeight: 1,
                  transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)'
                }}
              >
                →
              </span>
            </Tag>
          );
        })}
      </div>

      {/* Floating Certificate Preview Image */}
      {!isMobile && (
        <img
          ref={previewImgRef}
          src={activeImage}
          alt=""
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '440px',
            height: '320px',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 50,
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))'
          }}
        />
      )}

      <style>{`
        .cert-row:hover .cert-label {
          transform: translateX(12px);
        }
        .cert-row:hover .cert-arrow {
          transform: translateX(8px);
        }
      `}</style>
    </section>
  );
}
