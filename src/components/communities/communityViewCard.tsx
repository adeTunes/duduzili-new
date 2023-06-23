import React, { useState } from "react";
import CommunityPicture from "./communityPicture";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { CommunityDetails } from "../../../api/request.types";
import dayjs from "dayjs";
import { Loader, Skeleton, clsx } from "@mantine/core";
import LeaveCommunity from "./leaveCommunity";
import { useQueryClient } from "@tanstack/react-query";
import { joinCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";

function CommunityViewCard({
  community
}: {
  community: CommunityDetails;
}) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { query } = useRouter();

  const joinCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", community?.data?.code);
    data.append("action", "Join");
    joinCommunity(data)
      .then(({ data }) => {
        showNotification({
          message: data?.errors || data?.message || data?.error,
        });
        queryClient.invalidateQueries([
          "community-details",
          community?.data?.code,
        ]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <div className="flex flex-col gap-[29px]">
      <CommunityPicture
        tag={community?.data?.category}
        image={community?.data?.get_logo_url || "/cover-image.png"}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[18px] flex flex-col gap-1 leading-[24px] text-[#2A2A2A]">
            <span>
              {community?.data?.name?.replace(
                community?.data?.name?.[0],
                community?.data?.name?.[0]?.toLocaleUpperCase()
              )}
            </span>
            {community?.data?.date_joined ===
            "Not a member of community !" ? null : (
              <span className="text-[14px] leading-6 text-[#2A2A2A] font-normal">
                Joined{" "}
                {dayjs(community?.data?.date_joined).format("DD/MM/YYYY")}
              </span>
            )}
          </p>
          {community?.data?.is_joined ? (
            <LeaveCommunity
              name={community?.data?.name}
              isOwner={community?.data?.is_owner}
              code={community?.data?.code}
            />
          ) : (
            <p
              onClick={joinCommunityAction}
              className=" bg-duduzili-violet text-white flex items-center font-medium px-6 py-4 rounded-[32px] cursor-pointer"
            >
              {loading ? (
                <Loader size="sm" />
              ) : community?.data?.is_private ? (
                "Ask to join"
              ) : (
                "Join"
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[19px]">
          <div className="flex">
            {community?.data?.members_photo?.map((item, idx) => (
              <img
                key={idx}
                src={item?.substring(62)}
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
