import React, { useState } from "react";
import PostImage from "../homepage/posts/postImage";
import { Icon } from "@iconify/react";
import { MessageText, UserAdd } from "iconsax-react";
import { followUserAction } from "@/actions/postOptionActions";
import { Loading } from "../loading";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Skeleton } from "@mantine/core";
import FriendProfileOptions from "./friendProfileOptions";
import Image from "next/image";
import Link from "next/link";
import { base64encode } from "nodejs-base64";
import { useRouter } from "next/router";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";
import SinglePostSkeleton from "../skeletons/singlePostSkeleton";
import DefaultProfilePicture from "./defaultProfilePicture";

function FriendProfileInformation({ friendDetails }) {
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState("");

  const { viewerData } = useImageViewer(image);
  const startIndex = 0;
  return (
    <div className="flex flex-col gap-[25px] pb-[43px] border-b-[5px] border-b-[#F4F4F4]">
      <div className="flex flex-col">
        <PostImage
          handleClick={() => {
            setImage(
              friendDetails?.user?.get_cover_image ||
                "/communities/cover-pic-default.png"
            );
            setOpened(true);
          }}
          image={
            friendDetails?.user?.get_cover_image ||
            "/communities/cover-pic-default.png"
          }
          height="h-[240px]"
        />
        <div className="flex relative justify-between max-[956px]:flex-col max-[956px]:items-start max-[956px]:gap-4 items-center pl-8">
          <div
            style={{
              width: "clamp(80px, 9.8vw, 150px)",
              height: "clamp(80px, 9.8vw, 150px)",
            }}
            className="mt-[-70px] max-[956px]:mt-[-50px]"
          >
            {friendDetails?.user?.photo_url ? (
              <img
                onClick={() => {
                  setImage(friendDetails?.user?.photo_url );
                  setOpened(true);
                }}
                src={friendDetails?.user?.photo_url }
                className="w-full relative h-full object-cover rounded-full"
                alt="user profile picture"
              />
            ) : (
              <DefaultProfilePicture
                text="text-[300%] max-[1120px]:text-[250%] max-[900px]:text-[150%]"
                firstName={friendDetails?.user?.first_name}
                lastName={friendDetails?.user?.last_name}
              />
            )}
          </div>
          <div className="flex items-center gap-4 max-[956px]:-ml-8">
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
              className="px-6 py-4 max-[500px]:px-3 max-[500px]:py-2  flex items-center gap-2 rounded-[32px] font-medium text-white bg-duduzili-violet"
            >
              {loadingFollow ? (
                <Loader />
              ) : (
                <>
                  <UserAdd
                    className="max-[400px]:h-4 h-6 w-6 max-[400px]:w-4"
                    color="#FFF"
                  />
                  <span>
                    {friendDetails?.user?.is_following ? "Unfollow" : "Follow"}
                  </span>
                </>
              )}
            </p>
            <p
              onClick={() => {
                const friend = JSON.stringify(friendDetails?.user);
                if (window.innerWidth <= 800) {
                  push(`/messages/view?chat=${base64encode(friend)}`)
                  return
                }
                push(`/messages/friends?chat=${base64encode(friend)}`);
              }}
              role="button"
              className="px-6 max-[385px]:hidden py-4 max-[500px]:px-3 max-[500px]:py-2  flex items-center gap-2 rounded-[32px] font-medium bg-[#EDF0FB]"
            >
              <MessageText
                className="max-[400px]:h-4 h-6 w-6 max-[400px]:w-4"
                color="#4534B8"
                variant="Outline"
              />
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
          <p style={{
            fontSize: "clamp(18px, 1.8vw, 32px)",
          }} className=" font-bold leading-8 text-[#2A2A2A]">
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
          <Link
            href={`/followers/${friendDetails?.user?.id}?user=${friendDetails?.user?.first_name} ${friendDetails?.user?.last_name}`}
          >
            <p className="flex items-center gap-2">
              <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
                {friendDetails?.followers}
              </span>
              <span className="text-[12px] leading-[15px] text-[#757575]">
                Followers
              </span>
            </p>
          </Link>
          <Link
            href={`/followers/${friendDetails?.user?.id}?user=${friendDetails?.user?.first_name} ${friendDetails?.user?.last_name}`}
          >
            <p className="flex items-center gap-2">
              <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
                {friendDetails?.followings}
              </span>
              <span className="text-[12px] leading-[15px] text-[#757575]">
                Following
              </span>
            </p>
          </Link>
        </div>
      </div>
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={opened}
      />
    </div>
  );
}

export default FriendProfileInformation;
