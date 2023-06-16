import { clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProfileActivities() {
  const tabs = [
    {
      text: "Post",
      href: "/my-profile/post",
    },
    {
      text: "Media",
      href: "/my-profile/media",
    },
    {
      text: "Saved",
      href: "/my-profile/saved",
    },
    {
      text: "Draft",
      href: "/my-profile/draft",
    },
  ];
  const { pathname } = useRouter();
  return (
    <div className="flex flex-wrap justify-between">
      {tabs.map((item, idx) => (
        <Link href={item.href} key={idx}>
          <p
            role="button"
            className={clsx(
              pathname === item.href
                ? "text-white bg-duduzili-violet"
                : "bg-[#FBFBFB] text-[#757575]",
              "text-[20px] leading-[28px] py-3 px-6 rounded-[32px]"
            )}
          >
            {item.text}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default ProfileActivities;
