import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

/**
 * MusicPlayer
 * Floating audio control widget that stays persistent across chapters.
 */
export default function MusicPlayer({ music }) {
  const { isPlaying, isMuted, volume, togglePlay, toggleMute, changeVolume, isUsingSynth } = music;
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2 select-none">
      {/* Expanded Volume Slider Popover */}
      {showVolumeSlider && (
        <div className="glass-panel px-3 py-2 rounded-full flex items-center gap-2 animate-fade-in shadow-lg border border-pink-300/20 backdrop-blur-md">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-20 accent-pink-400 h-1.5 bg-pink-950/40 rounded-lg cursor-pointer"
            aria-label="Volume slider"
          />
          <span className="text-xs text-blush font-medium min-w-[28px]">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      )}

      {/* Main Music Pill Button */}
      <div className="glass-panel-glow px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-xl border border-blush/30 hover:border-blush/60 transition-all duration-300">
        {/* Animated Vinyl / Heart Indicator */}
        <button
          onClick={togglePlay}
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
          title={isPlaying ? "Pause Music" : "Play Music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <div className="relative">
              <Pause size={14} className="fill-white" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>
          ) : (
            <Play size={14} className="fill-white translate-x-0.5" />
          )}
        </button>

        {/* Status / Label */}
        <div 
          className="cursor-pointer flex flex-col"
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          title="Click to adjust volume"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-blush flex items-center gap-1">
              {isPlaying ? (
                <>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Princess Melody
                </>
              ) : (
                'Music Paused'
              )}
            </span>
            {isUsingSynth && (
              <span className="text-[10px] text-soft-rose/80 hidden sm:inline" title="Dreamy ambient chime fallback">
                ✨
              </span>
            )}
          </div>
          <span className="text-[10px] text-cream/60 hidden sm:inline">
            {isUsingSynth ? 'Soft Ambient Chimes' : 'Romantic Soundtrack'}
          </span>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="text-cream/70 hover:text-blush p-1 rounded-full hover:bg-white/10 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}

