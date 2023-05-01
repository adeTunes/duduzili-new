import React from "react";
import { NextPageX } from "../../types/next";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";

const ProfileMedia: NextPageX = () => {
  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(134.8px, 1fr))",
      }}
      className="grid gap-[9px]"
    >
      <ImageMedia image="/profile/media.png" />
      <VideoMedia image="/profile/media6.png" />
      <ImageMedia image="/profile/media2.png" />
      <AudioMedia image="/profile/media5.png" />
      <ImageMedia image="/profile/media4.png" />
      <ImageMedia image="/profile/media5.png" />
      <ImageMedia image="/profile/media6.png" />
      <ImageMedia image="/profile/media2.png" />
      <ImageMedia image="/profile/media6.png" />
      <ImageMedia image="/profile/media.png" />
    </div>
  );
};
ProfileMedia.Layout = ProfileActivitiesLayout;
export default ProfileMedia;
