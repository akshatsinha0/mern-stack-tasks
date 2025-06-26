import React from 'react';
import type { Track } from '../types/music';

interface TrackInfoProps {
  track: Track;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => (
  <div className="track-info">
    <div className="track-image">
      <img src={track.coverImage} alt={track.title} />
    </div>
    <div className="track-details">
      <div className="track-marquee">
        <div className="marquee-content">
          {track.title} — {track.artist}
        </div>
      </div>
    </div>
  </div>
);

export default TrackInfo;
