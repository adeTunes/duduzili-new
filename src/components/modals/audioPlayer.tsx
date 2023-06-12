import React, { useRef, useState, useEffect } from "react";
import ProgressBar from "./progressBar";
import { Icon } from "@iconify/react";

function AudioPlayer({ audio, setAudio }) {
  const audioRef = useRef<HTMLAudioElement>();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    let fileURL;
    if (typeof audio === "object") {
      fileURL = URL.createObjectURL(audio);
    } else fileURL = audio;
    const newAudio = new Audio(fileURL);
    audioRef.current = newAudio;
    const loadedMetaFn = () => {
      setDuration(newAudio.duration);
      setRemainingTime(newAudio.duration);
    };
    newAudio.addEventListener("loadedmetadata", loadedMetaFn);
    const timeUpdate = () => {
      setRemainingTime(newAudio.duration - newAudio.currentTime);
    };
    newAudio.addEventListener("timeupdate", timeUpdate);

    return () => {
      URL.revokeObjectURL(fileURL);
      audioRef.current?.pause();
      audioRef.current = null;
      newAudio.removeEventListener("loadedmetadata", loadedMetaFn);
      newAudio.removeEventListener("timeupdate", timeUpdate);
    };
  }, [audio]);
  useEffect(() => {
    const audioElement = audioRef.current;

    const updateProgress = () => {
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration;

      setProgress(currentTime / duration);
    };

    audioElement.addEventListener("timeupdate", updateProgress);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, []);
  const barsCount = 60; // Adjust this value to control the number of bars
  const bars = Array.from(Array(barsCount)).map((_, index) => {
    const isBlue = index / barsCount <= progress;
    return <ProgressBar key={index} id={index} isBlue={isBlue} />;
  });
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
    <>
      {/* <audio ref={audioRef} controls hidden /> */}
      {play ? (
        <div
          style={{
            boxShadow: "0px 1.15385px 11.5385px rgba(0, 0, 0, 0.09)",
          }}
          className="w-fit rounded-[36px] p-[9px] flex items-center justify-between h-[60px]"
        >
          <div className="flex items-center gap-[15px]">
            <span className="w-[41px] cursor-pointer border border-duduzili-violet rounded-full h-[41px] flex items-center justify-center">
              {isPlaying ? (
                <Icon
                  onClick={() => {
                    handleClick();
                  }}
                  icon="ic:sharp-pause"
                  color="#4534B8"
                  height={18}
                  width={18}
                />
              ) : (
                <Icon
                  onClick={() => {
                    handleClick();
                    if (!play) {
                      setPlay(true);
                    }
                  }}
                  height={18}
                  width={18}
                  icon="material-symbols:play-arrow"
                  color="#4534B8"
                />
              )}
            </span>
            <div className="flex items-center gap-[2px]">{bars}</div>
            <small className="">{formatTime(remainingTime)}</small>
            <div
              className="h-6  cursor-pointer bg-[#EDF0FB] w-6 flex items-center justify-center"
              style={{
                borderRadius: "24px",
              }}
              onClick={() => {
                setAudio(null);
              }}
            >
              <Icon
                height={18}
                width={18}
                color="#000000"
                icon="ic:outline-close"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 1.15385px 11.5385px rgba(0, 0, 0, 0.09)",
          }}
          className="w-[184px] rounded-[36px] p-[9px] flex items-center justify-between h-[60px]"
        >
          <span className="flex items-center gap-[15px]">
            <span className="w-[41px] cursor-pointer border border-duduzili-violet rounded-full h-[41px] flex items-center justify-center">
              {isPlaying ? (
                <Icon
                  onClick={() => {
                    handleClick();
                  }}
                  icon="ic:sharp-pause"
                  color="#4534B8"
                  height={18}
                  width={18}
                />
              ) : (
                <Icon
                  onClick={() => {
                    handleClick();
                    if (!play) {
                      setPlay(true);
                    }
                  }}
                  height={18}
                  width={18}
                  icon="material-symbols:play-arrow"
                  color="#4534B8"
                />
              )}
            </span>
            <small>{formatTime(remainingTime)}</small>
          </span>
          <div
            className="h-6 cursor-pointer bg-[#EDF0FB] w-6 flex items-center justify-center"
            style={{
              borderRadius: "24px",
            }}
            onClick={() => {
              setAudio(null);
            }}
          >
            <Icon
              height={18}
              width={18}
              color="#000000"
              icon="ic:outline-close"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AudioPlayer;
