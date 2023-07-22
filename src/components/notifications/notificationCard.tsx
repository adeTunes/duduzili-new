"use client";
import { Profile, ProfileAdd, TicketStar } from "iconsax-react";
import React, { useState } from "react";
import CommentIcon from "../settings/commentIcon";
import { Loader, Text, clsx } from "@mantine/core";
import {
  acceptFollowRequest,
  readSingleNotification,
  rejectFollowRequest,
} from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { base64encode } from "nodejs-base64";

function NotificationCard({
  title,
  day,
  action,
  unread,
  senderId,
  postID,
  notificationID,
}: {
  title: string;
  day: string;
  action: "like" | "sticker-reward" | "comment" | "request" | "follow";
  unread: boolean;
  senderId: number;
  postID: number;
  notificationID: number;
}) {
  const markSingleAsRead = () => {
    readSingleNotification(notificationID)
      .then(({ data }) => {})
      .catch((e) => {});
  };
  const icons = {
    like: (
      <Profile
        className="max-[480px]:h-[20px] h-[25px] w-[25px] max-[480px]:w-[20px]"
        color="#4534B8"
        variant="TwoTone"
      />
    ),
    request: (
      <ProfileAdd
        className="max-[480px]:h-[20px] h-[25px] w-[25px] max-[480px]:w-[20px]"
        color="#4534B8"
        variant="TwoTone"
      />
    ),
    follow: (
      <Profile
        className="max-[480px]:h-[20px] h-[25px] w-[25px] max-[480px]:w-[20px]"
        color="#4534B8"
        variant="TwoTone"
      />
    ),
    "sticker-reward": (
      <TicketStar
        className="max-[480px]:h-[20px] h-[25px] w-[25px] max-[480px]:w-[20px]"
        color="#4534B8"
      />
    ),
    comment: (
      <CommentIcon className="max-[480px]:h-[20px] h-[25px] w-[25px] max-[480px]:w-[20px]" />
    ),
  };
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return (
    <div
      className={clsx(
        (action === "like" || action === "comment" || action === "follow") &&
          "cursor-pointer hover:bg-[#f5f5f5]",
        "flex items-center max-[890px]:flex-col max-[890px]:items-start gap-3 justify-between py-4 border-b border-b-[#DFDFDF]"
      )}
      onClick={() => {
        if (unread) {
          markSingleAsRead();
        }
        if (action === "like" || action === "comment") {
          const id = postID * 1000000;
          push(`/posts/${base64encode(id)}`);
        } else {
          location.assign(`/profile/post?user=${base64encode(String(senderId))}`)
        }
      }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-[#F6F5FB] h-[50px] w-[50px] max-[480px]:h-[35px] max-[480px]:w-[35px] max-[480px]:min-h-[35px] max-[480px]:min-w-[35px] min-w-[50px] min-h-[50px] flex items-center justify-center rounded-full">
          {icons[action]}
        </div>
        <div className="flex flex-col gap-2">
          <Text
            className={clsx(
              unread
                ? "text-[#2A2A2A] font-semibold"
                : "text-[#757575] font-medium",
              "leading-7 max-[480px]:text-[14px]"
            )}
            lineClamp={4}
          >
            {title}
          </Text>
          <span className=" leading-[19px] max-[480px]:text-xs text-[#505050]">
            {day}
          </span>
        </div>
      </div>
      {action === "request" && (
        <div className="flex max-[890px]:ml-[66px] items-center gap-4">
          <p
            onClick={() => {
              setLoading(true);
              acceptFollowRequest(senderId)
                .then(({ data }) => {
                  showNotification({ message: data.message });
                  setLoading(false);
                  queryClient.invalidateQueries(["notifications"]);
                })
                .catch((e) => {
                  setLoading(false);
                  errorMessageHandler(e);
                });
            }}
            className="cursor-pointer text-white font-medium leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
          >
            {loading ? <Loader size="xs" /> : "Accept"}
          </p>
          <p
            onClick={() => {
              setRejectLoading(true);
              rejectFollowRequest(senderId)
                .then(({ data }) => {
                  showNotification({ message: data.message });
                  setRejectLoading(false);
                  queryClient.invalidateQueries(["notifications"]);
                })
                .catch((e) => {
                  setRejectLoading(false);
                  errorMessageHandler(e);
                });
            }}
            className="cursor-pointer text-duduzili-violet font-medium leading-[15px] text-[12px] px-4 py-2 bg-[#EDF0FB] rounded-[32px]"
          >
            {rejectLoading ? <Loader size="xs" /> : "Reject"}
          </p>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
