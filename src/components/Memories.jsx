import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memoriesData } from '../data/memories';
import { Camera, X, Heart, Sparkles, ZoomIn, Image as ImageIcon } from 'lucide-react';

export default function Memories() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Aesthetic rotations for scrapbook feel
  const rotations = [-2.5, 2, -1.5, 3, -2, 2.5, -3, 1.5];

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center z-10">
      {/* Chapter Badge & Heading */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-blush/25 text-xs uppercase tracking-widest text-soft-rose mb-4"
        >
          <Camera size={13} className="text-pink-400" />
          <span>Chapter 3: Our Little Scrapbook</span>
          <Camera size={13} className="text-pink-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-3xl sm:text-5xl md:text-6xl text-cream font-bold mb-4"
        >
          Moments Frozen in Time
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-cursive text-2xl sm:text-3xl text-blush max-w-xl mx-auto"
        >
          "Every picture holds a feeling that never fades..."
        </motion.p>
      </div>

      {/* Scrapbook Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-2">
        {memoriesData.map((item, index) => {
          const rotation = rotations[index % rotations.length];
          const isMissing = brokenImages[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              style={{ rotate: `${rotation}deg` }}
              onClick={() => setSelectedPhoto(item)}
              className="cursor-pointer group relative polaroid-card bg-white p-3.5 pb-6 rounded-sm text-neutral-800 transition-all duration-300"
            >
              {/* Scrapbook Tape Detail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/70 border border-amber-200/50 backdrop-blur-sm shadow-sm rotate-1 z-10 pointer-events-none opacity-85" />

              {/* Photo Container */}
              <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden mb-3 border border-neutral-200/60 rounded-xs">
                {!isMissing ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  /* Aesthetic romantic placeholder if image file is not yet placed by the user */
                  <div className="w-full h-full bg-gradient-to-br from-[#FFF0F5] via-[#FCE4EC] to-[#F3E5F5] flex flex-col items-center justify-center p-4 text-center select-none">
                    <div className="w-12 h-12 rounded-full bg-white/80 shadow-inner flex items-center justify-center mb-2 border border-pink-200">
                      <Camera size={22} className="text-[#E8A0BF]" />
                    </div>
                    <span className="font-playfair text-xs font-bold text-[#884D63] line-clamp-1">
                      {item.title}
                    </span>
                    <span className="font-handwriting text-xs text-[#AD5D7D] mt-1">
                      {item.tag || "Sweet Memory"}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#C27D9A] mt-2 bg-white/70 px-2 py-0.5 rounded-full border border-pink-100">
                      Photo #{item.id}
                    </span>
                  </div>
                )}

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-deep-purple shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="text-center px-1">
                <p className="font-handwriting text-lg sm:text-xl font-bold text-neutral-800 leading-tight">
                  {item.title}
                </p>
                <p className="font-poppins text-[11px] text-neutral-500 line-clamp-1 mt-1 font-light">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 text-neutral-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 bg-neutral-900/40 hover:bg-neutral-900/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>

              {/* Lightbox Image / Fallback View */}
              <div className="relative aspect-4/3 w-full bg-neutral-100 rounded-xl overflow-hidden mb-5 border border-neutral-200">
                {!brokenImages[selectedPhoto.id] ? (
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    onError={() => handleImageError(selectedPhoto.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FFF0F5] via-[#FCE4EC] to-[#F3E5F5] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 shadow-md flex items-center justify-center mb-3 border border-pink-200">
                      <ImageIcon size={30} className="text-[#E8A0BF]" />
                    </div>
                    <h4 className="font-playfair text-base font-bold text-[#884D63] mb-1">
                      {selectedPhoto.title}
                    </h4>
                    <p className="font-handwriting text-sm text-[#AD5D7D] mb-2">
                      Place your photo at: <code className="bg-white/80 px-1 py-0.5 rounded text-xs text-neutral-700">{selectedPhoto.image}</code>
                    </p>
                    <span className="text-xs text-neutral-500 font-poppins">
                      (Clear editable placeholder ready for your memories!)
                    </span>
                  </div>
                )}
              </div>

              {/* Memory Details */}
              <div className="text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#AD5D7D] font-bold">
                    {selectedPhoto.tag || 'Special Memory'}
                  </span>
                  <span className="text-xs text-neutral-400 font-poppins">
                    {selectedPhoto.date}
                  </span>
                </div>

                <h3 className="font-playfair text-2xl font-bold text-neutral-900">
                  {selectedPhoto.title}
                </h3>

                <p className="font-handwriting text-lg text-pink-700 italic border-l-2 border-pink-300 pl-3 py-0.5">
                  "{selectedPhoto.caption}"
                </p>

                <p className="font-poppins text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
                  {selectedPhoto.message}
                </p>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow-sm hover:opacity-95"
                  >
                    Cherish this memory ❤️
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

