import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTE_WORDS = [
  "I'm", "Swapnil", "Pagar,", "an", "AI", "&", "Data", "Science", "student", "who", "enjoys",
  "turning", "ideas", "into", "products", "people", "can", "actually", "use.",
  "Most", "of", "my", "time", "is", "spent", "building", "full-stack", "applications,", "exploring",
  "AI,", "and", "refining", "the", "details", "that", "make", "software", "feel", "effortless."
];

export default function AboutSection() {
  const quoteContainerRef = useRef(null);
  const quoteTextRef = useRef(null);
  const journeyTitleRef = useRef(null);
  const lineRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const p4Ref = useRef(null);
  const bebasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Word-by-word quote reveal
      if (quoteTextRef.current) {
        const words = quoteTextRef.current.querySelectorAll('.quote-word');
        gsap.fromTo(
          words,
          { color: '#606060', opacity: 0.25 },
          {
            color: '#FFFFFF',
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: {
              trigger: quoteContainerRef.current,
              start: 'top 75%',
              end: 'bottom 35%',
              scrub: 1
            }
          }
        );
      }

      // Journey title & line
      if (journeyTitleRef.current) {
        gsap.fromTo(
          journeyTitleRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: journeyTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.25,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: journeyTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Paragraphs entry
      [p1Ref.current, p2Ref.current].filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Bebas accent text
      if (bebasRef.current) {
        gsap.fromTo(
          bebasRef.current,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            duration: 1.7,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: bebasRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Scrubbed trailing paragraphs
      [p3Ref.current, p4Ref.current].filter(Boolean).forEach((el, idx) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: idx === 0 ? 'top 95%' : 'top 90%',
              end: idx === 0 ? 'top 45%' : 'top 40%',
              scrub: 2
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: '#000000', color: '#FFFFFF', position: 'relative' }}>
      {/* Viewport Pinned Quote */}
      <div
        ref={quoteContainerRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          background: '#000000',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1000px', width: '100%', padding: '0 64px' }}>
          <p
            ref={quoteTextRef}
            style={{
              fontFamily: 'var(--font-sofia), system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(24px, 5vw, 64px)',
              lineHeight: 1.18,
              textAlign: 'center',
              color: '#606060',
              margin: 0
            }}
          >
            {QUOTE_WORDS.map((w, idx) => (
              <span key={idx} className="quote-word" style={{ display: 'inline-block', marginRight: '0.28em' }}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Narrative Story Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#000000',
          minHeight: '100vh'
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '120px 64px',
            background: '#000000'
          }}
        >
          {/* Section Header */}
          <div ref={journeyTitleRef} style={{ marginBottom: '48px', position: 'relative' }}>
            <h2
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '20px',
                fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#AAAAAA',
                margin: 0
              }}
            >
              My Journey So Far
              <span style={{ fontWeight: 400, fontSize: 'calc(24px * 0.85)' }}>↘</span>
            </h2>
            <span
              ref={lineRef}
              style={{
                display: 'block',
                marginTop: '12px',
                height: '1px',
                width: '100%',
                maxWidth: '280px',
                background: 'rgba(255, 255, 255, 0.3)',
                transformOrigin: 'left',
                transform: 'scaleX(0)'
              }}
            />
          </div>

          {/* Paragraph 1 */}
          <p
            ref={p1Ref}
            className="journey-p1"
            style={{
              fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: 1.45,
              color: '#FFFFFF',
              maxWidth: '550px',
              margin: '0 0 28px',
              position: 'relative',
              left: '-100px'
            }}
          >
            I didn't begin with AI—I began with curiosity. Building small projects taught me more than tutorials ever could, and every challenge pushed me to explore a little deeper.
          </p>

          {/* Paragraph 2 + Portrait + Bebas Quote */}
          <div
            className="journey-row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '56px',
              alignItems: 'flex-start',
              marginBottom: '100px',
              position: 'relative'
            }}
          >
            <div style={{ flex: 1, paddingTop: '8px' }}>
              <p
                ref={p2Ref}
                className="journey-p2"
                style={{
                  fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: '#FFFFFF',
                  margin: '0 0 28px',
                  maxWidth: '550px',
                  position: 'relative',
                  left: '100px'
                }}
              >
                As I kept building, I realized great products aren't just about writing code. They're about connecting ideas, solving real problems, and creating experiences people genuinely enjoy using.
              </p>

              <div
                ref={imageRef}
                role="img"
                aria-label="Swapnil Pagar at work"
                className="journey-portrait"
                style={{
                  flex: 'none',
                  width: '200px',
                  height: '300px',
                  borderRadius: '2px',
                  background: "url('/images/about_portrait.jpg') center/cover no-repeat",
                  position: 'relative',
                  right: '-150px'
                }}
              />

              <p
                ref={bebasRef}
                className="journey-bebas"
                style={{
                  fontFamily: 'var(--font-bebas-neue), sans-serif',
                  fontWeight: 700,
                  fontSize: '38px',
                  lineHeight: 1.2,
                  color: '#FFFFFF',
                  margin: '0 0 26px',
                  position: 'relative',
                  right: '-400px',
                  top: '-180px',
                  textAlign: 'left'
                }}
              >
                <u>That's where engineering found me.</u>
              </p>
            </div>
          </div>

          {/* Paragraph 3 */}
          <p
            ref={p3Ref}
            className="journey-p3"
            style={{
              fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: 1.45,
              color: '#FFFFFF',
              maxWidth: '550px',
              margin: '0 0 36px',
              position: 'relative',
              left: '500px',
              top: '-100px',
              opacity: 0.15
            }}
          >
            Today, I build full-stack applications, AI-powered tools, and developer experiences. I enjoy exploring new technologies, experimenting with ideas, and turning concepts into products that feel purposeful.
          </p>

          {/* Paragraph 4 */}
          <p
            ref={p4Ref}
            className="journey-p4"
            style={{
              fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: 1.45,
              color: '#FFFFFF',
              maxWidth: '550px',
              margin: '0 0 100px',
              position: 'relative',
              left: '650px',
              top: '-100px',
              opacity: 0.15
            }}
          >
            Every project teaches me something new. That constant cycle of learning, building, and improving is what keeps me excited about creating what's next.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .journey-p1, .journey-p2, .journey-p3, .journey-p4 {
            left: 0 !important;
            top: 0 !important;
            max-width: 100% !important;
          }
          .journey-row {
            flex-direction: column !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }
          .journey-portrait {
            right: 0 !important;
            margin: 24px auto !important;
          }
          .journey-bebas {
            right: 0 !important;
            top: 0 !important;
            text-align: center !important;
            margin: 24px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
