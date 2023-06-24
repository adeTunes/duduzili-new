import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function CommunityPicture({
  image,
  tag,
  code,
  handleClick,
}: {
  image?: string;
  tag?: { name: string }[];
  code?: string;
  handleClick?: () => void;
}) {
  const { push } = useRouter();
  return (
    <div className="h-[240px] relative group">
      {tag ? (
        <div className="flex absolute top-4 left-4 items-center gap-3 ">
          {tag?.map((item, idx) => (
            <span
              key={idx}
              className="bg-[#EDF0FB] rounded-[16px] px-3 py-2 text-[#4534B8] text-[10px] leading-3"
            >
              {item?.name}
            </span>
          ))}
        </div>
      ) : null}
      <div
        onClick={() => {
          if(!tag) {
            push(`/communities/${code}`);
          } else handleClick()
        }}
        className="absolute top-0 right-0 rounded-2xl left-0 bottom-0 group-hover:inline-block hidden cursor-pointer bg-[#d6d3e5] opacity-[0.2]"
      ></div>
      <img
        src={image || "/communities/community-default.png"}
        className="h-full w-full object-cover rounded-2xl"
        alt="community picture"
      />
    </div>
  );
}

export default CommunityPicture;
