import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import WaveSurfer from "wavesurfer";
import React, { useEffect, useRef, useState } from "react";
import { StopCircle } from "iconsax-react";

function PostAudio({
  audioUrl,
  photoUrl,
  height,
  gridSpan,
}: {
  audioUrl: string;
  photoUrl: string;
  height?: string;
  gridSpan?: string;
}) {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const audioRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;

    wavesurfer.current = WaveSurfer.create({
      container: "#wavesurfer-id",
      waveColor: "white",
      progressColor: "#aaa9a9",
      height: 30,
      cursorWidth: 1,
      cursorHeight: 25,
      cursorColor: "white",
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
  }, [audioUrl]);

  useEffect(() => {
    if (audioUrl) {
      wavesurfer.current.load(audioUrl);
    }
  }, [audioUrl]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
      setIsStarted(true);
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => {
    wavesurfer.current.stop();
    setIsStarted(false)
  };

  // useEffect(() => {
  //   const audio = new Audio(audioUrl);
  //   audioRef.current = audio;
  //   audio.addEventListener("loadedmetadata", () => {
  //     setDuration(audio.duration);
  //     setRemainingTime(audio.duration);
  //   });
  //   audio.addEventListener("timeupdate", () => {
  //     setRemainingTime(audio.duration - audio.currentTime);
  //   });
  // }, []);

  // function handleClick() {
  //   const audio = audioRef.current;
  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // }

  // function formatTime(time) {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes === Infinity ? 0 : minutes}:${seconds.toFixed(0).padStart(2, "0") === "NaN" ? "00" : seconds.toFixed(0).padStart(2, "0")}`;
  // }

  return (
    <div
      style={{
        backgroundImage: `url('${photoUrl}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        gridColumn: gridSpan,
      }}
      className={clsx(
        height || "h-[200px]",
        "p-5 flex relative justify-between flex-col rounded-2xl"
      )}
    >
      <div className="absolute bg-black opacity-30 rounded-2xl top-0 left-0 right-0 bottom-0" />
      <p
        style={{ background: "rgba(255, 255, 255, 0.2)" }}
        className="text-[14px] z-[9] rounded-[32px] self-start py-[3px] text-white px-6"
      >
        Audio
      </p>
      <img
        src="/homePage/sound-wave.png"
        className="w-[40%] min-w-[70px] object-cover self-center"
        alt="audio post logo"
      />
      <div
        style={{
          background: "#4534b8",
          borderRadius: "24px",
          paddingInline: "5px",
          paddingBlock: "5px",
        }}
        className="grid grid-cols-[auto_1fr_28px] gap-2 relative items-center"
      >
        <div className="p-1 cursor-pointer rounded-full bg-white">
          {isPlaying ? (
            <Icon
              onClick={togglePlayback}
              icon="ic:sharp-pause"
              color="black"
              height={20}
              width={20}
            />
          ) : (
            <Icon
              onClick={togglePlayback}
              height={20}
              width={20}
              icon="material-symbols:play-arrow"
              color="black"
            />
          )}
        </div>
        <div className="w-full" id="wavesurfer-id" />
        {isStarted && (
          <StopCircle
            onClick={stopPlayback}
            size="28"
            color="white"
            variant="Bulk"
            className="cursor-pointer"
          />
        )}
      </div>

      {/* <div
        style={{ background: "rgba(255, 255, 255, 0.2)" }}
        className="pl-1 z-[9] pr-4 w-[90px] py-1 flex gap-3 rounded-[32px] items-center self-end"
      >
        
        <div className="p-1 cursor-pointer rounded-full bg-white">
          {isPlaying ? (
            <Icon
              onClick={handleClick}
              icon="ic:sharp-pause"
              color="black"
              height={20}
              width={20}
            />
          ) : (
            <Icon
              onClick={handleClick}
              height={20}
              width={20}
              icon="material-symbols:play-arrow"
              color="black"
            />
          )}
        </div>
        <small className="text-white">{formatTime(remainingTime)}</small>
      </div> */}
    </div>
  );
}

export default PostAudio;
