import { Icon } from "@iconify/react";
import React from "react";

function GroupChatView({ setAction }) {
  return (
    <div className="flex mx-4 overflow-auto flex-col gap-3">
      <div className="flex pb-4 border-b border-b-[#C0D0E8] items-center justify-between">
        <Icon
          onClick={() => setAction("friend-list")}
          className="cursor-pointer"
          icon="mdi:arrow-left"
          height={25}
          width={25}
        />
        <div className="flex items-center gap-[19px]">
            <div className="flex">
                <img src="/profile-pic-default.png" className="w-6 h-6 object-cover" alt="" />
                <img src="/profile-pic-default.png" className="w-6 h-6 object-cover ml-[-12px]" alt="" />
                <img src="/profile-pic-default.png" className="w-6 h-6 object-cover ml-[-12px]" alt="" />
            </div>
            <div className="flex flex-col gap-[2px]">
                <p className="text-[#222222] font-semibold leading-6">You, Jane Doe and Frank..</p>
                <p className="text-[#2a2a2a] text-xs leading-[15px]">@frank_muller, @jamesbruce, @jane...</p>
            </div>
        </div>
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          className="cursor-pointer"
          width={28}
          height={28}
        />
      </div>
      <div className="overflow-auto flex-1"></div>
    </div>
  );
}

export default GroupChatView;
