import React, {useMemo, useState} from "react";
import { NextPageX } from "../../types/next";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { useAtomValue } from "jotai";
import { currentUserDetails } from "@/store";
import usePostMedia from "../../hooks/use-post-media";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";

const ProfileMedia: NextPageX = () => {
  const userOnlineActivities: any = useAtomValue(currentUserDetails);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(userOnlineActivities?.medias);
  const viewedMedia = useMemo(() => media.filter((item) => item.type !== "audio"), [media]);

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(134.8px, 1fr))",
      }}
      className="grid gap-[9px]"
    >
      {media.map(({ type, url }, idx) =>
    type === "audio" ? (
      <AudioMedia key={idx} audioUrl={url} />
    ) : type === "video" ? (
      <VideoMedia
        handleClick={() => {
          setOpened(true);
          setStartIndex(idx);
        }}
        key={idx}
        videoUrl={url}
      />
    ) : (
      <ImageMedia
        handleClick={() => {
          setOpened(true);
          setStartIndex(idx);
        }}
        key={idx}
        image={url}
      />
    )
  )}
  <GalleryViewer
    setOpened={setOpened}
    startIndex={startIndex}
    gallery={viewedMedia as { url: string; type: "video" | "photo" }[]}
    opened={opened}
  />
</div>
  );
};
ProfileMedia.Layout = ProfileActivitiesLayout;
export default ProfileMedia;
