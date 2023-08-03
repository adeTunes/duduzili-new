import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "@mantine/core";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { useQueryClient } from "@tanstack/react-query";
import DefaultProfilePicture from "@/components/profile/defaultProfilePicture";
import useCommunityPendingRequests from "../../../hooks/useCommunityPendingRequests";
import { treatCommunityJoinRequest } from "../../../api/apiRequests";
import { notify } from "../../../utils/notification-handler";

function CommunityRequests() {
  const { query } = useRouter();
  const { data } = useCommunityPendingRequests(query.id);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (data && query.id) {
      setRequests(
        data?.filter((item) => item?.community?.code === String(query.id))
      );
    }
  }, [data, query.id]);

  const queryCLient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const treatRequest = (action: "Accept" | "Reject", requestId) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("action", action);
    formData.append("request_id", requestId);
    treatCommunityJoinRequest(formData)
      .then(({ data }) => {
        setLoading(false);
        notify({
          message: data?.message,
          color: "green",
        });
        queryCLient.invalidateQueries(["pending-requests"]);
        queryCLient.invalidateQueries(["community-details", query.id]);
      })
      .catch((e) => {
        setLoading(false);
        errorMessageHandler(e);
      });
  };

  return (
    <div
      className="flex flex-col gap-2"
    >
      <p className="text-[15px] border-b border-b-[#EDF0FB] pb-4 leading-[22px] text-[#2A2A2A] font-bold">
        Community Requests ({requests.length})
      </p>
      <div className="flex flex-col gap-6">
        {requests?.map(
          (item, idx) =>
            idx < 5 && (
              <div
                key={idx}
                className="py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-[36px] h-[36px]">
                      {item?.user?.photo_url ? (
                        <img
                          src={item?.user?.photo_url }
                          className="w-full h-full rounded-full object-cover"
                          alt="profile picture of suggested friend"
                        />
                      ) : (
                        <DefaultProfilePicture
                          firstName={item?.user?.first_name}
                          lastName={item?.user?.last_name}
                          text="text-[80%]"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                        {item?.user?.first_name} {item?.user?.last_name}
                      </p>
                      <p className="text-[#505050] leading-[19px]">
                        @{item?.user?.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <p
                      onClick={() => {
                        setSelected(`Accept${idx}`);
                        treatRequest("Accept", item?.id);
                      }}
                      className="rounded-[32px] py-2 px-[39px] cursor-pointer bg-[#4534B8] text-xs font-medium text-white"
                    >
                      {loading &&
                      selected.includes(`${idx}`) &&
                      selected.includes("Accept") ? (
                        <Loader size="sm" />
                      ) : (
                        "Accept"
                      )}
                    </p>
                    <p
                      onClick={() => {
                        setSelected(`Reject${idx}`);
                        treatRequest("Reject", item?.id);
                      }}
                      className="rounded-[32px] py-2 px-[39px] cursor-pointer bg-[#EDF0FB] text-xs font-medium text-duduzili-violet"
                    >
                      {loading &&
                      selected.includes(`${idx}`) &&
                      selected.includes("Reject") ? (
                        <Loader size="sm" />
                      ) : (
                        "Reject"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {requests?.length && requests?.length > 5 ? (
        <Link href={`/pending-requests?community=${String(query.id)}`}>
          <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
            Show more
          </p>
        </Link>
      ) : null}
    </div>
  );
}

export default CommunityRequests;
