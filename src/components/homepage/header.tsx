import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { TextInput, clsx } from "@mantine/core";
import { Home, Profile2User, SearchNormal1, Sms } from "iconsax-react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserProfileImageActions from "./userProfileImageActions";
import { Loading } from "../loading";
import Image from "next/image";

function Header() {
  const user: any = useAtomValue(userDetails);
  const navIcons = [
    {
      href: "/home",
      icon: <Home size="20" variant="Outline" />,
      routeId: "/home",
    },
    {
      href: "/communities/posts",
      icon: <Profile2User size="20" variant="Outline" />,
      routeId: "communities",
    },
    {
      href: "/search",
      icon: <SearchNormal1 size="20" variant="Outline" />,
      routeId: "search",
    },
    {
      href: "/messages/friends",
      icon: <Sms size="20" variant="Outline" />,
      routeId: "messages",
    },
    {
      icon: (
        <img
          src={user?.user?.photo_url?.substring(62) || '/profile-pic-default.png'}
          className="w-10 h-10 cursor-pointer rounded-full object-cover"
          alt=""
        />
      ),
    },
  ];
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <header className="w-[90%] mx-auto max-w-[1300px] flex justify-between items-center">
      <Link href="/home">
        <div className="h-[49px]">
          <img src="/logo.png" alt="duduzili logo" className="h-full" />
        </div>
      </Link>
      <TextInput
        placeholder="Search Duduzili"
        icon={<Icon icon="mingcute:search-line" />}
        classNames={{ input: "rounded-[32px] border-none bg-[#f4f4f4]" }}
      />
      <div className="flex items-center gap-8">
        {navIcons.map(({ href, icon, routeId }, idx) => (
          <div
            key={idx}
            className={clsx(
              pathname.includes(routeId)
                ? "border-b-[4px] border-b-[#4534B8] text-[#4534B8]"
                : "border-b-[4px] border-b-[#fff]",
              "h-[60px] flex items-center "
            )}
          >
            {routeId ? (
              <Link href={href}>{icon}</Link>
            ) : (
              <UserProfileImageActions setLoading={setLoading}>
                {icon}
              </UserProfileImageActions>
            )}
          </div>
        ))}
      </div>
      <Loading loading={loading} />
    </header>
  );
}

export default Header;
