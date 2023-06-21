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
import Navigation from "../mobileDrawer/navigation";

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
      <Navigation />
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
