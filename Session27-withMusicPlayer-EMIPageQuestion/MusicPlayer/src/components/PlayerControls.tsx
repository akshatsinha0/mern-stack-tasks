import React from 'react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  loop: boolean;
  onToggleLoop: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  volume,
  onVolumeChange,
  loop,
  onToggleLoop
}) => (
  <div className="player-controls-container">
    <div className="playback-controls">
      <button onClick={onPrevious} className="control-btn">
        {}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      <button onClick={onPlayPause} className="play-pause-btn control-btn">
        {isPlaying ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <button onClick={onNext} className="control-btn">
        {}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>

    <button onClick={onToggleLoop} className={`control-btn loop-btn ${loop ? 'active' : ''}`}>
      {}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 12v-3a3 3 0 0 1 3-3h13m-3-3l3 3-3 3" />
        <path d="M20 12v3a3 3 0 0 1-3 3H4m3 3l-3-3 3-3" />
      </svg>
    </button>

    <div className="volume-control">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3z" />
        <path d="M14.5 12c0-1.934-1.566-3.5-3.5-3.5v7c1.934 0 3.5-1.566 3.5-3.5z" />
      </svg>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={e => onVolumeChange(parseFloat(e.target.value))}
      />
    </div>
  </div>
);

export default PlayerControls;
