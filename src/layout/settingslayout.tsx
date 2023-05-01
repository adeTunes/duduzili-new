import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Link from "next/link";
import SettingsTab from "../components/settings/settingsTab";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";

const SettingsLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { back } = useRouter();
  const { tabName } = props;
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full pb-[50px] relative max-w-[1131px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section className="w-[45%] overflow-auto max-w-[506px] flex flex-col gap-8">
            <div className="flex items-center gap-10">
              <ArrowLeft
                className="cursor-pointer"
                onClick={back}
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Settings
              </p>
            </div>
            <SettingsTab />
          </section>
          <aside className="w-[55%] overflow-auto max-w-[557px] flex flex-col gap-6">
            <p className="font-semibold text-[#222222] text-[18px] leading-[22px] pb-4 border-b border-b-[#EDF0FB]">
              {tabName}
            </p>
            {children}
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
export default SettingsLayout;
