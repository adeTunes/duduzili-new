import { selectedMessage } from "@/store";
import { Loader, Text, clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useState } from "react";
import DefaultProfilePicture from "../profile/defaultProfilePicture";
import { ArrowDown2 } from "iconsax-react";
import ChatsMenu from "./chatsMenu";

function MessageCard({
  chatID,
  image,
  text,
  name,
  date,
  unread,
  onClick,
  id,
  usage,
}: {
  chatID?: number;
  image: string;
  text: string;
  name: string;
  date: string;
  unread: number;
  onClick: () => void;
  id: string;
  usage?: string;
}) {
  const selected = useAtomValue(selectedMessage);
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={clsx(
        selected === id
          ? "bg-[#F4F4F4] border-r-[4px] border-r-duduzili-violet"
          : "bg-[#FFFFFF] border-r-[4px] border-r-transparent",
        "py-2 hover:bg-[#F4F4F4] group cursor-pointer px-6 max-[400px]:px-3 gap-[10px] flex justify-between"
      )}
    >
      <div onClick={onClick} className="flex flex-1 items-center gap-[19px]">
        <div
          className={clsx(
            usage
              ? "min-w-[40px] max-[450px]:w-[30px] max-[450px]:h-[30px] max-[450px]:min-w-[30px] max-[450px]:min-h-[30px] w-[40px] h-[40px] min-h-[40px]"
              : "max-[450px]:w-[30px] max-[450px]:h-[30px] max-[450px]:min-w-[30px] max-[450px]:min-h-[30px] min-w-[52px] w-[52px] h-[52px] min-h-[52px]"
          )}
        >
          {image ? (
            <img
              src={image}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          ) : (
            <DefaultProfilePicture
              text="text-[80%]"
              firstName={name.split(" ")[0]}
              lastName={name.split(" ")[1]}
            />
          )}
        </div>
        <div className="gap-1 flex flex-col">
          <p
            className={clsx(
              usage ? "text-[14px]" : "leading-6 max-[450px]:text-sm",
              "text-[#222222] max-[450px]:text-sm font-semibold "
            )}
          >
            {name}
          </p>
          <Text
            truncate
            lineClamp={1}
            sx={{ fontWeight: unread ? 700 : 400 }}
            className="text-[#2A2A2A] text-xs"
          >
            {text?.length > 21 ? text?.slice(0, 21) + "..." : text}
          </Text>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {chatID ? (
          loading ? (
            <Loader size="sm" />
          ) : (
            <ChatsMenu setLoading={setLoading} chatID={chatID} />
          )
        ) : null}
        <div onClick={onClick} className="flex flex-col gap-2 items-center">
          <p className="text-[#828282] text-[10px] leading-3 whitespace-nowrap">
            {date}
          </p>
          <span
            className={clsx(
              !unread ? "bg-transparent" : "bg-duduzili-orange",
              "h-5 w-5  flex text-[12.5px] items-center text-white justify-center rounded-full"
            )}
          >
            {unread || ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
