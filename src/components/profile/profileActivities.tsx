import { userDetails } from "@/store";
import { clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { base64encode } from "nodejs-base64";
import React from "react";

function ProfileActivities() {
  const user: any = useAtomValue(userDetails);
  const { query } = useRouter();

  const tabs = !user?.token
    ? [
        {
          text: "Post",
          href: `/profile/post?user=${query.user}`,
        },
        {
          text: "Media",
          href: `/profile/media?user=${query.user}`,
        },
      ]
    : [
        {
          text: "Post",
          href: `/profile/post?user=${query.user}`,
        },
        {
          text: "Media",
          href: `/profile/media?user=${query.user}`,
        },
        {
          text: "Saved",
          href: `/profile/saved?user=${query.user}`,
        },
        {
          text: "Draft",
          href: `/profile/draft?user=${query.user}`,
        },
      ];
  const { pathname } = useRouter();
  return !user?.token ? (
    <div className="flex justify-center">
      <div className="flex gap-[150px] max-[420px]:gap-[50px]">
        {tabs.map((item, idx) => (
          <a href={item.href} key={idx}>
            <p
              role="button"
              className={clsx(
                item.href.includes(pathname)
                  ? "text-white bg-duduzili-violet"
                  : "bg-[#FBFBFB] text-[#757575]",
                "text-[20px] leading-[28px] py-3 px-6 rounded-[32px]"
              )}
            >
              {item.text}
            </p>
          </a>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap justify-between">
      {tabs.map((item, idx) => (
        <a href={item?.href} key={idx}>
          <p
            role="button"
            className={clsx(
              item.href.includes(pathname)
                ? "text-white bg-duduzili-violet"
                : "bg-[#FBFBFB] text-[#757575]",
              "text-[20px] max-[450px]:px-3 max-[290px]:px-2 max-[290px]:text-sm max-[450px]:py-[6px] max-[450px]:text-base leading-[28px] py-3 px-6 rounded-[32px]"
            )}
          >
            {item?.text}
          </p>
        </a>
      ))}
    </div>
  );
}

export default ProfileActivities;
