import React, { useState } from "react";
import CommunityPicture from "./communityPicture";
import { CommunityDetails } from "../../../api/request.types";
import dayjs from "dayjs";
import { Loader, Skeleton, clsx } from "@mantine/core";
import LeaveCommunity from "./leaveCommunity";
import { useQueryClient } from "@tanstack/react-query";
import { joinCommunity } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import useImageViewer from "../../../hooks/useImageViewer";
import GalleryViewer from "../homepage/posts/galleryViewer";
import { useDisclosure } from "@mantine/hooks";
import MembersDrawer from "./membersDrawer";
import { notify } from "../../../utils/notification-handler";

function CommunityViewCard({ community }: { community: CommunityDetails }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState("");
  const [membersOpened, { open, close }] = useDisclosure(false);

  const { viewerData } = useImageViewer(image);
  const startIndex = 0;

  const joinCommunityAction = () => {
    setLoading(true);
    const data = new FormData();
    data.append("community_code", community?.data?.code);
    data.append("action", "Join");
    joinCommunity(data)
      .then(({ data }) => {
        notify({
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
        handleClick={() => {
          setImage(community?.data?.get_logo_url || "/cover-image.png");
          setOpened(true);
        }}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-[18px] flex flex-col gap-1 leading-[24px] text-[#2A2A2A]">
            <span style={{ fontSize: "clamp(14px, 1.55vw, 18px)" }}>
              {community?.data?.name?.replace(
                community?.data?.name?.[0],
                community?.data?.name?.[0]?.toLocaleUpperCase()
              )}
            </span>
            {community?.data?.date_joined ===
            "Not a member of community !" ? null : (
              <span className="text-[14px] leading-6 text-[#2A2A2A] font-normal">
                {community?.data?.is_owner ? "Created" : "Joined"}{" "}
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
              className=" bg-duduzili-violet whitespace-nowrap text-white flex items-center max-[400px]:px-3 max-[400px]:py-2 max-[400px]:text-sm font-medium px-6 py-4 rounded-[32px] cursor-pointer"
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
          <div
            onClick={() => {
              if (!community?.data?.is_joined) {
                return notify({
                  message: "You are not a member of this community!",
                });
              }
              open();
            }}
            className="flex cursor-pointer"
          >
            {community?.data?.members_photo?.map((item, idx) => (
              <img
                key={idx}
                src={item }
                className={clsx(
                  idx !== 0 && "ml-[-20px]",
                  "w-[33px] h-[33px] object-cover rounded-full"
                )}
                alt=""
              />
            ))}
          </div>
          {community?.data?.total_members ? (
            <p
              onClick={() => {
                if (!community?.data?.is_joined) {
                  return notify({
                    message: "You are not a member of this community!",
                  });
                }
                open();
              }}
              className="leading-[24px] cursor-pointer hover:text-[#9e9b9b] text-[#2A2A2A]"
              style={{ fontSize: "clamp(12px, 0.96vw, 16px)" }}
            >
              {+community?.data?.total_members < 2
                ? `${+community?.data?.total_members} member`
                : `${+community?.data?.total_members} members`}
            </p>
          ) : null}
        </div>
      </div>
      <p className="leading-6 text-sm">{community?.data?.description}</p>
      <GalleryViewer
        setOpened={setOpened}
        startIndex={startIndex}
        gallery={viewerData}
        opened={opened}
      />
      {community?.data?.is_joined ? (
        <MembersDrawer
          code={community?.data?.code}
          opened={membersOpened}
          close={close}
        />
      ) : null}
    </div>
  );
}

export default CommunityViewCard;
