import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useMusic hook
 * Manages background music with HTML5 Audio and seamless Web Audio API
 * ambient romantic music-box synth fallback when the MP3 file is not yet uploaded!
 */
export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [hasStarted, setHasStarted] = useState(false);
  const [isUsingSynth, setIsUsingSynth] = useState(false);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio('/music/background.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';

    audio.addEventListener('error', () => {
      // Audio file not found or cannot be played -> will use ambient romantic synth fallback
      setIsUsingSynth(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Soft romantic music-box synthesizer (Web Audio API fallback)
  const playRomanticNote = useCallback((freq, startTime, duration = 1.6) => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
      const ctx = audioCtxRef.current;
      
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Soft sine + gentle triangle for warm celesta / music box tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Envelope: soft attack, gentle exponential decay
      const now = startTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext safe catch
    }
  }, []);

  const startAmbientSynth = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.value = isMuted ? 0 : volume;
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Dreamy romantic pentatonic arpeggio sequence (E, G#, B, C#, E5)
      const chordNotes = [
        [329.63, 493.88, 659.25], // E major
        [277.18, 415.30, 554.37], // C#m
        [220.00, 329.63, 440.00], // A major
        [246.94, 369.99, 493.88], // B major
      ];

      let chordIdx = 0;
      let step = 0;

      if (synthTimerRef.current) clearInterval(synthTimerRef.current);

      synthTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const currentChord = chordNotes[chordIdx];
        const note = currentChord[step % currentChord.length];

        // Random subtle octave sparkle
        const finalFreq = Math.random() > 0.6 ? note * 1.5 : note;
        playRomanticNote(finalFreq, now, 1.8);

        step++;
        if (step % 4 === 0) {
          chordIdx = (chordIdx + 1) % chordNotes.length;
        }
      }, 750);
    } catch {
      // Web Audio graceful fallback
    }
  }, [isMuted, volume, playRomanticNote]);

  const stopAmbientSynth = useCallback(() => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend().catch(() => {});
    }
  }, []);

  // Update volume & mute states
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume, now);
    }
  }, [volume, isMuted]);

  // Start music on user action (Welcome button)
  const startMusic = useCallback(() => {
    setHasStarted(true);
    setIsPlaying(true);

    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsUsingSynth(false);
          })
          .catch(() => {
            // MP3 failed or not found -> start soothing ambient synth
            setIsUsingSynth(true);
            startAmbientSynth();
          });
      }
    } else {
      setIsUsingSynth(true);
      startAmbientSynth();
    }
  }, [startAmbientSynth]);

  const togglePlay = useCallback(() => {
    if (!hasStarted) {
      startMusic();
      return;
    }

    if (isPlaying) {
      if (audioRef.current && !isUsingSynth) {
        audioRef.current.pause();
      } else {
        stopAmbientSynth();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && !isUsingSynth) {
        audioRef.current.play().catch(() => {
          setIsUsingSynth(true);
          startAmbientSynth();
        });
      } else {
        startAmbientSynth();
      }
      setIsPlaying(true);
    }
  }, [hasStarted, isPlaying, isUsingSynth, startAmbientSynth, stopAmbientSynth, startMusic]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const changeVolume = useCallback((newVol) => {
    const val = Math.max(0, Math.min(1, newVol));
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    volume,
    hasStarted,
    isUsingSynth,
    startMusic,
    togglePlay,
    toggleMute,
    changeVolume
  };
}

