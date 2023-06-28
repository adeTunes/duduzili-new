import { clsx } from "@mantine/core";
import React from "react";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

type Prop = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  image: string;
  username: string;
  name: string;
};

function SearchList({ onClick, image, username, name }: Prop) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "py-2 bg-[#FFFFFF] border-r-[4px] border-r-transparent hover:bg-[#F4F4F4] cursor-pointer px-6 flex justify-between"
      )}
    >
      <div className="flex items-center gap-[19px]">
        <div className="w-[52px] h-[52px]">
          {image ? (
            <img
              src={image}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          ) : (
            <DefaultProfilePicture
              firstName={name.split(" ")[0]}
              lastName={name.split(" ")[1]}
              text="text-[100%]"
            />
          )}
        </div>
        <div className="gap-1 flex flex-col">
          <p className="text-[#222222] font-semibold leading-6">{name}</p>
          <p className="text-[#2A2A2A] text-xs">@{username}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchList;
