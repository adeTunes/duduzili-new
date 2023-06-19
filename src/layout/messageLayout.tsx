import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import { ArrowLeft, HambergerMenu } from "iconsax-react";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Link from "next/link";
import ChatDrawer from "@/components/message/chatDrawer";
import { useDisclosure } from "@mantine/hooks";

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

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] w-full h-full pb-[50px] relative max-w-[1131px] justify-between pt-[3vh] gap-[50px] flex">
          <section className="w-[45%] max-[800px]:hidden min-w-[330px] overflow-auto max-w-[506px] flex flex-col gap-[32px]">
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Messages
              </p>
            </div>
            {children}
          </section>
          <aside className="w-[55%] max-[800px]:w-full max-[800px]:max-w-full overflow-auto max-w-[557px] flex flex-col gap-6">
            <div className="max-[800px]:flex hidden justify-between items-center">
              <div
                onClick={back}
                className="flex cursor-pointer items-center gap-3"
              >
                <ArrowLeft size="24" color="#2A2A2A" variant="Outline" />
                <p className="text-[#2A2A2A] text-[16px] font-bold">Messages</p>
              </div>
              <HambergerMenu onClick={open} size={24} />
            </div>
            <div className="flex overflow-auto h-full flex-col gap-6">
              <div className="max-[800px]:hidden justify-between flex">
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
        </main>
      </div>
      <ChatDrawer opened={opened} close={close} />
    </div>
  );
};
export default MessageLayout;
