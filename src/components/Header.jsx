import React from 'react';

export default function Header() {
  return (
    <header
      style={{
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        padding: '34px 64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10
      }}
    >
      <a
        href="#top"
        data-reveal-up="true"
        aria-label="Nithish Parameswaran — Home"
        className="header-logo"
        style={{
          fontSize: '34px',
          fontWeight: 400,
          fontStyle: 'normal',
          letterSpacing: '0.5px',
          lineHeight: 1,
          color: '#101010',
          textDecoration: 'none',
          fontFamily: 'var(--font-pacifico), cursive',
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '44px',
          position: 'relative',
          animationDelay: '0.05s'
        }}
      >
        SWAPNIL
      </a>

      <nav
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'nowrap',
          flexShrink: 0,
          justifyContent: 'flex-end'
        }}
      >
        <a
          className="btn"
          href="#connect"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px'
          }}
        >
          Connect
        </a>
        <a
          className="btn"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px'
          }}
        >
          Resume
        </a>
      </nav>

      <style>{`
        @media (min-width: 1440px) {
          .header-logo {
            left: -100px;
          }
        }
        @media (min-width: 1280px) and (max-width: 1439px) {
          .header-logo {
            left: -40px;
          }
        }
        @media (max-width: 768px) {
          header {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </header>
  );
}
