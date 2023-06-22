import { clsx } from "@mantine/core";
import Image from "next/image";
import React from "react";

function PostImage({
  height,
  image,
  handleClick,
}: {
  height?: string;
  image: string;
  handleClick?: () => void;
}) {
  return (
    <div className={clsx(height ?? "h-[300px]", "group relative")}>
      <div onClick={handleClick} className="absolute top-0 right-0 rounded-2xl left-0 bottom-0 group-hover:inline-block hidden cursor-pointer bg-[#d6d3e5] opacity-[0.09]"></div>
      <img
        src={image}
        className="h-full cursor-pointer w-full object-cover rounded-2xl"
        alt="post image"
      />
    </div>
  );
}

export default PostImage;
