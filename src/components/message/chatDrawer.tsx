import { Icon } from "@iconify/react";
import { Collapse, Drawer, TextInput, clsx } from "@mantine/core";
import React from "react";
import MessageCard from "./messageCard";
import { useAtomValue, useSetAtom } from "jotai";
import { openChatDrawer, selectedMessage, userDetails } from "@/store";
import { useRouter } from "next/router";
import Link from "next/link";
import GroupChatCard from "./groupChatCard";
import useConversations from "../../../hooks/use-conversations";
import { useDisclosure } from "@mantine/hooks";
import { Home, Profile2User, Sms, TrendUp } from "iconsax-react";

function ChatDrawer({ opened, close, boxType }) {
  const { pathname } = useRouter();
  const tabs = [
    {
      text: "Friends",
      href: "/messages/friends",
    },
    {
      text: "Others",
      href: "/messages/others",
    },
    {
      text: "Group Chat",
      href: "/messages/group-chats",
    },
  ];
  const [menuOpened, { toggle }] = useDisclosure(false);
  const navIcons = [
    {
      href: "/home",
      icon: <Home size="16" variant="Outline" />,
      name: "Feed",
    },
    {
      href: "/communities/posts",
      icon: <Profile2User size="16" variant="Outline" />,
      name: "Communities",
    },
    {
      href: "/trending",
      icon: <TrendUp size="16" variant="Outline" />,
      name: "Trending Posts",
    },
    {
      href: "/messages/friends",
      icon: <Sms size="16" variant="Outline" />,
      name: "Messages",
    },
  ];

  const setChatDrawer = useSetAtom(openChatDrawer);
  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 px-6 max-[320px]:px-2 flex flex-col overflow-auto",
      }}
      size="100%"
      opened={opened}
      onClose={() => {
        close()
        setChatDrawer(false)
      }}
      position="right"
    >
      <p
        className="mb-8 text-18px font-bold cursor-pointer hover:bg-[#efefef] py-2"
        onClick={toggle}
      >
        Menu
      </p>
      <Collapse in={menuOpened}>
        <ul className="flex flex-col font-semibold gap-3 mb-3">
          {navIcons.map((item) => (
            <li key={item.name} className=" cursor-pointer py-2 hover:bg-[#f4f4f4] flex">
              <Link
                href={item.href}
                className="h-full flex gap-3 items-center w-full"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
      <aside className="w-full flex-1 overflow-auto flex flex-col gap-6">
        <div className="flex overflow-auto h-full flex-col gap-6">
          <div className="justify-between flex">
            {tabs.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <p
                  role="button"
                  className={clsx(
                    pathname.includes(item.href)
                      ? "bg-duduzili-violet text-white font-semibold"
                      : "bg-[#EDF0FB] text-[#2A2A2A]",
                    "px-[4vw] max-[400px]:text-[14px] whitespace-nowrap py-2 rounded-[40px] leading-6"
                  )}
                  style={{ paddingInline: "clamp(12px, 3vw, 50px)" }}
                >
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
          {boxType}
        </div>
      </aside>
    </Drawer>
  );
}

export default ChatDrawer;
