export interface Track {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrackIndex: number;
  loop: boolean;
}
