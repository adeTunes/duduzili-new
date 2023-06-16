import React, { useState } from "react";
import useDiscoverPeople from "../../../hooks/useDiscoverPeople";
import { Loader } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { followUserAction } from "@/actions/postOptionActions";
import { useRouter } from "next/router";

function PeopleList({ data, query }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const { push } = useRouter();
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex flex-col gap-[11px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            {data?.users?.map(
              (item, idx) =>
                !item?.is_following && (
                  <div
                    key={idx}
                    className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                  >
                    <div className="flex gap-3 items-center">
                      <div
                        onClick={() => push(`friend/${item?.id}/post`)}
                        className="w-[36px] cursor-pointer h-[36px]"
                      >
                        <img
                          src={
                            item?.photo_url?.substring(62) ||
                            "/profile-pic-default.png"
                          }
                          className="w-full h-full rounded-full object-cover"
                          alt="profile picture of suggested friend"
                        />
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
                        followUserAction(setLoading, item?.id, () =>
                          queryClient.invalidateQueries([
                            "search-result",
                            query,
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
                )
            )}
          </div>
          {/* <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
            Show more
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default PeopleList;
