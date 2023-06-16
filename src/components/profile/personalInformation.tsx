import React from "react";
import PostImage from "../homepage/posts/postImage";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import EditProfileModal from "../modals/editProfileModal";
import { useAtomValue } from "jotai";
import { userFollowers, userFollowings } from "@/store";
import Image from "next/image";
import Link from "next/link";

function PersonalInformation({ user }) {
  const [opened, { open, close }] = useDisclosure(false);
  const followings = useAtomValue(userFollowings);
  const followers = useAtomValue(userFollowers);

  return (
    <div className="flex flex-col gap-[25px] pb-[43px] border-b-[5px] border-b-[#F4F4F4]">
      <div className="flex flex-col">
        <PostImage
          image={user?.get_cover_image || "/communities/cover-pic-default.png"}
          height="h-[240px]"
        />
        <div className="flex justify-between items-center pl-8">
          <div
            style={{
              width: "clamp(80px, 9.8vw, 150px)",
              height: "clamp(80px, 9.8vw, 150px)",
            }}
            className="mt-[-70px]"
          >
            <img
              src={user?.photo_url?.substring(62) ?? "/profile-pic-default.png"}
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
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
        <p className="text-[#8A8D88] text-[15px] leading-6">
          {user?.bio ??
            "Hi there! I use Duduzili platform to chat with friends and family, send medias and receive updates!"}
        </p>
        <div className="flex items-center gap-10">
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
        </div>
      </div>
      {opened ? <EditProfileModal opened={opened} close={close} /> : null}
    </div>
  );
}

export default PersonalInformation;
