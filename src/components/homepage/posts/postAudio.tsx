import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function PostAudio({
  audioUrl,
  photoUrl,
  height,
  gridSpan
}: {
  audioUrl: string;
  photoUrl: string;
  height?: string,
  gridSpan?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      setRemainingTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      setRemainingTime(audio.duration - audio.currentTime);
    });
  }, []);

  function handleClick() {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes === Infinity ? 0 : minutes}:${seconds.toFixed(0).padStart(2, "0") === "NaN" ? "00" : seconds.toFixed(0).padStart(2, "0")}`;
  }
  
  return (
    <div
      style={{
        backgroundImage: `url('${photoUrl}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        gridColumn: gridSpan
      }}
      className={clsx(height || "h-[200px]", "p-5 flex relative justify-between flex-col rounded-2xl")}
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
      <audio src={audioUrl} controls className="w-full"></audio>
    </div>
  );
}

export default PostAudio;
