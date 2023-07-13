import { Text, clsx } from "@mantine/core";
import React from "react";

function FriendListCard({
  image,
  selected,
  text,
  name,
  date,
  unread,
  onClick,
  id,
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        selected === id
          ? "bg-[#F4F4F4] border-r-[4px] border-r-duduzili-violet"
          : "bg-[#FFFFFF] border-r-[4px] border-r-transparent",
        "py-2 hover:bg-[#F4F4F4] cursor-pointer px-6 max-[345px]:px-2 max-[310px]:px-0 flex gap-[2px] justify-between"
      )}
    >
      <div className="flex items-center gap-[19px]">
        <div className="w-[52px] h-[52px] max-[345px]:w-10 max-[345px]:h-10">
          <img
            src={image}
            className="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="gap-1 flex flex-col">
          <p className="text-[#222222] font-semibold leading-6">{name}</p>
          <Text className="text-[#2A2A2A] text-xs" lineClamp={1} truncate>{text ? `${text?.slice(0, 30) }...` : ""}</Text>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-[#828282] text-[10px] leading-3 whitespace-nowrap">{date}</p>
        <span
          className={clsx(
            !unread ? "bg-transparent" : "bg-duduzili-orange",
            "h-5 w-5  flex text-[12.5px] items-center text-white justify-center rounded-full"
          )}
        >
          {unread}
        </span>
      </div>
    </div>
  );
}

export default FriendListCard;
