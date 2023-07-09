import React, { useState } from "react";
import CommunityPicture from "./communityPicture";
import { Loader, clsx } from "@mantine/core";
import { Community } from "../../../api/request.types";
import { joinCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

function DiscoverCommunitiesCard({selectedCategory, community }: {selectedCategory?: any; community: Community }) {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const queryClient = useQueryClient()
  const joinCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", community?.code);
    data.append("action", "Join");
    joinCommunity(data)
      .then(({ data }) => {
        showNotification({
          message: data?.message || data?.errors || data?.error,
        });
        queryClient.invalidateQueries(["all-communities", selectedCategory])
        push(`/communities/${community?.code}`)
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <>
      <CommunityPicture code={community?.code} image={community?.get_logo_url || "/cover-image.png"} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <p className="font-bold text-[18px] max-[400px]:text-[15px] leading-[24px] text-[#2A2A2A]">
            {community?.name?.replace(community?.name?.[0], community?.name?.[0]?.toLocaleUpperCase())}
          </p>
          <div className="flex max-[400px]:flex-col max-[400px]:items-start items-center gap-[19px]">
            <div className="flex">
              {community?.members_photo?.map(
                (item, index) =>
                  index < 3 && (
                    <img
                      key={index}
                      src={item }
                      className={clsx(
                        index !== 0 && "ml-[-20px]",
                        "w-[33px] border-[2px] border-white h-[33px] object-cover rounded-full"
                      )}
                      alt=""
                    />
                  )
              )}
            </div>
            <p className="leading-[24px] max-[400px]:text-sm text-[#2A2A2A]">
              {community?.total_members}{" "}
              {community?.total_members < 2 ? "member" : "members"}
            </p>
          </div>
        </div>
        <p
          onClick={
            community?.is_joined
              ? () => push(`/communities/${community?.code}`) 
              : joinCommunityAction
          }
          className="text-[#4534B8] bg-[#EDF0FB] max-[400px]:px-3 max-[400px]:text-sm max-[400px]:py-1 py-3 px-6 rounded-[32px] cursor-pointer"
        >
          {loading ? <Loader size="sm" /> : community?.is_joined ? "Select" : community?.is_private ? "Ask to join" : "Join"}
        </p>
        {/* {community?.status === "Join" ? (
          <p
            onClick={joinCo}
            className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer"
          >
            {loading ? <Loader size="sm" /> : "Join"}
          </p>
        ) : (
          <p className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer">
            Ask to join
          </p>
        )} */}
      </div>
    </>
  );
}

export default DiscoverCommunitiesCard;
