import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DEFAULT_IMAGES = [
  { src: '/images/java.png' },
  { src: '/images/python.png' },
  { src: '/images/cpp.png' },
  { src: '/images/javascript.png' },
  { src: '/images/tailwind.png' },
  { src: '/images/react.png' },
  { src: '/images/postgres.png' },
  { src: '/images/mongodb.png' },
  { src: '/images/Git.png' }
];

const DEFAULT_HEADINGS = ['Languages', 'Frameworks', 'Database', 'Version Control'];
const DEFAULT_STOPS = [0, 4, 6, 8];

const OFFSETS = [
  { x: -1.8, y: 0.8, rot: -0.08 },
  { x: 1.9, y: 1.0, rot: 0.07 },
  { x: -2.0, y: -0.9, rot: -0.06 },
  { x: 2.0, y: -0.8, rot: 0.09 },
  { x: -1.3, y: 1.2, rot: 0.05 },
  { x: 0.3, y: -1.3, rot: -0.04 },
  { x: 1.4, y: 1.1, rot: 0.11 },
  { x: -0.8, y: -1.1, rot: -0.05 },
  { x: 1.1, y: -0.7, rot: 0.08 }
];

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export default function InfiniteGallery({
  images = DEFAULT_IMAGES,
  headings = DEFAULT_HEADINGS,
  headingStops = DEFAULT_STOPS,
  zSpacing = 6
}) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const scrollProgress = useRef(0);

  // Responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const vhPerImage = isMobile ? 85 : 68;
  const planeSize = isMobile ? [1.8, 1.8] : [2.35, 2.35];

  // Three.js Scene Setup & Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Texture Loader & Meshes
    const textureLoader = new THREE.TextureLoader();
    const planeGeometry = new THREE.PlaneGeometry(planeSize[0], planeSize[1]);
    const meshes = [];

    images.forEach((img, idx) => {
      const offset = OFFSETS[idx % OFFSETS.length];
      const texture = textureLoader.load(img.src);
      texture.generateMipmaps = true;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        toneMapped: false
      });

      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.position.set(offset.x, offset.y, -idx * zSpacing);
      mesh.rotation.z = offset.rot;

      scene.add(mesh);
      meshes.push(mesh);
    });

    const totalZ = (images.length - 1) * zSpacing;
    const maxCameraTravel = totalZ + 14;

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation / Render loop
    let frameId;
    const render = () => {
      const p = scrollProgress.current;

      // Move camera along Z axis
      camera.position.z = 9 - p * maxCameraTravel;

      // Update mesh opacities
      meshes.forEach((mesh, idx) => {
        const meshZ = -idx * zSpacing;
        const dist = camera.position.z - meshZ;
        // Fade in as camera nears 9 units away, fade out as it flies past
        const opacity = clamp(1 - Math.abs(dist - 9) / 4, 0, 1);
        mesh.material.opacity = opacity;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      meshes.forEach((m) => {
        m.geometry.dispose();
        if (m.material.map) m.material.map.dispose();
        m.material.dispose();
      });
      renderer.dispose();
    };
  }, [images, zSpacing, isMobile]);

  // Scroll pinning & progress tracking
  useEffect(() => {
    const totalZ = (images.length - 1) * zSpacing;
    const maxTravel = totalZ + 14;
    const fadeWindow = ((isMobile ? 1.8 : 1.2) * zSpacing) / maxTravel;

    const onScroll = () => {
      const container = containerRef.current;
      const viewport = viewportRef.current;
      if (!container || !viewport) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const progress = scrollableHeight > 0 ? clamp(-rect.top / scrollableHeight, 0, 1) : 0;
      scrollProgress.current = progress;

      // Sticky pinning logic
      if (rect.top > 0) {
        viewport.style.position = 'absolute';
        viewport.style.top = '0px';
        viewport.style.bottom = '';
      } else if (rect.bottom < window.innerHeight) {
        viewport.style.position = 'absolute';
        viewport.style.top = '';
        viewport.style.bottom = '0px';
      } else {
        viewport.style.position = 'fixed';
        viewport.style.top = '0px';
        viewport.style.bottom = '';
      }

      // Update heading opacities
      headingRefs.current.forEach((el, idx) => {
        if (!el) return;
        const stopZ = (headingStops[idx] ?? idx) * zSpacing;
        const targetP = clamp(stopZ / maxTravel, 0, 1);
        const opacity = clamp(1 - Math.abs(progress - targetP) / fadeWindow, 0, 1);
        el.style.opacity = String(opacity);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [images.length, zSpacing, headingStops, isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${(images.length + 1) * vhPerImage}vh`,
        background: '#000000',
        zIndex: 2
      }}
    >
      <div
        ref={viewportRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            pointerEvents: 'none'
          }}
        />

        {/* Headings Overlay */}
        {headings.map((heading, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <h3
              ref={(el) => {
                headingRefs.current[idx] = el;
              }}
              style={{
                fontFamily: 'var(--font-sofia), system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(48px, 12vw, 96px)',
                lineHeight: 1,
                margin: 0,
                color: '#FFFFFF',
                textAlign: 'center',
                padding: '0 24px',
                opacity: 0,
                willChange: 'opacity',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)'
              }}
            >
              {heading}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
