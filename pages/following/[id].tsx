import React, { useState } from "react";
import { Loader } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { followUserAction } from "@/actions/postOptionActions";
import { useRouter } from "next/router";
import { NextPageX } from "../../types/next";
import useDiscoverPeople from "../../hooks/useDiscoverPeople";
import FollowLayout from "@/layout/followLayout";
import Link from "next/link";
import useFollowings from "../../hooks/useFollowings";
import FollowSkeleton from "@/components/skeletons/followSkeleton";
import DefaultProfilePicture from "@/components/profile/defaultProfilePicture";
import Head from "next/head";

const Following: NextPageX = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const { push, query } = useRouter();
  const { data, isLoading } = useFollowings(+query.id);
  return (
    <>
    <Head>
    <title>Duduzili | Following</title>
    </Head>
      <div className="grid gap-8 grid-cols-2">
        <Link href={`/followers/${query.id}?user=${query.user}`}>
          <p className="py-3 text-center text-[#787878] font-medium leading-6">
            Followers
          </p>
        </Link>
        <Link href={`/following/${query.id}?user=${query.user}`}>
          <p
            className="py-3 bg-duduzili-violet rounded-[32px] text-center font-semibold leading-6 text-white"
            role="button"
          >
            Following
          </p>
        </Link>
      </div>
      <div
        className="bg-white max-[420px]:p-2 rounded-2xl p-6 flex flex-col gap-6"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        <div className="flex flex-col gap-[11px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              {isLoading ? (
                <>
                  <FollowSkeleton />
                  <FollowSkeleton />
                  <FollowSkeleton />
                  <FollowSkeleton />
                  <FollowSkeleton />
                  <FollowSkeleton />
                  <FollowSkeleton />
                </>
              ) : (
                data?.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                  >
                    <div className="flex gap-3 items-center">
                      <div
                        onClick={() => push(`friend/${item?.id}/post`)}
                        className="w-[36px] cursor-pointer h-[36px]"
                      >
                        {item?.photo_url ? (
                          <img
                            src={item?.photo_url }
                            className="w-full h-full rounded-full object-cover"
                            alt="profile picture of suggested friend"
                          />
                        ) : (
                          <DefaultProfilePicture
                          text="text-[80%]"
                            firstName={item?.first_name}
                            lastName={item?.last_name}
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="max-[420px]:text-[13px] font-bold leading-[19px] text-[#2A2A2A]">
                          {item?.first_name} {item?.last_name}
                        </p>
                        <p className="max-[420px]:text-[13px] text-[#505050] leading-[19px]">
                          @{item?.username}
                        </p>
                      </div>
                    </div>
                    <p
                      onClick={() => {
                        setSelected(item?.id);
                        followUserAction(setLoading, item?.id, () =>
                          queryClient.invalidateQueries([
                            "user-followers",
                            +query.id,
                          ])
                        );
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
                ))
              )}
            </div>
            {/* <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
            Show more
          </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

Following.Layout = FollowLayout;
export default Following;
