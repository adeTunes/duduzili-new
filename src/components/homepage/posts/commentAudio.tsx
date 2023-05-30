import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function CommentAudio({ comment }) {
  const audioUrl = comment?.audio_url;
  const photoUrl = comment?.photo_url ;
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

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[14px] leading-[38px]">{comment?.content}</p>
      <div
        style={{
          backgroundImage: `url('${photoUrl}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        className="h-[300px] p-5 flex justify-between flex-col rounded-2xl"
      >
        <p
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
          className="text-[14px] rounded-[32px] self-start py-[3px] text-white px-6"
        >
          Audio
        </p>
        <img
          src={audioUrl}
          className="w-[40%] object-cover self-center"
          alt="audio post logo"
        />
        <div
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
          className="pl-1 pr-4 w-[90px] py-1 flex gap-3 rounded-[32px] items-center self-end"
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
        </div>
      </div>
    </div>
  );
}

export default CommentAudio;
