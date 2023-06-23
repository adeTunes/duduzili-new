import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function ImageMedia({ image, handleClick }) {
  return (
    <div onClick={handleClick} className="relative group cursor-pointer h-[140px]">
      <div
        className="absolute hidden group-hover:inline-block top-0 left-0 right-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 52.08%, rgba(0, 0, 0, 0.49) 100%)",
        }}
      ></div>
      <img src={image} className="w-full h-full object-cover" alt="" />
    </div>
  );
}

export default ImageMedia;
