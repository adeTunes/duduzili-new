import { pageSearch, userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Indicator, TextInput, clsx } from "@mantine/core";
import { Home, Profile2User, SearchNormal1, Sms, TrendUp } from "iconsax-react";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserProfileImageActions from "./userProfileImageActions";
import { Loading } from "../loading";
import Image from "next/image";
import UseNotifications from "../../../hooks/useNotifications";
import { useDebouncedValue } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
  const user: any = useAtomValue(userDetails);
  const { data } = UseNotifications();
  const [unread, setUnread] = useState(null);
  useEffect(() => {
    if (data) {
      setUnread(data?.notifications?.some((item) => item.read === true));
    }
  }, [data]);
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
      href: "/trending",
      icon: <TrendUp size="20" variant="Outline" />,
      routeId: "trending",
    },
    {
      href: "/messages/friends",
      icon: <Sms size="20" variant="Outline" />,
      routeId: "messages",
    },
    {
      icon: (
        <Indicator
          classNames={{ common: "!top-[3px] !right-[6px]" }}
          color="#E59055"
          disabled={!!unread}
        >
          <img
            src={
              user?.user?.photo_url?.substring(62) || "/profile-pic-default.png"
            }
            className="w-10 h-10 cursor-pointer rounded-full object-cover"
            alt=""
          />
        </Indicator>
      ),
    },
  ];
  const { pathname, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 500);
  const setPageSearch = useSetAtom(pageSearch);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (searchValue) {
      setPageSearch(searchValue); 
      if(pathname !== "/search") {
        queryClient.invalidateQueries(["search-result", searchValue])
        push(`/search?q=${searchValue}`)
      }
    }
  }, [searchValue]);

  return (
    <header className="w-[90%] mx-auto max-w-[1300px] flex justify-between items-center">
      <Link href="/home">
        <div className="h-[49px]">
          <img src="/logo.png" alt="duduzili logo" className="h-full" />
        </div>
      </Link>
      <TextInput
        placeholder="Search Duduzili"
        icon={<Icon icon="mingcute:search-line" height={24} width={24} />}
        classNames={{
          input: "rounded-[32px] h-[47px] w-[320px] border-none bg-[#f4f4f4] pl-[2.6rem]",
        }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="flex items-center gap-8">
        {navIcons.map(({ href, icon, routeId }, idx) => (
          <div
            key={idx}
            className={clsx(
              pathname.includes(routeId)
                ? "border-b-[4px] border-b-[#4534B8] text-[#4534B8]"
                : "border-b-[4px] border-b-[#fff]",
              "h-[75px] flex items-center "
            )}
          >
            {routeId ? (
              <Link href={href}>{icon}</Link>
            ) : (
              <UserProfileImageActions unread={unread} setLoading={setLoading}>
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
