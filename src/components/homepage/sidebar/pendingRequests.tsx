import Image from "next/image";
import React from "react";

function PendingRequests() {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-2"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <p className="text-[18px] border-b border-b-[#EDF0FB] pb-4 leading-[22px] text-[#2A2A2A] font-bold">
        Pending Requests (30)
      </p>
      <div className="flex flex-col gap-6">
        <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
          <div className="flex flex-col gap-3">
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
            <div className="flex gap-4">
              <p className="rounded-[32px] py-2 px-[39px] bg-[#4534B8] text-xs font-medium text-white">
                Accept
              </p>
              <p className="rounded-[32px] py-2 px-[39px] bg-[#EDF0FB] text-xs font-medium text-duduzili-violet">
                Reject
              </p>
            </div>
          </div>
        </div>
        <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
          <div className="flex flex-col gap-3">
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
            <div className="flex gap-4">
              <p className="rounded-[32px] py-2 px-[39px] bg-[#4534B8] text-xs font-medium text-white">
                Accept
              </p>
              <p className="rounded-[32px] py-2 px-[39px] bg-[#EDF0FB] text-xs font-medium text-duduzili-violet">
                Reject
              </p>
            </div>
          </div>
        </div>
        <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
          <div className="flex flex-col gap-3">
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
            <div className="flex gap-4">
              <p className="rounded-[32px] py-2 px-[39px] bg-[#4534B8] text-xs font-medium text-white">
                Accept
              </p>
              <p className="rounded-[32px] py-2 px-[39px] bg-[#EDF0FB] text-xs font-medium text-duduzili-violet">
                Reject
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
        Show more
      </p>
    </div>
  );
}

export default PendingRequests;
