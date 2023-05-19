import Image from "next/image";
import React from "react";

function CommunityPicture() {
  return (
    <div className="h-[240px]">
      <Image
        src="/communities/community-picture.png"
        className="h-full w-full object-cover rounded-2xl"
        alt="community picture"
      />
    </div>
  );
}

export default CommunityPicture;
