import Image from "next/image";
import React from "react";

type Props = {
  fullName: string;
  username: string;
  image?: string;
  height?: string
  width?: string
};

function UserAvatarWithName({ fullName, height, width, username, image }: Props) {
  return (
    <div className="flex items-center gap-[19px]">
      <div style={{height: height || "52px", width: width || "52px"}}>
        <img
          src={image ?? "/profile-pic-default.png"}
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
