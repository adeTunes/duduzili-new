import React, { useState } from "react";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";

function PhotoSent({ photo, time }) {
  const { viewerData } = useImageViewer(photo);
  const startIndex = 0;
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-duduzili-violet self-end rounded-l-2xl rounded-tr-2xl w-fit max-[580px]:max-w-[80%] max-w-[60%] py-2 text-[#fff] px-2">
        <img
          onClick={() => {
            setOpened(true);
          }}
          src={photo}
          className="w-[150px] cursor-pointer hover:opacity-80 h-[150px] object-cover rounded-[11px]"
          alt=""
        />
      </div>
      <small className="text-[#757575] self-end text-[12px] leading-[15px]">
        {time ? new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
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

export default PhotoSent;
