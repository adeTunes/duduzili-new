import { Icon } from "@iconify/react";
import {clsx} from "@mantine/core"
import React from "react";

function CommunityHeader({ membersPhoto, name, totalMembers }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[9px]">
        <p className="font-bold text-[18px] leading-[24px] text-[#2A2A2A]">
          {name}
        </p>
        <div className="flex items-center gap-[19px]">
          <div className="flex">
            {membersPhoto?.map((item, index) => (
              index < 3 &&
              <img key={index}
                src={item}
                className={clsx(index !== 0 && "ml-[-20px]", "w-[33px] h-[33px] object-cover rounded-full")}
                alt=""
              />
            ))}
          </div>
          <p className="leading-[24px] text-[#2A2A2A]">{totalMembers} members</p>
        </div>
      </div>
      <Icon
        icon="solar:menu-dots-bold"
        height={24}
        width={24}
        rotate={1}
        className="cursor-pointer"
      />
    </div>
  );
}

export default CommunityHeader;
