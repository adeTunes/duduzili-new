import { userDetails } from "@/store";
import { clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { base64encode } from "nodejs-base64";
import React from "react";

function ProfileActivities() {
  const user: any = useAtomValue(userDetails)
  
  const tabs = [
    {
      text: "Post",
      href: `/my-profile/post?user=${base64encode(+user?.user?.id * 1000000)}`,
    },
    {
      text: "Media",
      href: `/my-profile/media?user=${base64encode(+user?.user?.id * 1000000)}`,
    },
    {
      text: "Saved",
      href:  `/my-profile/saved?user=${base64encode(+user?.user?.id * 1000000)}`,
    },
    {
      text: "Draft",
      href: `/my-profile/draft?user=${base64encode(+user?.user?.id * 1000000)}`,
    },
  ];
  const { pathname } = useRouter();
  return (
    <div className="flex flex-wrap justify-between">
      {tabs.map((item, idx) => (
        <Link href={item?.href} key={idx}>
          <p
            role="button"
            className={clsx(
              pathname === item.href
                ? "text-white bg-duduzili-violet"
                : "bg-[#FBFBFB] text-[#757575]",
              "text-[20px] max-[450px]:px-3 max-[290px]:px-2 max-[290px]:text-sm max-[450px]:py-[6px] max-[450px]:text-base leading-[28px] py-3 px-6 rounded-[32px]"
            )}
          >
            {item?.text}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default ProfileActivities;
