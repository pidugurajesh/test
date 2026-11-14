import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Sparkles, Heart, Flame, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdaySurprise({ onReplay }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);

    // Multi-burst romantic confetti explosion
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#F8C8DC', '#E8A0BF', '#FFD700', '#FF758F', '#C8B6E2', '#FFFFFF'];

    (function frame() {
      try {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      } catch {
        // safe catch
      }
    })();

    // Reveal final message after brief moment
    setTimeout(() => {
      setWishMade(true);
    }, 900);
  };

  const handleReset = () => {
    setCandlesBlown(false);
    setWishMade(false);
    if (onReplay) onReplay();
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10">
      {/* Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-blush/25 text-xs uppercase tracking-widest text-soft-rose mb-4"
      >
        <Cake size={13} className="text-pink-400" />
        <span>Chapter 6: The Grand Celebration</span>
        <Cake size={13} className="text-pink-400" />
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-playfair text-3xl sm:text-5xl md:text-6xl text-cream font-bold mb-3"
      >
        Happy Birthday, My Princess!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-cursive text-2xl sm:text-3xl text-blush text-glow mb-10"
      >
        {!candlesBlown ? "Make a wish, Princess! ✨" : "Your wish has been carried to the stars 💫"}
      </motion.p>

      {/* 3D-STYLE LAYERED BIRTHDAY CAKE */}
      <div className="relative my-6 flex flex-col items-center select-none">
        {/* Soft magical glow under the cake */}
        <div className="absolute -inset-10 bg-gradient-to-t from-pink-500/25 via-rose-400/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        {/* CANDLES ROW ON TOP OF CAKE */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
          {[1, 2, 3].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center">
              {/* Candle Flame / Smoke */}
              <div className="h-8 flex items-center justify-center">
                {!candlesBlown ? (
                  <div className="relative">
                    {/* Glowing outer flame halo */}
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-pulse blur-[1px] shadow-[0_0_15px_#f59e0b]" />
                    {/* Inner flame core */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-3.5 rounded-full bg-white opacity-90" />
                  </div>
                ) : (
                  /* Smoke puff after blowing */
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1.2 }}
                    className="text-neutral-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-neutral-700" />

              {/* Candle Body (Striped Pastel) */}
              <div
                className="w-3.5 h-12 rounded-t-sm shadow-md border-x border-pink-300"
                style={{
                  background: 'repeating-linear-gradient(45deg, #FFF, #FFF 4px, #FF758F 4px, #FF758F 8px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* TOP CAKE LAYER */}
        <div className="relative z-10 w-44 sm:w-52 h-16 bg-gradient-to-b from-[#F8C8DC] to-[#E8A0BF] rounded-t-2xl shadow-lg border-t-2 border-white/60 flex flex-col justify-between overflow-hidden">
          {/* Decorative frosting drips */}
          <div className="w-full h-4 bg-white/70 rounded-b-xl shadow-inner flex justify-around px-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-2.5 h-3 bg-white/80 rounded-b-full shadow-sm" />
            ))}
          </div>
          {/* Strawberries / Flowers on cake */}
          <div className="flex justify-around items-center px-4 pb-2">
            <span className="text-base drop-shadow-sm">🍓</span>
            <span className="text-xs">🌸</span>
            <span className="text-base drop-shadow-sm">🍓</span>
          </div>
        </div>

        {/* MIDDLE / BOTTOM CAKE LAYER */}
        <div className="relative z-0 w-60 sm:w-72 h-22 bg-gradient-to-b from-[#E8A0BF] to-[#D8A1A9] rounded-t-2xl shadow-2xl border-t-2 border-pink-200/60 flex flex-col justify-between overflow-hidden -mt-1">
          {/* Middle Frosting Ribbon */}
          <div className="w-full h-5 bg-white/85 shadow-md flex justify-around px-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-3 h-4 bg-white/90 rounded-b-full shadow-sm" />
            ))}
          </div>

          {/* Golden Birthday Plate Rim */}
          <div className="flex items-center justify-center pb-2">
            <span className="font-cursive text-xl sm:text-2xl text-deep-purple font-bold tracking-wide">
              Princess Meenu ✨
            </span>
          </div>
        </div>

        {/* CAKE STAND / GOLDEN PEDESTAL */}
        <div className="w-72 sm:w-88 h-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-2xl border border-amber-300/60 -mt-1" />
        <div className="w-28 sm:w-36 h-3 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 rounded-b-md shadow-lg" />
      </div>

      {/* INTERACTIVE BUTTON: BLOW CANDLES */}
      {!candlesBlown ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6"
        >
          <button
            onClick={handleBlowCandles}
            className="group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-deep-purple font-poppins font-bold text-sm sm:text-base tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/50"
          >
            <Wind size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Blow the Candles ✨</span>
            <Sparkles size={18} />
          </button>
        </motion.div>
      ) : null}

      {/* FINAL BIRTHDAY MESSAGE (REVEALED AFTER BLOWING CANDLES) */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-8 max-w-2xl w-full glass-panel-glow p-8 sm:p-10 rounded-3xl border border-blush/40 shadow-2xl text-center relative overflow-hidden"
          >
            {/* Soft pink particles inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-12 h-12 rounded-full bg-pink-500/20 mx-auto flex items-center justify-center text-blush mb-4 border border-blush/30 shadow-inner">
              <Heart size={24} className="fill-blush text-blush animate-pulse" />
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-blush text-glow mb-6">
              Happy Birthday, Meenu! ❤️
            </h3>

            <div className="space-y-4 font-poppins text-cream/95 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                "Out of all the beautiful things in this universe, meeting you is one of my favourites.
              </p>
              <p>
                I hope your life is always filled with happiness, love, laughter, and dreams coming true.
              </p>
              <p className="font-semibold text-soft-rose">
                You deserve the entire universe, Princess."
              </p>
            </div>

            <div className="border-t border-blush/25 pt-6 flex flex-col items-center">
              <span className="font-cursive text-3xl sm:text-4xl text-blush font-bold mb-6">
                Forever my favourite person.
              </span>

              {/* Replay Button */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-cream/90 hover:text-white border border-blush/30 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw size={14} />
                <span>Experience The Magic Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

