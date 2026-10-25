import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const portraitRef = useRef(null);
  const aboutHeadingRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Portrait parallax
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { y: 35 },
          {
            y: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: portraitRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }

      // "About Me" letters stagger reveal
      if (aboutHeadingRef.current) {
        const spans = aboutHeadingRef.current.querySelectorAll('.letter-span');
        gsap.set(spans, { opacity: 0, y: -80 });
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: aboutHeadingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      style={{
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        padding: '0 64px 0',
        position: 'relative',
        minHeight: '1100px'
      }}
    >
      {/* Subtitle */}
      <div
        data-reveal-up="true"
        style={{
          fontFamily: 'var(--font-sofia), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: '#606060',
          lineHeight: 1,
          marginBottom: '4px',
          textAlign: 'left',
          animationDelay: '0.04s'
        }}
      >
        HEY, THERE I'm Swapnil Pagar
      </div>

      {/* Backdrop decorative panel */}
      <div style={{ position: 'relative' }}>
        <div
          className="hero-backdrop"
          style={{
            position: 'absolute',
            right: '20px',
            top: '10px',
            width: '850px',
            height: '660px',
            background: '#EFEFEF',
            borderRadius: '21px',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Main headline Swapnil */}
      <h1
        data-reveal-up="true"
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'var(--font-playfair), serif',
          fontWeight: 600,
          fontSize: 'clamp(72px, 22vw, 300px)',
          lineHeight: 0.86,
          letterSpacing: '-6px',
          margin: '-28px 0 0',
          color: '#101010',
          textAlign: 'left',
          animationDelay: '0.10s'
        }}
      >
        Swapnil
        <span className="sr-only"> Swapnil Pagar — Full Stack AI/ML Engineer</span>
      </h1>

      {/* Tagline */}
      <p
        data-reveal-up="true"
        className="hero-tagline"
        style={{
          position: 'absolute',
          left: '300px',
          top: '320px',
          width: '500px',
          zIndex: 3,
          fontFamily: 'var(--font-sofia), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: '#606060',
          lineHeight: 1.75,
          margin: 0,
          marginTop: 0,
          textAlign: 'left',
          animationDelay: '0.16s'
        }}
      >
        Building software that thinks, learns, and scales.
      </p>

      {/* Roles Tag */}
      <div
        data-reveal-up="true"
        className="hero-roles"
        style={{
          position: 'absolute',
          left: '510px',
          top: '570px',
          marginTop: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          animationDelay: '0.22s'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#101010'
          }}
        >
          FULL STACK,
        </span>
        <span
          style={{
            fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#101010'
          }}
        >
          AI/ML ENGINEER
        </span>
      </div>

      {/* About Container & Hero Portrait Card */}
      <div
        id="about"
        className="hero-about-container"
        style={{
          width: '1300px',
          maxWidth: '100%',
          height: '500px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <div
          ref={portraitRef}
          className="hero-portrait-card"
          style={{
            position: 'absolute',
            top: '-100px',
            left: '700px',
            width: '530px',
            height: '500px',
            borderRadius: '17px',
            overflow: 'hidden',
            opacity: 0.92,
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1
          }}
        >
          <img
            alt="Swapnil Pagar - Full Stack AI/ML Engineer"
            src="/images/hero_portrait3.png"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        </div>
      </div>

      {/* Staggered "About Me" Heading */}
      <h2
        ref={aboutHeadingRef}
        className="hero-about-heading"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '800px',
          zIndex: 2,
          fontFamily: 'var(--font-playfair), serif',
          fontWeight: 700,
          fontSize: 'clamp(56px, 16vw, 200px)',
          lineHeight: 1,
          margin: 0,
          marginTop: 0,
          whiteSpace: 'nowrap',
          textAlign: 'left',
          color: '#101010'
        }}
      >
        {'About Me'.split('').map((char, idx) => (
          <span
            key={idx}
            className="letter-span"
            style={{
              display: 'inline-block',
              whiteSpace: 'pre'
            }}
          >
            {char}
          </span>
        ))}
      </h2>

      <style>{`
        @media (max-width: 1024px) {
          #top {
            min-height: auto !important;
            padding: 0 24px 80px !important;
          }
          .hero-backdrop {
            display: none !important;
          }
          .hero-tagline {
            position: static !important;
            width: 100% !important;
            margin-top: 24px !important;
            text-align: left !important;
          }
          .hero-roles {
            position: static !important;
            margin-top: 24px !important;
          }
          .hero-about-container {
            width: 100% !important;
            height: auto !important;
            margin-top: 32px !important;
          }
          .hero-portrait-card {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 530px !important;
            height: 480px !important;
            margin: 0 auto !important;
          }
          .hero-about-heading {
            position: static !important;
            transform: none !important;
            margin-top: 48px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
