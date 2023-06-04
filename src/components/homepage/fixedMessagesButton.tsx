import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import React from "react";
import MessageMenu from "../messagePopup/messageMenu";

function FixedMessagesButton() {
  const user: any = useAtomValue(userDetails)
  return (
    <div className="fixed bottom-5 left-0 right-0 ">
      <div className="max-w-[1500px] relative flex justify-end mx-auto">
        <MessageMenu />
      </div>
    </div>
  );
}

export default FixedMessagesButton;
