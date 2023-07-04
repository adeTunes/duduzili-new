import { Drawer, clsx } from "@mantine/core";
import React from "react";
import MobileMenuIcon from "../homepage/mobileMenuIcon";
import MobileDrawerLogo from "./mobileDrawerLogo";
import PeopleIcon from "./peopleIcon";
import { Lock, LogoutCurve, TicketStar, TrendUp } from "iconsax-react";
import InfoIcon from "./infoIcon";
import HelpIcon from "./helpIcon";
import Link from "next/link";
import FeedsIcon from "./feedsIcon";
import DownloadApp from "../homepage/sidebar/downloadApp";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";

function MobileDrawer({ opened, close }) {
  const unAuthenticatedList = [
    {
      children: [
      ],
    },
    {
      children: [
        {
          icon: <Lock color="#367EE8" size={24} />,
          name: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          icon: <InfoIcon />,
          name: "About App",
          href: "/about-us",
        },
        {
          icon: <HelpIcon color="#44BC66" />,
          name: "FAQs",
          href: "/faq",
        },
      ],
    },
  ];
  const authenticatedList = [
    {
      children: [
        {
          icon: <FeedsIcon />,
          name: "Feed",
          href: "/home",
        },
        {
          icon: <PeopleIcon />,
          name: "Discover People",
          href: "/discover-people",
        },
        {
          icon: <PeopleIcon />,
          name: "Community",
          href: "/communities/joined",
        },
        {
          icon: <TrendUp size={24} color="#E59055" />,
          name: "Trending",
          href: "/trending",
        },
        {
          icon: <TicketStar color="#9E00FF" size={24} />,
          name: "Stickers & Payment",
          href: "/payments",
        },
      ],
    },
    {
      children: [
        {
          icon: <Lock color="#367EE8" size={24} />,
          name: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          icon: <InfoIcon />,
          name: "About App",
          href: "/about-us",
        },
        {
          icon: <HelpIcon color="#44BC66" />,
          name: "FAQs",
          href: "/faq",
        },
        {
          icon: <HelpIcon color="#E59055" />,
          name: "Help & Support",
          href: "/support",
        },
      ],
    },
    {
      children: [
        {
          name: "Logout",
          icon: (
            <LogoutCurve className="rotate-180" color="#D40000" size={24} />
          ),
          action: () => {},
        },
      ],
    },
  ];
  const user: any = useAtomValue(userDetails)
  const navItems = user?.token ? authenticatedList : unAuthenticatedList
  return (
    <Drawer
      classNames={{
        content: "flex flex-col overflow-auto",
        body: "flex-1 !px-2 gap-6 flex flex-col overflow-auto",
        inner: "z-[201]",
      }}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      size="80%"
    >
      <div className="flex items-center justify-between">
        <div
          onClick={close}
          className="w-[45px] h-[45px] hidden max-[500px]:flex max-[330px]:w-[32px] max-[330px]:h-[32px] cursor-pointer rounded-full bg-[#F5F5F5] items-center justify-center"
        >
          <MobileMenuIcon className="w-[25px] rotate-90 max-[330px]:w-[18px] max-[330px]:h-[18px] h-[25px]" />
        </div>
        <MobileDrawerLogo />
      </div>
      <div id="no-scroll" className="overflow-auto grid gap-8">
        <div className="grid gap-[18px]">
          {navItems.map((item, idx, arr) => (
            <div
              key={idx}
              className={clsx(
                idx !== arr.length - 1 && user?.token && "border-b border-b-[#EDF0FB]",
                "grid gap-2 pb-2"
              )}
            >
              {item.children.map((el, id) =>
                el.href ? (
                  <Link
                    key={id}
                    href={el.href}
                    className="flex hover:bg-[#f5f5f5] items-center gap-4 px-2 py-[10px]"
                  >
                    {el.icon}
                    {el.name}
                  </Link>
                ) : (
                  <div
                    key={id}
                    onClick={el.action}
                    className="flex hover:bg-[#f5f5f5] cursor-pointer items-center text-[#D40000] gap-4 px-2 py-[10px]"
                  >
                    {el.icon}
                    {el.name}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-[10px]">
          <div className="maw-w-[250px] mx-auto">
            <DownloadApp />
          </div>
          <p className="text-[#757575] text-sm">&copy; Duduzilli Inc.</p>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileDrawer;
