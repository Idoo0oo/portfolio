import { useCallback } from 'react';
import { useOSStore } from '../store/useOSStore';

export type SoundType = 'chime' | 'click' | 'minimize' | 'sent' | 'trash' | 'hover';

const SOUND_PATHS: Record<SoundType, string> = {
  chime: '/sounds/nintendo-game-boy-startup.mp3',
  click: '/sounds/mixkit-fast-double-click-on-mouse-275.wav',
  minimize: '/sounds/minimize.mp3',
  sent: '/sounds/sent.mp3',
  trash: '/sounds/trash.mp3',
  hover: '/sounds/macos_hover_tick.wav',
};

export function useSound() {
  const isSoundEnabled = useOSStore((state) => state.isSoundEnabled);

  const playSound = useCallback((type: SoundType, volume = 0.5) => {
    if (!isSoundEnabled) return;

    try {
      const audio = new Audio(SOUND_PATHS[type]);
      audio.volume = volume;
      audio.play().catch((err) => {
        console.warn(`Sound playback failed for ${type}:`, err);
      });
    } catch (e) {
      console.error("Sound play error:", e);
    }
  }, [isSoundEnabled]);

  return { playSound };
}
