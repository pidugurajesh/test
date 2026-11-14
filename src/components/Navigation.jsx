import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const CHAPTER_NAMES = [
  'Welcome 🌙',
  '5 Months of Us ❤️',
  'Our Scrapbook 📸',
  '10 Reasons 💗',
  'A Heartfelt Letter 💌',
  'The Birthday Cake 🎂'
];

export default function Navigation({ currentChapter, onNext, onPrev, totalChapters = 6 }) {
  if (currentChapter === 1) return null; // Chapter 1 has its own grand entrance button

  const prevName = currentChapter > 1 ? CHAPTER_NAMES[currentChapter - 2] : '';
  const nextName = currentChapter < totalChapters ? CHAPTER_NAMES[currentChapter] : '';

  return (
    <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-none">
      <div className="glass-panel px-4 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-blush/25 backdrop-blur-xl pointer-events-auto">
        {/* Previous Button */}
        {currentChapter > 1 ? (
          <button
            onClick={onPrev}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-cream/90 hover:text-blush transition-all text-xs font-medium active:scale-95"
            title={`Previous: ${prevName}`}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {/* Current Chapter Tag */}
        <div className="text-center px-2">
          <span className="text-[11px] uppercase tracking-wider text-soft-rose/90 font-medium block">
            Chapter {currentChapter} of {totalChapters}
          </span>
          <span className="text-xs font-semibold text-cream truncate max-w-[150px] inline-block">
            {CHAPTER_NAMES[currentChapter - 1]}
          </span>
        </div>

        {/* Next Button */}
        {currentChapter < totalChapters ? (
          <button
            onClick={onNext}
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-400 hover:to-rose-300 text-white shadow-md shadow-pink-500/25 transition-all text-xs font-medium active:scale-95"
            title={`Next: ${nextName}`}
          >
            <span>Next</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="w-16 flex justify-end">
            <span className="text-xs text-soft-rose flex items-center gap-1">
              <Sparkles size={14} className="text-blush animate-spin" />
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}

