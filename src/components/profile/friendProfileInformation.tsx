import React, { useState } from "react";
import PostImage from "../homepage/posts/postImage";
import { Icon } from "@iconify/react";
import { MessageText, UserAdd } from "iconsax-react";
import { followUserAction } from "@/actions/postOptionActions";
import { Loading } from "../loading";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import FriendProfileOptions from "./friendProfileOptions";
import Image from "next/image";

function FriendProfileInformation({ friendDetails }) {
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col gap-[25px] pb-[43px] border-b-[5px] border-b-[#F4F4F4]">
      <div className="flex flex-col">
        <PostImage
          image="/communities/community-picture.png"
          height="h-[240px]"
        />
        <div className="flex justify-between items-center pl-8">
          <div className="w-[150px] h-[150px] mt-[-70px]">
            <img
              src={friendDetails?.  user?.photo_url?.substring(62) }
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex items-center gap-4">
            <p
              onClick={() =>
                followUserAction(
                  setLoadingFollow,
                  friendDetails?.user?.id,
                  () =>
                    queryClient.invalidateQueries([
                      "user-activities",
                      friendDetails?.user?.id,
                    ])
                )
              }
              role="button"
              className="px-6 py-4 flex items-center gap-2 rounded-[32px] font-medium text-white bg-duduzili-violet"
            >
              {loadingFollow ? (
                <Loader />
              ) : (
                <>
                  <UserAdd size="24" color="#FFF" />
                  <span>
                    {friendDetails?.user?.is_following ? "Unfollow" : "Follow"}
                  </span>
                </>
              )}
            </p>
            <p
              role="button"
              className="px-6 py-4 flex items-center gap-2 rounded-[32px] font-medium bg-[#EDF0FB]"
            >
              <MessageText size="24" color="#4534B8" variant="Outline" />
              <span className=" text-duduzili-violet">Message</span>
            </p>
            {loading ? (
              <Loader />
            ) : (
              <FriendProfileOptions
                setLoading={setLoading}
                post={friendDetails}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className=" font-bold text-[32px] leading-6 text-[#2A2A2A]">
            {friendDetails?.user?.first_name} {friendDetails?.user?.last_name}
          </p>
          <p className="text-[#2A2A2A] text-[15px] leading-6">
            @{friendDetails?.user?.username}
          </p>
        </div>
        <p className="text-[#8A8D88] text-[15px] leading-6">
          {friendDetails?.user?.bio}
        </p>
        <div className="flex items-center gap-10">
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
              {friendDetails?.followers}
            </span>
            <span className="text-[12px] leading-[15px] text-[#757575]">
              Followers
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
              {friendDetails?.followings}
            </span>
            <span className="text-[12px] leading-[15px] text-[#757575]">
              Following
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FriendProfileInformation;
