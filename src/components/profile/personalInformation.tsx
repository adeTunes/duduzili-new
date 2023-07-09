import React, { useState } from "react";
import PostImage from "../homepage/posts/postImage";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import EditProfileModal from "../modals/editProfileModal";
import { useAtomValue } from "jotai";
import { userFollowers, userFollowings } from "@/store";
import Image from "next/image";
import Link from "next/link";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";
import { Skeleton } from "@mantine/core";
import DefaultProfilePicture from "./defaultProfilePicture";
import { Location } from "iconsax-react";

function PersonalInformation({ user }) {
  const [opened, { open, close }] = useDisclosure(false);
  const followings = useAtomValue(userFollowings);
  const followers = useAtomValue(userFollowers);

  const [galleryOpened, setGalleryOpened] = useState(false);
  const [image, setImage] = useState("");

  const { viewerData } = useImageViewer(image);
  const startIndex = 0;

  return (
    <div className="flex flex-col gap-[25px] pb-[43px] border-b-[5px] border-b-[#F4F4F4]">
      <div className="flex flex-col">
        <PostImage
          image={user?.get_cover_image || "/communities/cover-pic-default.png"}
          height="h-[240px]"
          handleClick={() => {
            setImage(
              user?.get_cover_image || "/communities/cover-pic-default.png"
            );
            setGalleryOpened(true);
          }}
        />
        <div className="flex justify-between items-center pl-8">
          <div
            style={{
              width: "clamp(80px, 9.8vw, 130px)",
              height: "clamp(80px, 9.8vw, 130px)",
            }}
            className="mt-[-70px] relative cursor-pointer"
          >
            {user?.photo_url ? (
              <img
                onClick={() => {
                  setImage(user?.photo_url );
                  setGalleryOpened(true);
                }}
                src={user?.photo_url }
                className="w-full relative h-full object-cover rounded-full"
                alt="user profile picture"
              />
            ) : (
              <DefaultProfilePicture
                text="text-[300%] max-[1120px]:text-[250%] max-[900px]:text-[150%]"
                firstName={user?.first_name}
                lastName={user?.last_name}
              />
            )}
          </div>
          <p
            onClick={open}
            role="button"
            className="px-6 max-[500px]:px-3 max-[500px]:py-2 py-4 flex items-center gap-2 rounded-[32px] font-medium text-white bg-duduzili-violet"
          >
            <Icon
              className="max-[400px]:h-4 h-6 w-6 max-[400px]:w-4"
              color="white"
              icon="uil:pen"
            />
            <span className="max-[400px]:text-xs">Edit Profile</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className=" font-bold max-[500px]:text-[25px] text-[32px] leading-6 text-[#2A2A2A]">
            {`${user?.first_name} ${user?.last_name}`}
          </p>
          <p className="text-[#2A2A2A] text-[15px] leading-6">
            @{user?.username}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Location size="16" color="#000" />
          {user?.country}
        </div>
        <p className="text-[#8A8D88] text-[15px] leading-6">
          {user?.bio ??
            "Hi there! I use Duduzili platform to chat with friends and family, send medias and receive updates!"}
        </p>
        <div className="flex items-center gap-10">
          {followers || +followers === 0 ? (
            <Link
              href={`/followers/${user?.id}?user=${user?.first_name} ${user?.last_name}`}
            >
              <p className="flex items-center gap-2">
                <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
                  {followers}
                </span>
                <span className="text-[12px] leading-[15px] text-[#757575]">
                  Followers
                </span>
              </p>
            </Link>
          ) : (
            <Skeleton height={12} className="flex-1" mt={10} />
          )}
          {followings || +followings === 0 ? (
            <Link
              href={`/following/${user?.id}?user=${user?.first_name} ${user?.last_name}`}
            >
              <p className="flex items-center gap-2">
                <span className="text-[#2A2A2A] font-bold text-[20px] leading-7">
                  {followings}
                </span>
                <span className="text-[12px] leading-[15px] text-[#757575]">
                  Following
                </span>
              </p>
            </Link>
          ) : (
            <Skeleton height={12} className="flex-1" mt={10} />
          )}
        </div>
      </div>
      <GalleryViewer
        setOpened={setGalleryOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={galleryOpened}
      />
      {opened ? <EditProfileModal opened={opened} close={close} /> : null}
    </div>
  );
}

export default PersonalInformation;
