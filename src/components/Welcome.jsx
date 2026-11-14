import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Headphones } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Welcome({ onOpenUniverse }) {
  const handleOpen = () => {
    // Launch a delicate burst of pastel heart confetti
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#F8C8DC', '#E8A0BF', '#FFF8F0', '#FF758F'],
      });
    } catch {
      // safe catch
    }
    onOpenUniverse();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 overflow-hidden z-10">
      {/* Soft central glowing halo */}
      <div className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-rose-400/15 blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Subtle Crown / Stars Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blush/30 shadow-lg text-xs uppercase tracking-widest text-soft-rose font-medium"
        >
          <Sparkles size={14} className="text-amber-200" />
          <span>A Magical Birthday Surprise</span>
          <Sparkles size={14} className="text-amber-200" />
        </motion.div>

        {/* Romantic Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cursive text-5xl sm:text-7xl md:text-8xl text-blush text-glow mb-6 leading-tight select-none"
        >
          Hey, My Princess...
        </motion.h1>

        {/* Poetic Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="space-y-3 mb-8 px-2"
        >
          <p className="font-playfair italic text-lg sm:text-2xl md:text-3xl text-cream/95 leading-relaxed font-normal">
            "Some people make the world more beautiful just by existing.
          </p>
          <p className="font-playfair italic text-lg sm:text-2xl md:text-3xl text-soft-rose font-medium">
            And for me, that person is you."
          </p>
        </motion.div>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="font-poppins text-xs sm:text-sm tracking-widest uppercase text-cream/70 mb-10"
        >
          Today, something special is waiting for you.
        </motion.p>

        {/* Grand Glowing Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative group"
        >
          {/* Pulsing glow under button */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-lavender opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          <button
            onClick={handleOpen}
            className="relative px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#e8a0bf] via-[#d8a1a9] to-[#c8b6e2] text-deep-purple font-poppins font-bold text-sm sm:text-base tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/40"
          >
            <span>Open Your Little Universe</span>
            <Heart size={20} className="fill-deep-purple text-deep-purple group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* Headphones subtle instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-12 flex items-center gap-2 text-cream/60 text-xs sm:text-sm font-poppins font-light"
        >
          <Headphones size={16} className="text-blush animate-bounce" />
          <span>Put on your headphones for a little magic 🎧</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

