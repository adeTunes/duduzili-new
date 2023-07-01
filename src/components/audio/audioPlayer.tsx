// AudioPlayer.js
import React, { useState, useRef } from 'react';

const AudioPlayer = ({ audioChunks }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div>
      <h2>Audio Player</h2>
      <audio ref={audioRef} controls>
        {audioChunks.map((chunk, index) => (
          <source key={index} src={URL.createObjectURL(chunk)} type="audio/wav" />
        ))}
        Your browser does not support the audio element.
      </audio>
      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
