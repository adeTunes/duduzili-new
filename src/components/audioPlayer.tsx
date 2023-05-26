import React, { useState, useRef } from 'react';

const VoiceNote: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handlePlay = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
  };

  const handleStop = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  };

  return (
    <div className="voice-note">
      <div className="sender-info">Sender: John Doe</div>
      {audioFile && (
        <div className="audio-player">
          <audio ref={audioPlayerRef} src={URL.createObjectURL(audioFile)} />
          <div className="controls">
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStop}>Stop</button>
          </div>
        </div>
      )}
      {!audioFile && (
        <div className="upload">
          <input type="file" accept="audio/*" onChange={handleFileUpload} />
        </div>
      )}
    </div>
  );
};

export default VoiceNote;
