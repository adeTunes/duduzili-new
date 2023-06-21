import { Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowDown2, Home, Profile2User, Sms, TrendUp } from "iconsax-react";
import Link from "next/link";
import React from "react";

function Navigation() {
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
  return (
    <>
      <p
        className="mb-8 text-[18px] flex items-center justify-between w-full max-w-[400px] mx-auto font-bold cursor-pointer hover:bg-[#efefef] py-2"
        onClick={toggle}
      >
        Menu
        <ArrowDown2 style={{transform: menuOpened ? "rotate(-180deg)" : "rotate(0deg)", transition: "transform 400ms"}} className="mr-3" size="16" />
      </p>
      <Collapse in={menuOpened}>
        <ul className="flex flex-col font-semibold gap-3 mb-3">
          {navIcons.map((item) => (
            <li
              key={item.name}
              className=" cursor-pointer py-2 hover:bg-[#f4f4f4] flex"
            >
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
    </>
  );
}

export default Navigation;
