import Image from "next/image";
import React from "react";

type Props = {
  fullName: string;
  username: string;
  image?: string;
};

function UserAvatarWithName({ fullName, username, image }: Props) {
  return (
    <div className="flex items-center gap-[19px]">
      <div className="h-[52px] w-[52px]">
        <Image
          src={image ?? "/message/friend-avatar.png"}
          className="h-full w-full object-cover rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="text-[18px] font-semibold text-[#222222] leading-[22px]">
          {fullName}
        </p>
        <p className="text-[14px] leading-[17px] text-[#2A2A2A]">@{username}</p>
      </div>
    </div>
  );
}

export default UserAvatarWithName;
