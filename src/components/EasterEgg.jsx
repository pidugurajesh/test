import React, { useState } from 'react';
import { Star, Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Gentle pink/gold heart confetti
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F8C8DC', '#E8A0BF', '#FFF8F0', '#FFD700'],
      });
    } catch {
      // safe catch
    }
  };

  return (
    <>
      {/* Hidden Glowing Star Easter Egg */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-30 p-2.5 rounded-full text-blush/70 hover:text-amber-200 transition-all duration-500 hover:scale-125 focus:outline-none group"
        title="✨ A little secret in the night sky..."
        aria-label="Secret Easter Egg Star"
      >
        <div className="relative">
          <Star
            size={18}
            className="animate-spin text-amber-200/80 fill-amber-200/40 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] transition-all duration-300 group-hover:fill-amber-200"
            style={{ animationDuration: '10s' }}
          />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-100"></span>
          </span>
        </div>
      </button>

      {/* Secret Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-sm w-full glass-panel-deep p-6 sm:p-8 rounded-3xl border border-blush/40 shadow-2xl text-center transform transition-all scale-100 animate-in fade-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-cream/60 hover:text-blush p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close message"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon */}
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500/30 to-amber-300/30 flex items-center justify-center mb-4 border border-blush/30 shadow-lg shadow-pink-500/20">
              <Sparkles className="text-amber-300 animate-pulse" size={26} />
            </div>

            <span className="text-xs uppercase tracking-widest text-soft-rose font-medium block mb-2">
              A Secret Whisper ✨
            </span>

            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cream mb-4">
              You Found My Little Star!
            </h3>

            <div className="bg-white/5 rounded-2xl p-4 border border-blush/15 mb-6">
              <p className="font-poppins text-sm sm:text-base text-cream/95 leading-relaxed font-medium">
                "Hey Princess! Just a little reminder that someone is smiling right now because you exist. ❤️"
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-400 hover:to-rose-300 text-white font-medium text-sm shadow-lg shadow-pink-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Keep Smiling, Princess</span>
              <Heart size={14} className="fill-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

