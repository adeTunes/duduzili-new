import { selectedMessage } from "@/store";
import { Text, clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";

function MessageCard({ image, text, name, date, unread, onClick, id, usage }: { image: string, text: string, name: string, date: string, unread: number, onClick: () => void, id: string, usage?: string }) {
  const selected = useAtomValue(selectedMessage);
  return (
    <div
      onClick={onClick}
      className={clsx(
        selected === id
          ? "bg-[#F4F4F4] border-r-[4px] border-r-duduzili-violet"
          : "bg-[#FFFFFF] border-r-[4px] border-r-transparent",
        "py-2 hover:bg-[#F4F4F4] cursor-pointer px-6 gap-[3vw] flex justify-between"
      )}
    >
      <div className="flex items-center gap-[19px]">
        <div className={clsx(usage ? "min-w-[40px] w-[40px] h-[40px] min-h-[40px]" : "min-w-[52px] w-[52px] h-[52px] min-h-[52px]")}>
          <img
            src={image}
            className="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="gap-1 flex flex-col">
          <p className={clsx(usage ? "text-[14px]" : "leading-6", "text-[#222222] font-semibold ")}>{name}</p>
          <Text truncate lineClamp={1} sx={{fontWeight: unread ? 700 : 400}} className="text-[#2A2A2A] text-xs">{text}</Text>
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

export default MessageCard;
