import React from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CustomScrollbar from './components/CustomScrollbar';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import InfiniteGallery from './components/InfiniteGallery';
import Principles from './components/Principles';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <CustomScrollbar />
      <main style={{ minHeight: '100%', width: '100%', overflowX: 'hidden' }}>
        <Header />
        <Hero />
        <AboutSection />
        <InfiniteGallery />
        <Principles />
        <Projects />
        <Certifications />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
