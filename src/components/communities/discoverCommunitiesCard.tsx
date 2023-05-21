import React from "react";
import CommunityPicture from "./communityPicture";
import { clsx } from "@mantine/core";
import { Community, CommunityList } from "../../../api/request.types";

function DiscoverCommunitiesCard({ community }: {community: Community}) {
  return (
    <>
      <CommunityPicture image={community?.get_logo_url} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <p className="font-bold text-[18px] leading-[24px] text-[#2A2A2A]">
            {community?.name}
          </p>
          <div className="flex items-center gap-[19px]">
            <div className="flex">
              {
                community?.members_photo?.map((item, index) => (
                  index < 3 &&
                  <img key={index}
                    src="/homePage/ellipse-2.png"
                    className={clsx(index !== 0 && "ml-[-20px]", "w-[33px] h-[33px] object-cover rounded-full")}
                    alt=""
                  />
                ))
              }
            </div>
            <p className="leading-[24px] text-[#2A2A2A]">{community?.total_members} {community?.total_members < 2 ? "member" : "members"}</p>
          </div>
        </div>
        {community?.status === "Join" ? (
            <p className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer">
              Join
            </p>
        ) : (
          <p className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer">
            Ask to join
          </p>
        )}
      </div>
    </>
  );
}

export default DiscoverCommunitiesCard;
