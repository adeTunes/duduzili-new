import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState } from "react";

function PostVideo({
  videoUrl,
  photoUrl,
}: {
  videoUrl: string;
  photoUrl: string;
}) {
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  return (
    <div className="h-[300px] rounded-2xl relative">
      {videoPlayed ? (
        <video autoPlay={autoplay} className="h-full w-full" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <img
          alt=""
            src={photoUrl}
            className="h-full w-full object-cover rounded-2xl"
          />
          <div className="top-0 absolute right-0 left-0 bottom-0 flex items-center justify-center">
            <div
              onClick={() => {
                setVideoPlayed(true);
                setAutoplay(true);
              }}
              className="p-4 z-10 rounded-[64px] cursor-pointer"
              style={{ background: "rgba(54, 126, 232, 0.5)" }}
            >
              <Icon
                icon="material-symbols:play-circle-outline"
                height={55}
                width={55}
                color="white"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostVideo;
