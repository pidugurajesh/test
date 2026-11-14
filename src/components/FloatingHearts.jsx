import React, { useMemo } from 'react';

/**
 * FloatingHearts & Starfield
 * Renders dreamy floating hearts, twinkling stars, and soft bokeh particles
 * across the background with smooth GPU-accelerated CSS animations.
 */
export default function FloatingHearts() {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
      left: Math.floor(Math.random() * 100), // 0 to 100%
      duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s
      delay: -(Math.random() * 20), // staggered start
      opacity: (Math.random() * 0.35 + 0.15).toFixed(2),
      isHeart: i % 2 === 0,
      sway: (Math.random() * 30 - 15).toFixed(1),
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft ambient gradient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-rose/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-lavender/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-cream"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `sparkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 6px rgba(255, 248, 240, 0.8)`,
          }}
        />
      ))}

      {/* Floating hearts and gentle glowing spheres */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: '-10%',
            opacity: p.opacity,
            animation: `floatUpward ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            transform: `translateX(${p.sway}px)`,
          }}
        >
          {p.isHeart ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#E8A0BF"
              className="drop-shadow-[0_0_8px_rgba(248,200,220,0.6)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              className="rounded-full bg-gradient-to-tr from-blush to-lavender blur-[1px] shadow-[0_0_10px_rgba(200,182,226,0.6)]"
              style={{ width: `${p.size * 0.6}px`, height: `${p.size * 0.6}px` }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

