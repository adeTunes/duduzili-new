import Link from "next/link";
import React from "react";
import useDiscoverPeople from "../../../../hooks/useDiscoverPeople";

function DiscoverPeople() {
  const { data } = useDiscoverPeople();
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <p className="text-[18px] leading-[22px] text-[#2A2A2A] font-bold">
        Discover People
      </p>
      <div className="flex flex-col gap-[11px]">
        <p className="pb-[12px] text-[#505050] leading-[19px] border-b border-b-[#EDF0FB]">
          Suggested for you
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            {data?.users?.map(
              (item, idx) =>
                idx < 5 && (
                  <div
                    key={idx}
                    className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-[36px] h-[36px]">
                        <img
                          src={item?.photo_url?.substring(62)}
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
                    {item?.is_following ? (
                      <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                        Unfollow
                      </p>
                    ) : (
                      <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                        Follow
                      </p>
                    )}
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
    </div>
  );
}

export default DiscoverPeople;
