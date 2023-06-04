import AddFriend from "@/components/communities/addFriend";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useDiscoverPeople from "../../../../hooks/useDiscoverPeople";

function InviteFriends() {
  const { push, query } = useRouter();
  const { data } = useDiscoverPeople();
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <p className="text-[18px] leading-[22px] text-[#2A2A2A] font-bold">
        Invite Friends
      </p>
      <div className="flex flex-col gap-[11px]">
        <p className="pb-[12px] text-[#505050] leading-[19px] border-b border-b-[#EDF0FB]">
          Suggested for you
        </p>
        <div className="flex flex-col gap-6">
        <div className="flex flex-col">
                {data?.users?.map((item, idx) => (
                  idx < 6 &&
                  <AddFriend user={item} key={idx} />
                ))}
              </div>
          <p onClick={() => {
            push(`/invite-friends?community=${String(query.id)}`)
          }} className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
            Show more
          </p>
        </div>
      </div>
    </div>
  );
}

export default InviteFriends;
