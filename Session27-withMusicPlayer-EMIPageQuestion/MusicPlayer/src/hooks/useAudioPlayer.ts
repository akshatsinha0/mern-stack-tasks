import { useState, useRef, useEffect, useCallback } from 'react';
import { Track, PlayerState } from '../types/music';

export const useAudioPlayer = (tracks: Track[]) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    currentTrackIndex: 0,
    loop: false
  });

  const currentTrack = tracks[playerState.currentTrackIndex];

  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = currentTrack.audioSrc;
      audio.loop = playerState.loop;
      audio.load();
    }
  }, [currentTrack, playerState.loop]);

  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setPlayerState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };
    const onLoadedMetadata = () => {
      setPlayerState(prev => ({ ...prev, duration: audio.duration }));
    };
    const onEnded = () => {
      if (!playerState.loop) {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [playerState.loop]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playerState.isPlaying) {
      audio.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } else {
      audio.play().then(() =>
        setPlayerState(prev => ({ ...prev, isPlaying: true }))
      );
    }
  }, [playerState.isPlaying]);

  const handleNext = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex + 1) % tracks.length,
      currentTime: 0,
      isPlaying: false
    }));
  }, [tracks.length]);

  const handlePrevious = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      currentTrackIndex:
        prev.currentTrackIndex === 0 ? tracks.length - 1 : prev.currentTrackIndex - 1,
      currentTime: 0,
      isPlaying: false
    }));
  }, [tracks.length]);

  const handleSeek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const handleVolumeChange = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    setPlayerState(prev => ({ ...prev, volume }));
  }, []);

  const handleToggleLoop = useCallback(() => {
    setPlayerState(prev => ({ ...prev, loop: !prev.loop }));
  }, []);

  const selectTrack = useCallback((index: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrackIndex: index,
      currentTime: 0,
      isPlaying: false
    }));
  }, []);

  return {
    audioRef,
    playerState,
    currentTrack,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleVolumeChange,
    handleToggleLoop,
    selectTrack
  };
};
