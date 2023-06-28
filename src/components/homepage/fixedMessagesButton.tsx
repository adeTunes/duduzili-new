import React from "react";
import MessageMenu from "../messagePopup/messageMenu";

function FixedMessagesButton() {
  return (
    <div className="fixed bottom-[120px] z-50 left-0 right-0 ">
      <div className="max-w-[1500px] relative flex justify-end mx-auto">
        <MessageMenu />
      </div>
    </div>
  );
}

export default FixedMessagesButton;
