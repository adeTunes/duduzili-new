import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import { ArrowLeft, HambergerMenu } from "iconsax-react";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Link from "next/link";
import ChatDrawer from "@/components/message/chatDrawer";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { openChatDrawer } from "@/store";
import Back from "@/components/back";
import MainContainer from "@/components/main-container";

const MessageLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { back } = useRouter();
  const { boxType } = props;
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

  const [opened, { open, close }] = useDisclosure(false);
  const chatDrawerOpened = useAtomValue(openChatDrawer)

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section className="w-[45%] max-[800px]:min-w-full max-[800px]:max-w-full min-w-[330px] overflow-auto max-w-[506px] flex flex-col gap-[3.5vh]">
            <div className="flex items-center justify-between">
              <Back text="Messages" />
              {/* <HambergerMenu className="cursor-pointer max-[800px]:inline-block hidden" onClick={open} size={24} /> */}
            </div>
            {children}
          </section>
          <aside className="w-[55%] max-[800px]:hidden overflow-auto max-w-[557px] flex flex-col gap-6">
            <div className="flex overflow-auto h-full flex-col gap-6">
              {/* <div className="max-[800px]:hidden justify-between flex">
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
              </div> */}
              {boxType}
            </div>
          </aside>
        </MainContainer>
      </div>
      <ChatDrawer boxType={boxType} opened={opened || chatDrawerOpened} close={close} />
    </div>
  );
};
export default MessageLayout;
