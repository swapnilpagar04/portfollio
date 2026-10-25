import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'HOME', href: '#top' },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'WORK', href: '#work' }
];

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/swapnil_pagar.04/', aria: 'Swapnil on Instagram' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/swapnil-pagar-777204274/', aria: 'Swapnil on LinkedIn' },
  { label: 'GITHUB', href: 'https://github.com/swapnilpagar04', aria: 'Swapnil on GitHub' },
  { label: 'LEETCODE', href: 'https://leetcode.com/u/swapnil_04/', aria: 'Swapnil on LeetCode' }
];

const WORDMARK = 'SWAPNIL';

export default function Footer() {
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (wordmarkRef.current) {
        const spans = wordmarkRef.current.querySelectorAll('.wordmark-letter');
        gsap.set(spans, { opacity: 0, y: 80 });
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1.6,
          stagger: 0.14,
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer id="connect" className="footer-root">
        <div className="footer-columns">
          {/* Left Column */}
          <div className="footer-col-main">
            <div className="footer-status-pill">
              <span className="pill-dot footer-dot" />
              <span>Available for work</span>
            </div>

            <h2 className="footer-heading">Let's Connect</h2>

            <p className="footer-bio">
              I build intelligent systems and creative digital experiences.
            </p>

            <nav className="footer-nav" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer-underline-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="footer-col-contact">
            {/* Email */}
            <div className="footer-field">
              <span className="footer-field-label">Email</span>
              <a
                href="mailto:swapnilpagar04@gmail.com"
                className="footer-contact-link footer-contact-email"
              >
                swapnilpagar04@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="footer-field">
              <span className="footer-field-label">Phone</span>
              <a
                href="tel:+919322930451"
                className="footer-contact-link footer-contact-phone"
              >
                +91 93229-30451
              </a>
            </div>

            {/* Follow Card */}
            <div className="footer-social-card">
              <span className="footer-field-label">Follow</span>
              <div className="footer-social-links">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.aria}
                    className="footer-underline-link"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="footer-bottom-bar">
          <span>© 2026</span>
          <span>Based in Coimbatore</span>
          <span>Designed &amp; crafted by Swapnil Pagar</span>
          <a href="#top" className="footer-back-to-top">
            Back to top ↑
          </a>
        </div>
      </footer>

      {/* Giant Footer Wordmark */}
      <div className="footer-wordmark-wrap">
        <h2 ref={wordmarkRef} className="footer-wordmark">
          {WORDMARK.split('').map((char, idx) => (
            <span key={idx} className="wordmark-letter">
              {char}
            </span>
          ))}
          <span className="sr-only">Swapnil Pagar</span>
        </h2>
      </div>

      <style>{`
        .footer-root {
          max-width: 1440px;
          margin: 0 auto;
          padding: 96px clamp(20px, 4vw, 64px) 32px;
          background: var(--color-bg, #f7f7f7);
          box-sizing: border-box;
        }

        .footer-columns {
          display: flex;
          flex-direction: row;
          gap: 80px;
          border-bottom: 1px solid var(--color-border, #d2d2d2);
          padding-bottom: 48px;
        }

        .footer-col-main {
          flex: 1;
        }

        .footer-col-contact {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--color-text-primary, #101010);
          border: 1.5px solid var(--color-border, #d2d2d2);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 24px;
        }

        .footer-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-text-primary, #101010);
          display: inline-block;
        }

        .footer-heading {
          font-family: var(--font-display);
          font-size: clamp(38px, 4.5vw, 48px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--color-text-primary, #101010);
          margin: 0 0 24px;
        }

        .footer-bio {
          font-family: var(--font-mono);
          font-size: 16px;
          line-height: 1.75;
          color: var(--color-text-secondary, #606060);
          max-width: 380px;
          margin: 0 0 48px;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .footer-field {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .footer-field-label {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--color-text-secondary, #606060);
        }

        .footer-underline-link {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-text-primary, #101010);
          color: var(--color-text-primary, #101010);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition: opacity var(--motion-base, 0.2s) var(--ease-standard),
                      transform var(--motion-base, 0.2s) var(--ease-standard);
        }

        .footer-underline-link:hover {
          opacity: 0.6;
          transform: translateY(-2px);
        }

        .footer-contact-link {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-text-primary, #101010);
          color: var(--color-text-primary, #101010);
          text-decoration: none;
          font-family: var(--font-body);
          line-height: 1;
          transition: opacity var(--motion-base, 0.2s) var(--ease-standard),
                      transform var(--motion-base, 0.2s) var(--ease-standard);
        }

        .footer-contact-link:hover {
          opacity: 0.6;
          transform: translateY(-2px);
        }

        .footer-contact-email {
          font-size: clamp(20px, 2.5vw, 32px);
          word-break: break-all;
        }

        .footer-contact-phone {
          font-size: clamp(22px, 2.8vw, 32px);
        }

        .footer-social-card {
          border: 1px solid var(--color-border, #d2d2d2);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-social-links {
          display: flex;
          gap: clamp(16px, 3vw, 40px);
          flex-wrap: wrap;
        }

        .footer-bottom-bar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--color-text-muted, #aaa);
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-back-to-top {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          color: inherit;
          text-decoration: none;
          transition: opacity var(--motion-base, 0.2s) var(--ease-standard);
        }

        .footer-back-to-top:hover {
          opacity: 0.6;
        }

        .footer-wordmark-wrap {
          overflow: hidden;
          background: var(--color-bg, #f7f7f7);
          padding: 24px 0 0;
          user-select: none;
          pointer-events: none;
        }

        .footer-wordmark {
          font-family: var(--font-display);
          font-size: clamp(64px, 22vw, 300px);
          font-weight: 900;
          line-height: 0.82;
          letter-spacing: -0.04em;
          text-align: center;
          color: var(--color-text-primary, #101010);
          margin: 0;
          will-change: transform, opacity;
        }

        .wordmark-letter {
          display: inline-block;
          will-change: transform, opacity;
        }

        @media (max-width: 1024px) {
          .footer-columns {
            flex-direction: column;
            gap: 48px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
