import React, { useState } from "react";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";
import { Icon } from "@iconify/react";

function VideoReceived({ video, time }) {
  const { viewerData } = useImageViewer({media: {video: video}});
  const startIndex = 0;
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-[#EDF0FB] relative rounded-r-2xl rounded-tl-2xl max-[580px]:max-w-[80%] !max-w-[60%] !w-fit py-2 text-[#2A2A2A] px-2">
        <div className="w-[150px] h-[150px] rounded-[11px]">
        <div className="top-0 absolute z-20 right-0 left-0 bottom-0 flex items-center justify-center">
          <div
            onClick={() => {
                setOpened(true);
            }}
            className="p-4 z-10 rounded-[64px] cursor-pointer"
            style={{ background: "rgba(54, 126, 232, 0.5)" }}
          >
            <Icon
              icon="material-symbols:play-circle-outline"
              height={32}
              width={32}
              color="white"
            />
          </div>
        </div>
          <video
            src={video as string}
            className="w-full h-full rounded-[11px] object-cover"
          ></video>
        </div>
      </div>
      <small className="text-[#757575] text-[12px] leading-[15px]">
        {time
          ? new Date(time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </small>
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={opened}
      />
    </div>
  );
}

export default VideoReceived;
