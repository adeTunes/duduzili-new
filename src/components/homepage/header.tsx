import { Icon } from "@iconify/react";
import { TextInput, clsx } from "@mantine/core";
import { Home, Profile2User, SearchNormal1, Sms } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Header() {
  const navIcons = [
    { href: "/", icon: <Home size="20" variant="Outline" />, routeId: "/" },
    {
      href: "/communities",
      icon: <Profile2User size="20" variant="Outline" />,
      routeId: "communities",
    },
    {
      href: "/search",
      icon: <SearchNormal1 size="20" variant="Outline" />,
      routeId: "search",
    },
    {
      href: "/messages",
      icon: <Sms size="20" variant="Outline" />,
      routeId: "messages",
    },
    {
      href: "/profile",
      icon: (
        <img
          src="/homePage/profile-picture.png"
          className="w-10 h-10 rounded-full object-cover"
          alt=""
        />
      ),
    },
  ];
  const router = useRouter();
  return (
    <header className="w-[90%] mx-auto max-w-[1500px] flex justify-between items-center">
      <div className="h-[49px]">
        <img src="/logo.png" alt="duduzili logo" className="h-full" />
      </div>
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
              router.pathname !== "/" &&
                router.pathname.includes(routeId) &&
                "border-b-[4px] border-b-[#4534B8]",
              router.pathname === "/" &&
                router.pathname === routeId &&
                "border-b-[4px] border-b-[#4534B8]",
              "h-[60px] flex items-center "
            )}
          >
            <Link href={href}>{icon}</Link>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
