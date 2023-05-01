import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Link from "next/link";

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

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full pb-[50px] relative max-w-[1131px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[45%] overflow-auto max-w-[506px] flex flex-col gap-[32px]">
            <div className="flex items-center gap-10">
              <ArrowLeft
                className="cursor-pointer"
                onClick={back}
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Messages
              </p>
            </div>
            {children}
          </section>
          <aside className="w-[55%] overflow-auto max-w-[557px] flex flex-col gap-8">
            <div className=" justify-between flex">
              {tabs.map((item, idx) => (
                <Link href={item.href}>
                  <p
                    role="button"
                    className={clsx(
                      pathname.includes(item.href)
                        ? "bg-duduzili-violet text-white font-semibold"
                        : "bg-[#EDF0FB] text-[#2A2A2A]",
                      "px-[58.5px] py-2 rounded-[40px] leading-6"
                    )}
                  >
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
            {boxType}
          </aside>
        </main>
      </div>
    </div>
  );
};
export default MessageLayout;
