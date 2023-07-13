import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useRef } from "react";

const PostAudio = dynamic(() => import("./postAudio"), {ssr: false})

function PostVideoAndAudio({
  videoUrl,
  audioUrl,
}: {
  videoUrl: string;
  audioUrl: string;
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
      <PostAudio audioUrl={audioUrl}
         photoUrl="/community-default.png" />
    </div>
  );
}

export default PostVideoAndAudio;
