import Image from "next/image";
import React from "react";

function JoinRequest() {
  return (
    <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
      <div className="flex gap-3 items-center">
        <div className="w-[36px] h-[36px]">
          <Image
            src="/aside/profile-picture.png"
            className="w-full h-full rounded-full object-cover"
            alt="profile picture of suggested friend"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className=" font-bold leading-[19px] text-[#2A2A2A]">Bat Man</p>
          <p className="text-[#505050] leading-[19px]">@J.Doe</p>
        </div>
      </div>
      <div className="flex gap-4">
        <p className="rounded-[32px] py-2 px-4 bg-[#4534B8] text-xs font-medium text-white">
          Accept
        </p>
        <p className="rounded-[32px] py-2 px-4 bg-[#EDF0FB] text-xs font-medium text-duduzili-violet">
          Reject
        </p>
      </div>
    </div>
  );
}

export default JoinRequest;
