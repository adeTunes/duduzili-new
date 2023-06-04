import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import React from "react";

function FixedMessagesButton() {
  const user: any = useAtomValue(userDetails)
  return (
    <div className="fixed bottom-5 left-0 right-0 ">
      <div className="max-w-[1500px] flex justify-end mx-auto">
        <div
          role="button"
          className=" bg-[#4534B8] rounded-[32px] px-6 py-3 flex items-center gap-2"
        >
          <Icon
            icon="ci:chat-conversation"
            height={36}
            width={36}
            color="white"
          />
          <p className="py-1 px-3 rounded-full bg-[#E59055] text-[15px] text-white">
            {user?.number_of_messages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FixedMessagesButton;
