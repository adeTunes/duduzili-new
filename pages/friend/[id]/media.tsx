import React, { useEffect } from "react";
import ProfileActivitiesLayout from "@/layout/profileActivitiesLayout";
import ImageMedia from "@/components/profile/imageMedia";
import VideoMedia from "@/components/profile/videoMedia";
import AudioMedia from "@/components/profile/audioMedia";
import { NextPageX } from "../../../types/next";
import FriendProfileActivities from "@/components/profile/friendProfileActivities";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import { useRouter } from "next/router";
import useUserActivities from "../../../hooks/useUserDrafts";
import { useSetAtom } from "jotai";
import { friendPersonalDetails } from "@/store";

const ProfileMedia: NextPageX = () => {
  const { query } = useRouter();
  const { data } = useUserActivities(query.id);
  const setFriendDetails = useSetAtom(friendPersonalDetails);

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);
  return !data?.user?.is_following && data?.user?.is_private ? (
    <div className="flex items-center justify-center">
      <div className="flex items-center flex-col gap-6">
        <img
          src="/profile/private-profile.png"
          className="w-[154px] object-cover"
          alt="private account profile illustration"
        />
        <p className="max-w-[275px] text-black font-medium leading-6 text-center">
          This is a private account. You will see their content when they accept
          your follow request
        </p>
      </div>
    </div>
  ) : (
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
ProfileMedia.Layout = FriendProfileLayout;
export default ProfileMedia;
