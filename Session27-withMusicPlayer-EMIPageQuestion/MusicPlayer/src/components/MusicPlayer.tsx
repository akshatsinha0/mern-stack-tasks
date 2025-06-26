import React from 'react';
import { tracks } from '../data/tracks';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import TrackInfo from './TrackInfo';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import '../styles/MusicPlayer.css';

const MusicPlayer: React.FC = () => {
  const {
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
  } = useAudioPlayer(tracks);

  return (
    <div className="music-player-container">
      <div className="background-overlay" />

      <div className="music-player">
        <audio ref={audioRef} preload="metadata" />

        <div className="player-main">
          <TrackInfo track={currentTrack} />

          <div className="player-controls-area">
            <ProgressBar
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              onSeek={handleSeek}
            />

            <PlayerControls
              isPlaying={playerState.isPlaying}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              volume={playerState.volume}
              onVolumeChange={handleVolumeChange}
              loop={playerState.loop}
              onToggleLoop={handleToggleLoop}
            />
          </div>
        </div>

        <div className="playlist">
          <h4>Playlist</h4>
          <div className="track-list">
            {tracks.map((t, idx) => (
              <div
                key={t.id}
                className={`track-item ${
                  idx === playerState.currentTrackIndex ? 'active' : ''
                }`}
                onClick={() => selectTrack(idx)}
              >
                <img src={t.coverImage} alt={t.title} className="track-thumbnail" />
                <div className="track-info-small">
                  <span className="track-title-small">{t.title}</span>
                  <span className="track-artist-small">{t.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
