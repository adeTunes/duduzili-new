import { clsx } from "@mantine/core";
import React from "react";

function PostImage({ height, image }: { height?: string; image: string }) {
  return (
    <div className={clsx(height ?? "h-[300px]")}>
      <img
        src={image}
        className="h-full w-full object-cover rounded-2xl"
        alt="post image"
      />
    </div>
  );
}

export default PostImage;
