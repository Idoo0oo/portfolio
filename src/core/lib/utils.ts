import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let audioCtx: AudioContext | null = null;

export function triggerHaptic() {
  if (typeof window === 'undefined') return;

  // 1. Android / Supported devices physical vibration
  if (navigator.vibrate) {
    navigator.vibrate(15);
  }

  // 2. iOS fallback: Psycho-acoustic muted tick sound via Web Audio API
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Precision Taptic Engine Simulation (Very short, low freq thump)
      oscillator.type = 'sine'; 
      // Start at 150Hz (sharp click) to 40Hz (dull body thud) in just 15ms
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.015);

      // Volume: Super low gain (0.15) so it feels like a vibration instead of a sound
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.015);
    }
  } catch (err) {
    // silently fail
  }
}
