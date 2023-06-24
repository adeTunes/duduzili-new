import { TextInput, clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { ArrowRight2 } from "iconsax-react";

const SettingsTab = ({ close }: {close?: () => void}) => {
  const settings = [
    {
      text: "Account",
      href: "/settings/account",
    },
    {
      text: "Safety & Privacy",
      href: "/settings/safety-privacy",
    },
    {
      text: "Feeds",
      href: "/settings/feeds",
    },
    {
      text: "Notifications",
      href: "/settings/notifications",
    },
    {
      text: "Messages",
      href: "/settings/messages",
    },
    {
      text: "Blocked Users",
      href: "/settings/blocked-users",
    },
    {
      text: "Muted Users",
      href: "/settings/muted-users",
    },
  ];
  const { pathname, push } = useRouter();
  return (
    <div className="flex flex-1 overflow-auto flex-col gap-6">
      {/* <TextInput
        classNames={{
          input:
            "h-[47px] !pl-[48px] placeholder:text-[#757575] bg-white rounded-[24px] border-0",
        }}
        className="rounded-[24px] pl-8 bg-white"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        placeholder="Search Settings"
        icon={<Icon height={24} width={24} icon="ri:search-line" />}
      /> */}
      <div
        id="no-scroll"
        className="flex overflow-auto flex-col bg-white rounded-2xl"
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
      >
        {settings.map(({ text, href }, idx) => (
          <div
            onClick={() => {
              push(href);
              close()
            }}
            key={idx}
            className={clsx(
              pathname.includes(href)
                ? "bg-[#F4F4F4] border-r-[4px] border-r-duduzili-violet"
                : "bg-[#FFFFFF] border-r-[4px] border-r-transparent",
              "p-6 hover:bg-[#F4F4F4] cursor-pointer flex justify-between"
            )}
          >
            {text}
            <ArrowRight2 size="24" color="#292D32" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsTab;
