import Image from "next/image";
import React from "react";

function CommunityPicture({ image, tag }: { image?: string; tag?: {name: string}[] }) {
  return (
    <div className="h-[240px] relative">
      {tag ? (
        <div className="flex absolute top-4 left-4 items-center gap-3 ">
          {tag?.map((item, idx) => (
            <span key={idx} className="bg-[#EDF0FB] rounded-[16px] px-3 py-2 text-[#4534B8] text-[10px] leading-3">
              {item?.name}
            </span>
          ))}
        </div>
      ) : null}
      <img
        src={image || "/communities/community-default.png"}
        className="h-full w-full object-cover rounded-2xl"
        alt="community picture"
      />
    </div>
  );
}

export default CommunityPicture;
