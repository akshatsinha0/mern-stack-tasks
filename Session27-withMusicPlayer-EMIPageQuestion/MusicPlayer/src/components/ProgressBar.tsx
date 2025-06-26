import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const format = (time: number) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="progress-container">
      <span className="time-display">{format(currentTime)}</span>
      <div className="progress-bar" onClick={handleClick}>
        <div className="progress-filled" style={{ width: `${progress}%` }} />
        <div className="progress-handle" style={{ left: `${progress}%` }} />
      </div>
      <span className="time-display">{format(duration)}</span>
    </div>
  );
};

export default ProgressBar;
