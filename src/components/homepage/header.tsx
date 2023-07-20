import { pageSearch, userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Indicator, TextInput, clsx } from "@mantine/core";
import {
  Add,
  HambergerMenu,
  Home,
  Profile2User,
  SearchNormal1,
  Sms,
  TicketStar,
  TrendUp,
} from "iconsax-react";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserProfileImageActions from "./userProfileImageActions";
import { Loading } from "../loading";
import Image from "next/image";
import UseNotifications from "../../../hooks/useNotifications";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import MobileDrawer from "../mobileDrawer";
import MobileMenuIcon from "./mobileMenuIcon";
import CreatePostModal from "../modals/createPostModal";
import SearchDropdown from "../searchDropdown";
import DefaultProfilePicture from "../profile/defaultProfilePicture";
import useConversations from "../../../hooks/use-conversations";

function Header() {
  const user: any = useAtomValue(userDetails);
  const { data } = UseNotifications();
  const [unread, setUnread] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const { data: conversations, isLoading, refetch } = useConversations();
  // const {data: conversations, isLoading} = useSocketConversations()
  useEffect(() => {
    if (data) {
      setUnread(data?.notifications?.some((item) => item.read !== true));
    }
  }, [data]);

  useEffect(() => {
    if (conversations) {
      setUnreadMessages(
        conversations.reduce((acc, item) => {
          const unread = item?.get_messages?.filter(
            (item) => item?.receiver?.id === user?.user?.id && !item?.read
          )?.length;
          if (unread) acc.push(unread);
          return acc;
        }, [])
      );
    }
  }, [conversations]);

  const bottomNavIcons = [
    {
      href: "/home",
      icon: (
        <Home
          className="w-7 h-7 max-[382px]:w-5 max-[382px]:h-5"
          variant="Outline"
        />
      ),
      routeId: "/home",
    },
    {
      href: "/discover-people",
      icon: (
        <Profile2User
          className="w-7 h-7 max-[382px]:w-5 max-[382px]:h-5"
          variant="Outline"
        />
      ),
      routeId: "discover-people",
    },
    // {
    //   href: "/payments",
    //   icon: (
    //     <TicketStar
    //       className="w-7 h-7 max-[382px]:w-5 max-[382px]:h-5"
    //       variant="Outline"
    //     />
    //   ),
    //   routeId: "payments",
    // },
    {
      icon: (
        <Add
          className="w-10 h-10 max-[382px]:w-8 max-[382px]:h-8"
          variant="Outline"
          color="white"
        />
      ),
    },
    {
      href: "/trending",
      icon: (
        <TrendUp
          className="w-7 h-7 max-[382px]:w-5 max-[382px]:h-5"
          variant="Outline"
        />
      ),
      routeId: "trending",
    },
    {
      href: "/messages/friends",
      icon: (
        <Indicator
          classNames={{ common: "!top-[2px] !right-[5px]" }}
          color="#E59055"
          disabled={unreadMessages?.length ? false : true}
        >
          <Sms
            className="w-7 h-7 max-[382px]:w-5 max-[382px]:h-5"
            variant="Outline"
          />
        </Indicator>
      ),
      routeId: "messages",
    },
  ];

  const navIcons = [
    {
      href: "/home",
      icon: <Home size="20" variant="Outline" />,
      routeId: "/home",
    },
    // {
    //   href: "/communities/posts",
    //   icon: <Profile2User size="20" variant="Outline" />,
    //   routeId: "communities",
    // },
    {
      href: "/trending",
      icon: <TrendUp size="20" variant="Outline" />,
      routeId: "trending",
    },
    {
      href: "/messages/friends",
      icon: (
        <Indicator
          classNames={{ common: "!top-[2px] !right-[5px]" }}
          color="#E59055"
          disabled={unreadMessages?.length ? false : true}
        >
          <Sms size="20" variant="Outline" />
        </Indicator>
      ),
      routeId: "messages",
    },
    {
      icon: <SearchNormal1 size="20" variant="Outline" />,
      routeId: "search",
    },
    {
      icon: (
        <Indicator
          classNames={{ common: "!top-[3px] !right-[6px]" }}
          color="#E59055"
          disabled={!unread}
        >
          {user?.user?.photo_url ? (
            <img
              src={user?.user?.photo_url}
              className="w-10 h-10 cursor-pointer rounded-full object-cover"
              alt=""
            />
          ) : (
            <DefaultProfilePicture
              text="text-[100%]"
              className="!w-10 !h-10 cursor-pointer"
              firstName={user?.user?.first_name}
              lastName={user?.user?.last_name}
            />
          )}
        </Indicator>
      ),
    },
  ];
  const { pathname, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 500);
  const setPageSearch = useSetAtom(pageSearch);
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const [createOpened, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  useEffect(() => {
    if (searchValue) {
      setPageSearch(searchValue);
      if (pathname !== "/search") {
        queryClient.invalidateQueries(["search-result", searchValue]);
        push(`/search?q=${searchValue}`);
      }
    }
  }, [searchValue]);

  return (
    <header className="w-[90%] max-[330px]:w-full max-[330px]:px-2 mx-auto max-w-[1300px] flex justify-between items-center">
      <div className="flex items-center gap-4 max-[330px]:gap-2">
        <div
          onClick={open}
          className="w-[45px] h-[45px] hidden max-[790px]:flex max-[330px]:w-[32px] max-[330px]:h-[32px] cursor-pointer rounded-full bg-[#EDF0FB] items-center justify-center"
        >
          <MobileMenuIcon className="w-[25px] max-[330px]:w-[18px] max-[330px]:h-[18px] h-[25px]" />
        </div>
        <Link href="/home">
          <div style={{ height: "clamp(35px, 2.5vw, 49px)" }}>
            <img src="/logo.png" alt="duduzili logo" className="h-full" />
          </div>
        </Link>
      </div>
      <TextInput
        className="max-[790px]:hidden"
        placeholder="Search Duduzili"
        icon={<Icon icon="mingcute:search-line" height={24} width={24} />}
        classNames={{
          input:
            "rounded-[32px] h-[47px] w-[15vw] min-w-[200px] border-none bg-[#f4f4f4] pl-[2.6rem]",
        }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="flex items-center max-[650px]:gap-6 gap-8">
        {navIcons.map(({ href, icon, routeId }, idx) => (
          <div
            key={idx}
            className={clsx(
              pathname.includes(routeId)
                ? "border-b-[4px] border-b-[#4534B8] text-[#4534B8]"
                : "border-b-[4px] border-b-[#fff]",
              routeId === "search" && "hidden max-[790px]:flex",
              routeId && routeId !== "search" && "max-[500px]:hidden",
              "h-[75px] flex items-center "
            )}
          >
            {routeId && routeId !== "search" ? (
              <Link href={href}>{icon}</Link>
            ) : routeId === "search" ? (
              <SearchDropdown>{icon}</SearchDropdown>
            ) : (
              <UserProfileImageActions unread={unread} setLoading={setLoading}>
                {icon}
              </UserProfileImageActions>
            )}
          </div>
        ))}
      </div>
      {/* <div className="hidden max-[790px]:flex h-[75px] items-center gap-5">
        <SearchNormal1 size={24} className=" hidden max-[580px]:inline-block" />
        <UserProfileImageActions unread={unread} setLoading={setLoading}>
          <Indicator
            classNames={{ common: "!top-[3px] !right-[6px]" }}
            color="#E59055"
            disabled={!!unread}
          >
            <img
              src={
                user?.user?.photo_url  ||
                "/profile-pic-default.png"
              }
              className="w-10 h-10 cursor-pointer rounded-full object-cover"
              alt=""
            />
          </Indicator>
        </UserProfileImageActions>
      </div> */}
      <div
        className="fixed bottom-0 h-[93px] hidden max-[500px]:flex items-center z-[99] right-0 left-0 bg-white"
        style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.20)" }}
      >
        <div className="flex justify-between items-center  max-[382px]:w-[90%] w-[80%] mx-auto">
          {bottomNavIcons.map(({ routeId, href, icon }, idx) => (
            <div
              key={idx}
              className={clsx(
                pathname.includes(routeId) && "text-duduzili-violet"
              )}
            >
              {routeId ? (
                <Link href={href}>{icon}</Link>
              ) : (
                <div
                  onClick={openCreate}
                  className="bg-duduzili-violet items-center mt-[-75px] border-[8px] border-[#f2f2f2] flex justify-center h-[72px] rounded-full w-[72px]"
                >
                  {icon}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Loading loading={loading} />
      <MobileDrawer opened={opened} close={close} />
      <CreatePostModal opened={createOpened} close={closeCreate} />
    </header>
  );
}

export default Header;
