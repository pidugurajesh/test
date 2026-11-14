import React, { useState, useRef, useEffect } from 'react';
import Welcome from './components/Welcome';
import OurJourney from './components/OurJourney';
import Memories from './components/Memories';
import Reasons from './components/Reasons';
import LoveLetter from './components/LoveLetter';
import BirthdaySurprise from './components/BirthdaySurprise';
import FloatingHearts from './components/FloatingHearts';
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import ProgressIndicator from './components/ProgressIndicator';
import Navigation from './components/Navigation';
import EasterEgg from './components/EasterEgg';
import { useMusic } from './hooks/useMusic';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const music = useMusic();

  // References to each section for smooth scrolling
  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
  };

  const scrollToChapter = (chapterNumber) => {
    setCurrentChapter(chapterNumber);
    const targetRef = sectionRefs[chapterNumber];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenUniverse = () => {
    music.startMusic();
    scrollToChapter(2);
  };

  const handleNext = () => {
    if (currentChapter < 6) {
      scrollToChapter(currentChapter + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 1) {
      scrollToChapter(currentChapter - 1);
    }
  };

  // Observe scroll position to automatically update currentChapter indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 6; i >= 1; i--) {
        const el = sectionRefs[i]?.current;
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentChapter(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-deep-purple text-cream selection:bg-rose-gold selection:text-deep-purple font-poppins overflow-x-hidden">
      {/* Background Ambience: Floating Hearts, Stars & Light Flares */}
      <FloatingHearts />

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Persistent Music Player */}
      <MusicPlayer music={music} />

      {/* Top Chapter Breadcrumbs / Navigation Progress */}
      {currentChapter > 1 && (
        <ProgressIndicator
          currentChapter={currentChapter}
          onSelectChapter={scrollToChapter}
        />
      )}

      {/* Bottom Floating Navigation (Previous / Next Chapter) */}
      <Navigation
        currentChapter={currentChapter}
        onNext={handleNext}
        onPrev={handlePrev}
        totalChapters={6}
      />

      {/* Secret Easter Egg Glowing Star in the Night Sky */}
      <EasterEgg />

      {/* MAIN STORYLINE CHAPTERS */}
      <main className="relative z-10 flex flex-col">
        {/* CHAPTER 1: The Magical Welcome */}
        <div ref={sectionRefs[1]} id="chapter-1" className="min-h-screen flex items-center justify-center">
          <Welcome onOpenUniverse={handleOpenUniverse} />
        </div>

        {/* CHAPTER 2: Five Months of Us */}
        <div ref={sectionRefs[2]} id="chapter-2" className="min-h-screen flex items-center justify-center py-12">
          <OurJourney />
        </div>

        {/* CHAPTER 3: Our Little Scrapbook */}
        <div ref={sectionRefs[3]} id="chapter-3" className="min-h-screen flex items-center justify-center py-12">
          <Memories />
        </div>

        {/* CHAPTER 4: 10 Reasons Why You Are My Princess */}
        <div ref={sectionRefs[4]} id="chapter-4" className="min-h-screen flex items-center justify-center py-12">
          <Reasons />
        </div>

        {/* CHAPTER 5: A Letter From My Heart */}
        <div ref={sectionRefs[5]} id="chapter-5" className="min-h-screen flex items-center justify-center py-12">
          <LoveLetter />
        </div>

        {/* CHAPTER 6: The Final Birthday Surprise */}
        <div ref={sectionRefs[6]} id="chapter-6" className="min-h-screen flex items-center justify-center py-12 pb-28">
          <BirthdaySurprise onReplay={() => scrollToChapter(1)} />
        </div>
      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 py-8 text-center text-xs text-cream/40 border-t border-white/5 pb-24 sm:pb-20">
        <p>Made with all my heart for Princess Meenu ❤️ • 15 November</p>
      </footer>
    </div>
  );
}

