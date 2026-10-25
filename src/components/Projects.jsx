import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: '01',
    title: 'LinkedIn Automation',
    description:
      'Designed to simplify professional content creation with AI-assisted writing, smart scheduling, and performance tracking. Built as a complete publishing platform that helps creators focus on ideas instead of repetitive workflows.',
    tags: ['FLASK', 'LINKEDIN API', 'MYSQL', 'React'],
    inProgress: false,
    image: '/images/linkedin-ai.png',
    link: 'https://github.com/Nisxzn/LinkedIn-Post-Automation',
    reverse: false
  },
  {
    num: '02',
    title: 'Fetchr RAG',
    description:
      'A Retrieval-Augmented Generation platform that transforms documents into searchable conversations. Upload files, retrieve relevant context, and interact through a fast, citation-aware chat experience powered by local language models.',
    tags: ['RAG', 'OLLAMA', 'LANGCHAIN', 'REACT'],
    inProgress: false,
    image: '/images/fetchr-rag.png',
    link: 'https://github.com/Nisxzn/Fetchr',
    reverse: true
  },
  {
    num: '03',
    title: 'Luna AI',
    description:
      'An AI-native workspace that brings conversations, coding, memory, and intelligent tools into one seamless environment. Designed to help developers build, explore, and iterate faster through context-aware assistance and an integrated workflow.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'OLLAMA', 'RAG'],
    inProgress: true,
    image: '/images/luna-ai.png',
    link: 'https://github.com/Nisxzn/Luna-AI-P-4',
    reverse: false
  }
];

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const articles = containerRef.current?.querySelectorAll('.project-article');
      if (articles && articles.length) {
        articles.forEach((art) => {
          gsap.fromTo(
            art,
            { opacity: 0, y: 70 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: art,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
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
          margin: '0 0 80px',
          willChange: 'transform'
        }}
      >
        Projects
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {PROJECTS.map((item, idx) => (
          <article
            key={idx}
            className={`project-article ${item.reverse ? 'reverse-layout' : ''}`}
            style={{
              display: 'flex',
              gap: '56px',
              alignItems: 'stretch',
              flexDirection: item.reverse ? 'row-reverse' : 'row'
            }}
          >
            {/* Image Container with Custom Cursor Trigger */}
            <div
              data-cursor="project"
              className="project-image-box"
              style={{
                flex: 1,
                minHeight: '340px',
                border: '7px solid #101010',
                boxShadow: '12px 12px 0 #D2D2D2',
                overflow: 'hidden',
                position: 'relative',
                background: '#000000',
                cursor: 'pointer'
              }}
              onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
            >
              <img
                alt={item.title}
                loading="lazy"
                src={item.image}
                className="project-img"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  left: 0,
                  top: 0,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 400ms cubic-bezier(0.2, 0, 0, 1)'
                }}
              />
            </div>

            {/* Content Details */}
            <div
              data-project-content="true"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                justifyContent: 'center'
              }}
            >
              {/* Hollow Outlined Number */}
              <span
                style={{
                  fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  fontWeight: 600,
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: '2px #D2D2D2'
                }}
              >
                {item.num}
              </span>

              {/* Title & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                    fontSize: 'clamp(26px, 3.2vw, 32px)',
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: '#101010',
                    margin: 0
                  }}
                >
                  {item.title}
                </h3>

                {item.inProgress && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      color: '#101010',
                      border: '1.5px solid #D2D2D2',
                      borderRadius: '999px',
                      padding: '6px 14px'
                    }}
                  >
                    <span
                      className="pill-dot"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#101010',
                        display: 'inline-block'
                      }}
                    />
                    In Progress
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-spline-mono), ui-monospace, monospace',
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#606060',
                  margin: 0
                }}
              >
                {item.description}
              </p>

              {/* Tech Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      color: '#101010',
                      border: '1.5px solid #D2D2D2',
                      padding: '8px 16px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-project-btn"
                style={{
                  alignSelf: 'flex-start',
                  fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  background: '#101010',
                  border: '2px solid #101010',
                  padding: '16px 32px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1), box-shadow 200ms cubic-bezier(0.2, 0, 0, 1), background 200ms cubic-bezier(0.2, 0, 0, 1)'
                }}
              >
                View Project
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .project-image-box:hover .project-img {
          transform: scale(1.06);
        }
        .view-project-btn:hover {
          transform: translateY(-3px);
          box-shadow: 4px 4px 0 #D2D2D2;
        }
        @media (max-width: 1024px) {
          .project-article,
          .project-article.reverse-layout {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .project-image-box {
            min-height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}
