import Image from "next/image";
import React from "react";

function DiscoverFriendRequests() {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex flex-col gap-[11px]">
        <p className="text-[18px] leading-[22px] text-[#2A2A2A] font-bold">
          Friend Requests
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
              <div className="flex gap-3 items-center">
                <div className="w-[36px] h-[36px]">
                  <img
                    src="/aside/profile-picture.png"
                    className="w-full h-full rounded-full object-cover"
                    alt="profile picture of suggested friend"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                    Bat Man
                  </p>
                  <p className="text-[#505050] leading-[19px]">@J.Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                  Accept
                </p>
                <p className="cursor-pointer text-duduzili-violet leading-[15px] text-[12px] px-4 py-2 bg-[#EDF0FB] rounded-[32px]">
                  Reject
                </p>
              </div>
            </div>
            <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
              <div className="flex gap-3 items-center">
                <div className="w-[36px] h-[36px]">
                  <img
                    src="/aside/profile-picture.png"
                    className="w-full h-full rounded-full object-cover"
                    alt="profile picture of suggested friend"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                    Bat Man
                  </p>
                  <p className="text-[#505050] leading-[19px]">@J.Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                  Accept
                </p>
                <p className="cursor-pointer text-duduzili-violet leading-[15px] text-[12px] px-4 py-2 bg-[#EDF0FB] rounded-[32px]">
                  Reject
                </p>
              </div>
            </div>
            <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
              <div className="flex gap-3 items-center">
                <div className="w-[36px] h-[36px]">
                  <img
                    src="/aside/profile-picture.png"
                    className="w-full h-full rounded-full object-cover"
                    alt="profile picture of suggested friend"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                    Bat Man
                  </p>
                  <p className="text-[#505050] leading-[19px]">@J.Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                  Accept
                </p>
                <p className="cursor-pointer text-duduzili-violet leading-[15px] text-[12px] px-4 py-2 bg-[#EDF0FB] rounded-[32px]">
                  Reject
                </p>
              </div>
            </div>
          </div>
          <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
            Show more
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscoverFriendRequests;
