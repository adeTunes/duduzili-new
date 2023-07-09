import { Drawer, clsx } from "@mantine/core";
import React from "react";
import { useSetAtom } from "jotai";
import { openChatDrawer } from "@/store";
import MobileDrawerLogo from "../mobileDrawer/mobileDrawerLogo";
import MessagesChatBox from "./messagesChatBox";

function ChatDrawer({ opened, close }) {
  const setChatDrawer = useSetAtom(openChatDrawer);
  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 px-6 max-[320px]:px-2 flex flex-col overflow-auto",
        inner: "z-[201]",
        header: "z-[201]",
      }}
      size="100%"
      opened={opened}
      onClose={() => {
        close();
        setChatDrawer(false);
      }}
      position="right"
      title={<MobileDrawerLogo />}
    >
      <aside className="w-full flex-1 overflow-auto flex flex-col gap-6">
        <div className="flex overflow-auto h-full flex-col gap-6">
          <MessagesChatBox />
        </div>
      </aside>
    </Drawer>
  );
}

export default ChatDrawer;
