import React, { useEffect, useState } from 'react';

/**
 * CustomCursor
 * Renders an elegant glowing heart cursor with trailing sparkles on desktop devices.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if the device has a precision pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let trailId = 0;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Periodically spawn a sparkling trail particle
      if (Math.random() > 0.4) {
        const newTrail = {
          id: trailId++,
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          size: Math.random() * 8 + 6,
          rotation: Math.random() * 360,
        };

        setTrails((prev) => [...prev.slice(-12), newTrail]);
      }
    };

    const onMouseDown = () => setIsHovering(true);
    const onMouseUp = () => setIsHovering(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isDesktop, isVisible]);

  // Clean up old trails
  useEffect(() => {
    if (trails.length === 0) return;
    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [trails]);

  if (!isDesktop || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing sparkles */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 opacity-70 transition-opacity duration-500 ease-out"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`,
          }}
        >
          <svg
            width={t.size}
            height={t.size}
            viewBox="0 0 24 24"
            fill="#F8C8DC"
            className="text-blush opacity-80"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Main cursor heart */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="relative">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#FF758F"
            className="filter drop-shadow-[0_0_8px_rgba(255,117,143,0.8)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        </div>
      </div>
    </div>
  );
}

