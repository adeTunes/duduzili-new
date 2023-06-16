import { Sms } from "iconsax-react";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import { LoadingOverlay, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import SwithIcon from "@/components/settings/swithIcon";
import UseMessageSettings from "../../hooks/useMessageSettings";

const Messages: NextPageX = () => {
  const {data, isLoading} = UseMessageSettings()
  return (
    <div className="flex overflow-auto flex-1 flex-col gap-[22px]">
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="flex flex-col gap-[25px] px-4 py-6 rounded-lg bg-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "bg-[#F6F5FB]",
                "h-10 min-w-[40px] min-h-[40px] flex items-center justify-center w-10 rounded-full"
              )}
            >
              <Icon
                icon="ic:outline-lock-person"
                color="#4534B8"
                width="20"
                height="20"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p
                className={clsx(
                  "text-[#2A2A2A]",
                  "text-[12px] font-semibold leading-4"
                )}
              >
                Allow Message Requests from Everyone
              </p>
              <p className="text-[#BDBDBD] max-w-[390px] text-[11px] leading-4">
                Let people who do not follow you send you message request and
                add you to group conversations
              </p>
            </div>
          </div>
          <SwithIcon active={data?.chat_settings?.allow_chat_request} onClick={() => {}} />
        </div>
      </div>
      <LoadingOverlay visible={isLoading} />
    </div>
  );
};
Messages.Layout = SettingsLayout;
Messages.LayoutProps = { tabName: "Messages" };
export default Messages;
