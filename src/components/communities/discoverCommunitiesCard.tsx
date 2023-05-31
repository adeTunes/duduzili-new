import React, { useState } from "react";
import CommunityPicture from "./communityPicture";
import { Loader, clsx } from "@mantine/core";
import { Community } from "../../../api/request.types";
import { joinCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { base64encode } from "nodejs-base64";
import { useRouter } from "next/router";

function DiscoverCommunitiesCard({ community }: { community: Community }) {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const joinCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", community?.code);
    data.append("action", "join");
    joinCommunity(data)
      .then(({ data }) => {
        showNotification({
          message: data?.message || data?.error,
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <>
      <CommunityPicture image={community?.get_logo_url?.substring(62)} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <p className="font-bold text-[18px] leading-[24px] text-[#2A2A2A]">
            {community?.name}
          </p>
          <div className="flex items-center gap-[19px]">
            <div className="flex">
              {community?.members_photo?.map(
                (item, index) =>
                  index < 3 && (
                    <img
                      key={index}
                      src="/homePage/ellipse-2.png"
                      className={clsx(
                        index !== 0 && "ml-[-20px]",
                        "w-[33px] border-[2px] border-white h-[33px] object-cover rounded-full"
                      )}
                      alt=""
                    />
                  )
              )}
            </div>
            <p className="leading-[24px] text-[#2A2A2A]">
              {community?.total_members}{" "}
              {community?.total_members < 2 ? "member" : "members"}
            </p>
          </div>
        </div>
        {loading ? (
          <Loader size="sm" />
        ) : (
          <p
            onClick={
              community?.status === "Join"
                ? joinCommunityAction
                : community?.status === "Select"
                ? () => push(`/communities/${community?.code}`)
                : () => {}
            }
            className="text-[#4534B8] bg-[#EDF0FB] py-3 px-6 rounded-[32px] cursor-pointer"
          >
            {community?.status}
          </p>
        )}
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
