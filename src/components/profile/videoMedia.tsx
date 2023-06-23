import { Icon } from "@iconify/react";
import Image from "next/image";
import React, {useRef, useState} from "react";

function VideoMedia({ videoUrl, handleClick }) {
  return (
    <div className="relative h-[140px]">
      <div
        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 52.08%, rgba(0, 0, 0, 0.49) 100%)",
        }}
      ></div>
      <div onClick={handleClick} className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
        <div
          className="p-2 rounded-[64px] cursor-pointer"
          style={{ background: "rgba(54, 126, 232, 0.5)" }}
        >
          <Icon
            icon="material-symbols:play-circle-outline"
            height={40}
            width={40}
            color="white"
          />
        </div>
      </div>
      <video className="h-full w-full" controls={false} src={videoUrl} />
    </div>
  );
}

export default VideoMedia;
