import AudioPlayer from "@/components/modals/audioPlayer";
import { Microphone2, StopCircle } from "iconsax-react";
import { useEffect, useRef, useState } from "react";

const AudioRecorder: React.FC = ({start, setStart, audio, setAudio}) => {
//   const [audio, setAudio] = useState(null);
//   const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let intervalId;
    if (start) {
      intervalId = setInterval(() => {
        setSeconds((v) => v + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else clearInterval(intervalId);
  }, [start]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((v) => v + 1);
      setSeconds(0);
    }
  }, [seconds]);
  return (
    <>
      {start ? (
        <div className="flex w-[135px] justify-between items-center gap-3">
          <Microphone2 size={32} color="#4534B8" />
          <p>{`${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`}</p>
          <StopCircle
            id="buttonStop"
            onClick={() => {
              setStart(false);
            }}
            size="32"
            color="red"
            variant="Bulk"
          />
        </div>
      ) : null}
      <div>
        <audio controls hidden id="audio"></audio>
        {audio ? <AudioPlayer setAudio={setAudio} audio={audio} /> : null}
      </div>
    </>
  );
};

export default AudioRecorder;
