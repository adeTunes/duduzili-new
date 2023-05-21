import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function AudioMedia({ image }) {
  return (
    <div className="relative h-[140px]">
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 52.08%, rgba(0, 0, 0, 0.49) 100%)",
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex">
        <div className="flex gap-1 items-end p-[6px]">
          <Icon height={16} width={16} color="white" icon="ph:heart-fill" />
          <small className="text-[12px] leading-[15px] text-white">21K</small>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
        <div
          style={{ background: "rgba(54, 126, 232, 0.5)" }}
          className="pl-1 pr-4 w-[90px] py-1 flex gap-3 rounded-[32px] items-center"
        >
          <div className="p-1 cursor-pointer rounded-full bg-white">
            <Icon
              height={16}
              width={16}
              icon="material-symbols:play-arrow"
              color="black"
            />
          </div>
          <small className="text-white">10:24</small>
        </div>
      </div>
      <img src={image} className="w-full h-full object-cover" alt="" />
    </div>
  );
}

export default AudioMedia;
