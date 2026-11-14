import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveLetterData } from '../data/letter';
import { Mail, Heart, Sparkles, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const { recipient, paragraphs, signOff, signature, postScript } = loveLetterData;

  const handleOpenLetter = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F8C8DC', '#E8A0BF', '#FFF8F0', '#D8A1A9'],
      });
    } catch {
      // safe catch
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center items-center z-10">
      {/* Chapter Badge */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-blush/25 text-xs uppercase tracking-widest text-soft-rose mb-4"
        >
          <Mail size={13} className="text-pink-400" />
          <span>Chapter 5: A Letter From My Heart</span>
          <Mail size={13} className="text-pink-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-3xl sm:text-5xl md:text-6xl text-cream font-bold mb-3"
        >
          Written Just for You
        </motion.h2>
      </div>

      {/* BEFORE OPENING: Sealed Vintage Envelope */}
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md flex flex-col items-center text-center"
        >
          <p className="font-playfair italic text-lg sm:text-xl text-cream/90 mb-8 max-w-xs sm:max-w-md">
            "Princess, there's something I've been wanting to tell you..."
          </p>

          {/* Interactive Vintage Envelope */}
          <div 
            onClick={handleOpenLetter}
            className="cursor-pointer group relative w-72 sm:w-80 h-48 sm:h-52 bg-gradient-to-br from-[#f5e6d3] via-[#ecd5be] to-[#dfc4a9] rounded-xl shadow-2xl border border-amber-200/60 p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-300"
          >
            {/* Envelope Flap Lines */}
            <div className="absolute inset-0 border-t-8 border-amber-200/40 rounded-t-xl pointer-events-none" />
            
            {/* Wax Seal Badge */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-600 shadow-xl border-2 border-rose-400/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart size={26} className="fill-white text-white drop-shadow-sm" />
              <div className="absolute -inset-1 rounded-full border border-dashed border-rose-300/40 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

            <span className="font-handwriting text-xl text-rose-900 font-bold mt-3">
              To Princess Meenu
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-600 mt-1">
              Private & Sealed with Love
            </span>
          </div>

          {/* Open Button */}
          <button
            onClick={handleOpenLetter}
            className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-lavender text-deep-purple font-poppins font-bold text-sm tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <span>Open Your Letter</span>
            <Mail size={16} />
          </button>
        </motion.div>
      ) : (
        /* AFTER OPENING: Unfolded Letter Paper */
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full max-w-2xl relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5EFE6] text-neutral-900 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-amber-100 selection:bg-rose-200 selection:text-neutral-900"
        >
          {/* Decorative Vintage Stamp & Wax Mark */}
          <div className="flex justify-between items-start border-b border-amber-200/50 pb-4 mb-6">
            <div>
              <span className="font-cursive text-3xl sm:text-4xl text-rose-700 block">
                {recipient}
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-poppins mt-1 block">
                {loveLetterData.date || 'Special Birthday Note'}
              </span>
            </div>

            <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 shadow-sm">
              <Heart size={20} className="fill-rose-500 text-rose-500" />
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 font-poppins text-neutral-800 text-sm sm:text-base leading-relaxed">
            {paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={idx === 0 ? "font-handwriting text-2xl text-rose-800 font-semibold" : ""}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Sign-off & Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: paragraphs.length * 0.15 + 0.2 }}
            className="mt-8 pt-6 border-t border-amber-200/50 flex flex-col items-end"
          >
            <span className="font-poppins text-xs text-neutral-500 mb-1">
              {signOff}
            </span>
            <span className="font-cursive text-3xl sm:text-4xl text-rose-700 font-bold">
              {signature}
            </span>
          </motion.div>

          {/* Sweet PostScript */}
          {postScript && (
            <div className="mt-6 p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/40 text-xs sm:text-sm font-handwriting text-rose-900 italic">
              {postScript}
            </div>
          )}

          {/* Fold back button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-neutral-500 hover:text-rose-700 underline underline-offset-4 font-medium transition-colors"
            >
              Close and seal letter
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

