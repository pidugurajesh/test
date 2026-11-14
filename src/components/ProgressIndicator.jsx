import React from 'react';
import { Sparkles, Heart, Camera, CheckCircle2, Mail, Cake } from 'lucide-react';

const CHAPTERS = [
  { id: 1, title: 'Welcome', icon: Sparkles },
  { id: 2, title: '5 Months of Us', icon: Heart },
  { id: 3, title: 'Our Scrapbook', icon: Camera },
  { id: 4, title: '10 Reasons', icon: CheckCircle2 },
  { id: 5, title: 'Love Letter', icon: Mail },
  { id: 6, title: 'Birthday Surprise', icon: Cake },
];

export default function ProgressIndicator({ currentChapter, onSelectChapter }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] select-none">
      <nav 
        aria-label="Chapter progress"
        className="glass-panel px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 sm:gap-3 border border-blush/25 shadow-xl backdrop-blur-md"
      >
        {CHAPTERS.map((chapter) => {
          const Icon = chapter.icon;
          const isActive = currentChapter === chapter.id;
          const isPassed = currentChapter > chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500/80 to-rose-400/80 text-white shadow-md shadow-pink-500/20 scale-105'
                  : isPassed
                  ? 'text-blush hover:text-white hover:bg-white/10'
                  : 'text-cream/50 hover:text-cream/90 hover:bg-white/5'
              }`}
              title={chapter.title}
              aria-label={`Go to Chapter ${chapter.id}: ${chapter.title}`}
            >
              <Icon size={13} className={isActive ? 'animate-bounce' : ''} />
              <span className="hidden md:inline whitespace-nowrap">{chapter.title}</span>
              <span className="md:hidden text-[11px] font-semibold">{chapter.id}</span>
              
              {/* Active dot indicator on mobile */}
              {isActive && (
                <span className="md:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blush rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

