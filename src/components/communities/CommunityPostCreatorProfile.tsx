import Image from "next/image";
import React from "react";

function CommunityPostCreatorProfile() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-[56px] w-[56px]">
          <Image
            src="/homePage/user-image.png"
            className="w-full h-full object-cover rounded-full"
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>John Doe</p>
          <span className="flex items-center gap-1">
            <small>Dec 4</small>
            <span className="bg-[#2A2A2A] text-white px-2 rounded-2xl py-1">
              2d ago
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityPostCreatorProfile;
