import { Icon } from "@iconify/react";
import Image from "next/image";
import React, {useEffect, useState, useRef} from "react";

function AudioMedia({ audioUrl }) {
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
    return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
  }

  useEffect(() => {
    if(remainingTime === 0) {
      setIsPlaying(false)
    }
  }, [remainingTime])

  return (
    <div className="relative h-[140px]">
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 52.08%, rgba(0, 0, 0, 0.49) 100%)",
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
        <div
          style={{ background: "rgba(54, 126, 232, 0.5)" }}
          className="pl-1 pr-4 w-[90px] py-1 flex gap-3 rounded-[32px] items-center"
        >
          <div className="p-1 cursor-pointer rounded-full bg-white">
          {isPlaying ? (
            <Icon
              onClick={handleClick}
              icon="ic:sharp-pause"
              color="black"
              height={16}
              width={16}
            />
          ) : (
            <Icon
              onClick={handleClick}
              height={16}
              width={16}
              icon="material-symbols:play-arrow"
              color="black"
            />
          )}
          </div>
          <small className="text-white">{formatTime(remainingTime)}</small>
        </div>
      </div>
      <img src="/cover-image.png" className="w-full h-full object-cover" alt="" />
    </div>
  );
}

export default AudioMedia;
