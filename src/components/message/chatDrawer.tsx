import { Drawer, clsx } from "@mantine/core";
import React from "react";
import { useSetAtom } from "jotai";
import { openChatDrawer } from "@/store";
import { useRouter } from "next/router";
import Link from "next/link";
import Navigation from "../mobileDrawer/navigation";
import MobileDrawerLogo from "../mobileDrawer/mobileDrawerLogo";

function ChatDrawer({ opened, close, boxType }) {
  const setChatDrawer = useSetAtom(openChatDrawer);
  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 px-6 max-[320px]:px-2 flex flex-col overflow-auto",
        inner: "z-[201]",
      }}
      size="100%"
      opened={opened}
      onClose={() => {
        close()
        setChatDrawer(false)
      }}
      position="right"
      title={<MobileDrawerLogo />}
    >
      <aside className="w-full flex-1 overflow-auto flex flex-col gap-6">
        <div className="flex overflow-auto h-full flex-col gap-6">
          <div className="justify-between flex">
            {/* {tabs.map((item, idx) => (
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
            ))} */}
          </div>
          {boxType}
        </div>
      </aside>
    </Drawer>
  );
}

export default ChatDrawer;
