import AudioPlayer from "@/components/modals/audioPlayer";
import { clsx } from "@mantine/core";
import {
  Microphone2,
  Pause,
  Play,
  Refresh2,
  Stop,
  StopCircle,
} from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import useTimer from "../../../hooks/use-timer";
import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer";
import { Icon } from "@iconify/react";

const AudioRecorder = ({ start, setStart, audio, setAudio }) => {
  const { minutes, seconds } = useTimer(start);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (!audio) return;

    wavesurfer.current = WaveSurfer.create({
      container: "#wavesurfer-id",
      waveColor: "grey",
      progressColor: "#4534B8",
      height: 40,
      cursorWidth: 1,
      cursorColor: "lightgrey",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true,
    });

    wavesurfer.current.on("ready", () => {
      setPlayerReady(true);
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, [audio]);

  useEffect(() => {
    if (audio) {
      wavesurfer.current.load(audio.blobURL);
    }
  }, [audio]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const onStop = (recordedBlob) => {
    setAudio(recordedBlob);
  };

  const stopRecording = () => {
    setStart(false);
  };

  const onData = (recordedBlob) => {
    //console.log("chunk of real-time data is: ", recordedBlob);
  };

  const startRecording = () => {
    setAudio(null);
    setStart(true);
  };

  const cancelAudio = () => {
    setAudio(null);
  };

  return (
    <>
      {/* {start ? ( */}
      <div
        className={clsx(
          !start ? "hidden" : "flex",
          "justify-between w-[80%] items-center gap-3"
        )}
      >
        <Microphone2 className="cursor-pointer" size={32} color="#4534B8" />
        <div className="">
          <ReactMic
            record={start}
            className="w-full h-10"
            onStop={onStop}
            onData={onData}
            strokeColor="grey"
            backgroundColor="white"
          />
        </div>
        <p>{`${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`}</p>
        <StopCircle
          className="cursor-pointer"
          onClick={stopRecording}
          size="32"
          color="red"
          variant="Bulk"
        />
      </div>
      {audio && (
        <>
          <div className="flex flex-col gap-3 items-center">
            <div className="grid grid-cols-[auto_1fr_auto] w-full items-center gap-3">
              <Microphone2
                className="cursor-pointer"
                size={32}
                color="#4534B8"
              />
              <div className="w-full" id="wavesurfer-id" />
              <div className="flex items-center gap-3">
                {!isPlaying ? (
                  <Icon
                    onClick={togglePlayback}
                    height={32}
                    width={32}
                    icon="material-symbols:play-arrow"
                    color="#4534B8"
                    className="cursor-pointer"
                  />
                ) : (
                  <Icon
                    onClick={togglePlayback}
                    icon="ic:sharp-pause"
                    color="#4534B8"
                    height={32}
                    width={32}
                    className="cursor-pointer"
                  />
                )}
                <StopCircle
                  onClick={stopPlayback}
                  size="32"
                  color="red"
                  variant="Bulk"
                  className="cursor-pointer"
                />
                <Refresh2
                  className="cursor-pointer"
                  onClick={startRecording}
                  size="28"
                  color="#4534B8"
                />
                <Icon
                  className="cursor-pointer"
                  onClick={cancelAudio}
                  height={32}
                  width={32}
                  color="#000000"
                  icon="ic:outline-close"
                />
              </div>
            </div>
          </div>
        </>
      )}
      {/* {audio ? <AudioPlayer setAudio={setAudio} audio={audio} /> : null} */}
    </>
  );
};

export default AudioRecorder;
