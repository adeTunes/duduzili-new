import Link from "next/link";
import React, { useState } from "react";
import useDiscoverPeople from "../../../../hooks/useDiscoverPeople";
import { followUserAction } from "@/actions/postOptionActions";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import useFollowings from "../../../../hooks/useFollowings";
import { base64encode } from "nodejs-base64";
import { useRouter } from "next/router";
import DefaultProfilePicture from "@/components/profile/defaultProfilePicture";

function DiscoverPeople() {
  const { data } = useDiscoverPeople();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const user: any = useAtomValue(userDetails);
  const { data: friends } = useFollowings(user?.user?.id);
  const { push } = useRouter();
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <p className="text-[18px] leading-[22px] text-[#2A2A2A] font-bold">
        Discover People
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[11px]">
          <p className="pb-[12px] text-[#505050] leading-[19px] border-b border-b-[#EDF0FB]">
            Suggested for you
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col max-[1125px]:text-[13px]">
              {data?.users?.map(
                (item, idx) =>
                  idx < 5 &&
                  !item?.is_following && (
                    <div
                      key={idx}
                      className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-[36px] h-[36px]">
                          {item?.photo_url ? (
                            <img
                              src={item?.photo_url}
                              className="w-full h-full rounded-full object-cover"
                              alt="profile picture of suggested friend"
                            />
                          ) : (
                            <DefaultProfilePicture
                              firstName={item?.first_name}
                              lastName={item?.last_name}
                              text="text-[80%]"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                            {item?.first_name} {item?.last_name}
                          </p>
                          <p className="text-[#505050] leading-[19px]">
                            @{item?.username}
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          setSelected(item?.id);
                          followUserAction(setLoading, item?.id, () => {
                            queryClient.invalidateQueries(["discover-people"]);
                            queryClient.invalidateQueries([
                              "user-followings",
                              user?.user?.id,
                            ]);
                          });
                        }}
                        className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
                      >
                        {loading && selected === item?.id ? (
                          <Loader size="xs" />
                        ) : item?.is_following ? (
                          "Unfollow"
                        ) : (
                          "Follow"
                        )}
                      </p>
                    </div>
                  )
              )}
            </div>
            <Link href="/discover-people">
              <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[11px]">
          <p className="pb-[12px] text-[#505050] leading-[19px] border-b border-b-[#EDF0FB]">
            Friends
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col max-[1125px]:text-[13px]">
              {friends?.map(
                (item, idx) =>
                  idx < 5 && (
                    <div
                      key={idx}
                      className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-[36px] h-[36px]">
                          {item?.photo_url ? (
                            <img
                              src={item?.photo_url}
                              className="w-full h-full rounded-full object-cover"
                              alt="profile picture of suggested friend"
                            />
                          ) : (
                            <DefaultProfilePicture
                              firstName={item?.first_name}
                              lastName={item?.last_name}
                              text="text-[80%]"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                            {item?.first_name} {item?.last_name}
                          </p>
                          <p className="text-[#505050] leading-[19px]">
                            @{item?.username}
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          const friend = JSON.stringify(item);
                          push(
                            `/messages/friends?chat=${base64encode(friend)}`
                          );
                        }}
                        className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
                      >
                        Message
                      </p>
                    </div>
                  )
              )}
            </div>
            <Link href="/friends">
              <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPeople;
