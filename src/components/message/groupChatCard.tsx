import { selectedMessage } from "@/store";
import { Text, clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";

function GroupChatCard({
  image,
  text,
  name,
  date,
  unread,
  onClick,
  id,
}: {
  image: string[];
  text: string;
  name: string;
  date: string;
  unread: string;
  onClick: () => void;
  id: string;
  usage?: string;
}) {
  const selected = useAtomValue(selectedMessage);
  return (
    <div
      onClick={onClick}
      className={clsx(
        selected === id
          ? "bg-[#F4F4F4] border-r-[4px] border-r-duduzili-violet"
          : "bg-[#FFFFFF] border-r-[4px] border-r-transparent",
        "py-2 hover:bg-[#F4F4F4] cursor-pointer px-6 flex justify-between"
      )}
    >
      <div className="flex items-center gap-[19px]">
        <div className="flex">
          {image.map((item, idx) => (
            <div key={idx} className="w-[24px] ml-[-10px] h-[24px]">
              <img
                src={item}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="gap-1 flex flex-col">
          <Text lineClamp={1} className="text-[#222222] font-semibold leading-6">{name}</Text>
          <p className="text-[#2A2A2A] text-xs">{text.slice(0, 30)}...</p>
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

export default GroupChatCard;
