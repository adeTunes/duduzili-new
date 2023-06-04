import React from "react";
import ReactImageVideoviewer from "react-image-video-viewer";

function GalleryViewer({
  opened,
  gallery,
  startIndex,
  setOpened,
}: {
  opened: boolean;
  startIndex: number;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  gallery: {
    url: string;
    type: "photo" | "video";
    altTag?: string;
    title?: string;
    poster?: string;
  }[];
}) {
  return opened ? (
    <ReactImageVideoviewer
      data={gallery}
      startIndex={startIndex}
      showResourceCount={true}
      onCloseCallback={() => setOpened(false)}
    />
  ) : null;
}

export default GalleryViewer;
