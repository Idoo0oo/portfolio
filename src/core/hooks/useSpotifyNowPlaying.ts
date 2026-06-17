import { useState, useEffect } from 'react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
  progress: number;
  duration: number;
}

const FALLBACK_SONGS = [
  { title: "fianeruuu", artist: "funeruuu", cover: "/fianeruuu.png" },
  { title: "Lalu Biru", artist: "Eleanor Whisper", cover: "/lalubiru.jfif" },
  { title: "Gemilang", artist: "Perunggu", cover: "/gemilang.jfif" },
];

/**
 * Spotify "Now Playing" hook.
 * Currently uses placeholder data with realistic simulation.
 * To connect real Spotify API:
 * 1. Create Spotify Developer App at https://developer.spotify.com/dashboard
 * 2. Set up Vercel Serverless Function at /api/spotify
 * 3. Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN to Vercel env
 * 4. Replace fetchEndpoint with your API route
 */
export function useSpotifyNowPlaying() {
  const [fallback] = useState(() => FALLBACK_SONGS[Math.floor(Math.random() * FALLBACK_SONGS.length)]);

  const [track, setTrack] = useState<SpotifyTrack>({
    isPlaying: true,
    title: fallback.title,
    artist: fallback.artist,
    albumArt: fallback.cover,
    songUrl: '#',
    progress: 84,      // Simulated 1:24 out of 4:02
    duration: 242,
  });

  const [isLive] = useState(false);

  useEffect(() => {
    // TODO: Replace with real Spotify API endpoint when ready
    // const fetchEndpoint = '/api/spotify';
    // const fetchNowPlaying = async () => { ... };
    // fetchNowPlaying();
    // const interval = setInterval(fetchNowPlaying, 30000);
    // return () => clearInterval(interval);

    // For now, simulate progress
    const interval = setInterval(() => {
      setTrack((prev) => ({
        ...prev,
        progress: prev.progress >= prev.duration ? 0 : prev.progress + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    ...track,
    isLive,
    fallbackSong: fallback,
  };
}
