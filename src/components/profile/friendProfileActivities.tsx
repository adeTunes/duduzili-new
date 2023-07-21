import { clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { base64encode } from "nodejs-base64";
import React from "react";

function FriendProfileActivities() {
  const { query, pathname } = useRouter();
  const tabs = [
    {
      text: "Post",
      href: `/friend/${base64encode(String(query.id))}/post`,
      id: "post",
    },
    {
      text: "Media",
      href: `/friend/${base64encode(String(query.id))}/media`,
      id: "media",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex gap-[150px] max-[420px]:gap-[50px]">
        {tabs.map((item, idx) => (
          <a href={item.href} key={idx}>
            <p
              role="button"
              className={clsx(
                pathname.includes(item.id)
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
  );
}

export default FriendProfileActivities;
