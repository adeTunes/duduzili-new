import React from "react";
import CommunityPicture from "./communityPicture";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { CommunityDetails } from "../../../api/request.types";
import dayjs from "dayjs";
import { clsx } from "@mantine/core";
import LeaveCommunity from "./leaveCommunity";

function CommunityViewCard({ community }: { community: CommunityDetails }) {
  return (
    <div className="flex flex-col gap-[29px]">
      <CommunityPicture
        tag={community?.data?.category}
        image={community?.data?.get_logo_url?.substring(62)}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[18px] flex flex-col gap-1 leading-[24px] text-[#2A2A2A]">
            <span>{community?.data?.name}</span>
            {community?.data?.date_joined === "Not a member of community !" ? (
              null
            ) : (
              <span className="text-[14px] leading-6 text-[#2A2A2A] font-normal">
                Joined{" "}
                {dayjs(community?.data?.date_joined).format("DD/MM/YYYY")}
              </span>
            )}
          </p>
          {community?.data?.status === "Select" ? (
            <LeaveCommunity code={community?.data?.code} />
          ) : (
            <p className=" bg-duduzili-violet text-white font-medium px-6 py-4 rounded-[32px] cursor-pointer">
              Join
            </p>
          )}
        </div>
        <div className="flex items-center gap-[19px]">
          <div className="flex">
            {community?.data?.members_photo?.map((item, idx) => (
              <img
                key={idx}
                src={item}
                className={clsx(
                  idx !== 0 && "ml-[-20px]",
                  "w-[33px] h-[33px] object-cover rounded-full"
                )}
                alt=""
              />
            ))}
          </div>
          <p className="leading-[24px] text-[#2A2A2A]">
            {community?.data?.total_members} members
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommunityViewCard;
