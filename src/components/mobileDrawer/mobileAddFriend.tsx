import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { addMemberToCommunity } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { Loader } from "@mantine/core";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

function MobileAddFriend({ user }) {
  const { query, pathname } = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
      <div className="flex gap-3 items-center">
        <div className="w-[36px] h-[36px]">
          {user?.photo_url ? (
            <img
              src={user?.photo_url }
              className="w-full h-full rounded-full object-cover"
              alt="profile picture of suggested friend"
            />
          ) : (
            <DefaultProfilePicture
              text="text-[80%]"
              firstName={user?.first_name}
              lastName={user?.last_name}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="max-[420px]:text-[13px] font-bold leading-[19px] text-[#2A2A2A]">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="max-[420px]:text-[13px] text-[#505050] leading-[19px]">
            @{user?.username}
          </p>
        </div>
      </div>
      <p
        onClick={() => {
          setLoading(true);
          const data = new FormData();
          if (pathname.includes("invite")) {
            data.append("code", String(query.community));
          } else {
            data.append("code", String(query.id));
          }
          data.append("user_id", user?.id);
          addMemberToCommunity(data)
            .then(({ data }) => {
              setLoading(false);
              if (data?.message !== "successful")
                showNotification({
                  message: String(data?.data?.non_field_errors),
                  color: "red",
                });
              else
                showNotification({
                  message: data?.data,
                  color: "green",
                });
            })
            .catch((e) => {
              setLoading(false);
              errorMessageHandler(e);
            });
        }}
        className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
      >
        {loading ? <Loader size="sm" /> : "Invite"}
      </p>
    </div>
  );
}

export default MobileAddFriend;
