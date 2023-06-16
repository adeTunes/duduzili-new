import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import { ArrowLeft, HambergerMenu } from "iconsax-react";
import { useRouter } from "next/router";
import { clsx } from "@mantine/core";
import Link from "next/link";
import SettingsTab from "../components/settings/settingsTab";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { useDisclosure } from "@mantine/hooks";
import SettingsDrawer from "@/components/settings/settings-drawer";

const SettingsLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { back } = useRouter();
  const { tabName } = props;
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] max-[680px]:w-full h-full pb-[50px] relative max-w-[1131px] justify-between pt-[3vh] gap-[3vw] flex">
          <section className="w-[45%] max-[680px]:hidden min-w-[370px] overflow-auto max-w-[506px] flex flex-col gap-8">
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
          <aside className="w-[55%] max-[680px]:min-w-full  min-w-[350px] overflow-auto max-w-[557px] flex flex-col gap-6">
            <div className="max-[680px]:flex hidden justify-between items-center">
              <div
                onClick={back}
                className="flex cursor-pointer items-center gap-3"
              >
                <ArrowLeft size="24" color="#2A2A2A" variant="Outline" />
                <p className="text-[#2A2A2A] text-[16px] font-bold">Settings</p>
              </div>
              <HambergerMenu onClick={open} size={24} />
            </div>
            <p className="font-semibold text-[#222222] text-[18px] leading-[22px] pb-4 border-b border-b-[#EDF0FB]">
              {tabName}
            </p>
            {children}
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
      <SettingsDrawer opened={opened} close={close} />
    </div>
  );
};
export default SettingsLayout;
