import Image from "next/image";
import React, { useState } from "react";
import { treatCommunityJoinRequest } from "../../../api/apiRequests";
import { showNotification } from "@mantine/notifications";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

function JoinRequest({ data }) {
  const queryCLient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const treatRequest = (action: "Accept" | "Reject") => {
    setLoading(true);
    const formData = new FormData();
    formData.append("action", action);
    formData.append("request_id", data?.id);
    treatCommunityJoinRequest(formData)
      .then(({ data }) => {
        setLoading(false);
        showNotification({
          message: data?.message,
          color: "green",
        });
        queryCLient.invalidateQueries(["pending-requests"]);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };
  return (
    <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
      <div className="flex gap-3 items-center">
        <div className="w-[36px] h-[36px]">
          <img
            src={
              data?.user?.photo_url?.substring(62) || "/profile-pic-default.png"
            }
            className="w-full h-full rounded-full object-cover"
            alt="profile picture of suggested friend"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className=" font-bold leading-[19px] text-[#2A2A2A]">
            {data?.user?.first_name} {data?.user?.last_name}
          </p>
          <p className="text-[#505050] leading-[19px]">
            @{data?.user?.username}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <p
          onClick={() => {
            setSelected(`Accept${data?.id}`);
            treatRequest("Accept");
          }}
          className="rounded-[32px] cursor-pointer py-2 px-4 bg-[#4534B8] text-xs font-medium text-white"
        >
          {loading &&
          selected.includes(`${data?.id}`) &&
          selected.includes("Accept") ? (
            <Loader size="sm" />
          ) : (
            "Accept"
          )}
        </p>
        <p
          onClick={() => {
            setSelected(`Reject${data?.id}`);
            treatRequest("Reject");
          }}
          className="rounded-[32px] cursor-pointer py-2 px-4 bg-[#EDF0FB] text-xs font-medium text-duduzili-violet"
        >
          {loading &&
          selected.includes(`${data?.id}`) &&
          selected.includes("Reject") ? (
            <Loader size="sm" />
          ) : (
            "Reject"
          )}
        </p>
      </div>
    </div>
  );
}

export default JoinRequest;
