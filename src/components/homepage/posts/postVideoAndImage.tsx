import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState, useRef } from "react";

function PostVideoAndImage({
  videoUrl,
  photoUrl,
}: {
  videoUrl: string;
  photoUrl: string;
}) {
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-[200px] rounded-2xl relative">
        {!showControls && (
          <div className="top-0 absolute right-0 left-0 bottom-0 flex items-center justify-center">
            <div
              onClick={() => {
                videoRef.current.play();
                setShowControls(true);
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
        )}
        <video ref={videoRef} className="h-full w-full" controls={showControls} src={videoUrl} />
      </div>
      <div className="h-[200px] rounded-2xl relative">
        <img
          alt=""
          src={photoUrl}
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

export default PostVideoAndImage;
