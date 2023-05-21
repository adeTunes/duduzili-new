import Image from "next/image";
import React from "react";

function CommunityPicture({image}: {image?: string}) {
  return (
    <div className="h-[240px]">
      <img
        src={image || "/communities/community-default.png"}
        className="h-full w-full object-cover rounded-2xl"
        alt="community picture"
      />
    </div>
  );
}

export default CommunityPicture;
