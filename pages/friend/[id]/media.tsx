import React, { useEffect, useState } from "react";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { NextPageX } from "../../../types/next";
import FriendProfileActivities from "@/components/profile/friendProfileActivities";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import { useRouter } from "next/router";
import useUserActivities from "../../../hooks/useUserDrafts";
import { useAtomValue, useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";
import usePostMedia from "../../../hooks/use-post-media";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "@/components/homepage/posts/galleryViewer";

const ProfileMedia: NextPageX = () => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const [opened, setOpened] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { media } = usePostMedia(friendDetails?.medias);
  const viewedMedia = media.filter((item) => item.type !== "audio");

  return !friendDetails?.user?.is_following &&
    friendDetails?.user?.is_private ? (
    <EmptyComponent
      className="max-w-[275px]"
      text="This is a private account. You will see their content when they accept your follow request"
    />
  ) : (
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
ProfileMedia.Layout = FriendProfileLayout;
export default ProfileMedia;
