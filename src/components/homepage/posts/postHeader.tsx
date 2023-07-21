import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import PostOptions from "./postOptions";
import { Loading } from "@/components/loading";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import DefaultProfilePicture from "@/components/profile/defaultProfilePicture";
import { base64encode } from "nodejs-base64";

function PostHeader({ post }) {
  // user={post.user} day={post.date} date={post.date_added}
  const { date: day, date_added: date, user } = post;
  const loggedInUser: any = useAtomValue(userDetails);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [openAuthModal, setOpenAuth] = useState(false);

  return (
    <div className="flex items-center max-[440px]:items-start justify-between">
      <div className="flex items-center max-[440px]:items-start gap-4">
        <div
          onClick={() => {
            if (!loggedInUser?.token) return setOpenAuth(true);
            post?.user?.id !== loggedInUser?.user?.id &&
            location.assign(`/friend/${base64encode(String(post?.user?.id))}/post`)
          }}
          className={clsx(
            post?.user?.id !== loggedInUser?.user?.id && "cursor-pointer",
            "h-[56px] w-[56px] max-[480px]:h-[45px] max-[480px]:w-[45px]"
          )}
        >
          {user?.photo_url ? (
            <img
              src={user?.photo_url }
              className="w-full h-full object-cover rounded-full"
              alt="user profile picture"
            />
          ) : (
            <DefaultProfilePicture
              firstName={user?.first_name}
              lastName={user?.last_name}
              text="text-[100%]"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center max-[440px]:flex-col max-[440px]:items-start gap-2">
            <span className="text-[#2A2A2A] max-[480px]:text-[14px] font-semibold text-[18px]">
              {`${user?.first_name} ${user?.last_name}`}
            </span>
            <span className=" text-duduzili-blue max-[480px]:text-[12px]">
              @{user?.username}
            </span>
          </p>
          <span className="flex items-center gap-[10px]">
            <small className="max-[480px]:text-[70%]">
              {new Date(date)
                ?.toLocaleDateString("us-EN", { month: "long", day: "numeric" })
                ?.split(" ")
                ?.reverse()
                ?.join(" ")}
            </small>
            <span className="bg-[#2A2A2A] text-[14px] max-[480px]:text-[11px] text-white px-2 rounded-2xl py-1">
              {day.includes("now")
                ? day
                : day.includes("day") ||
                  day.includes("min") ||
                  day.includes("sec") ||
                  day.includes("hr")
                ? `${day} ago`
                : day}
            </span>
          </span>
        </div>
      </div>
      {loggedInUser?.token && (
        <div className="relative">
          <PostOptions setLoading={setLoading} post={post} />
        </div>
      )}
      <Loading loading={loading} />
      <UnAuthenticaticatedUserModal
        opened={openAuthModal}
        setOpened={setOpenAuth}
      />
    </div>
  );
}

export default PostHeader;
