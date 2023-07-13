import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import SettingsTab from "../components/settings/settingsTab";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { useDisclosure } from "@mantine/hooks";
import SettingsDrawer from "@/components/settings/settings-drawer";
import Back from "@/components/back";
import Head from "next/head";

const SettingsLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { tabName } = props;
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
        <title>Duduzili | Settings</title>
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] max-[680px]:w-full h-full pb-[50px] relative max-w-[1131px] max-[1170px]:min-w-[900px] max-[940px]:min-w-full min-w-[1131px] justify-between pt-[3vh] gap-[3vw] flex">
          <section className="w-[45%] max-[680px]:hidden min-w-[250px] overflow-auto max-w-[506px] flex flex-col gap-8">
            <Back text="Settings" />
            <SettingsTab />
          </section>
          <aside className="w-[55%] max-[500px]:pb-[80px] max-[680px]:min-w-full  min-w-[350px] overflow-auto max-w-[557px] flex flex-col gap-6">
            <div className="max-[680px]:flex hidden justify-between items-center">
              <Back text="Settings" />
              <p
                onClick={open}
                className=" text-duduzili-blue cursor-pointer font-semibold leading-6"
                style={{fontSize: "clamp(12px, 0.96vw, 16px)"}}
              >
                More settings
              </p>
            </div>
            <p style={{
            fontSize: "clamp(15px, 1.3vw, 24px)",
          }} className="font-semibold text-[#222222] text-[18px] leading-[22px] pb-4 border-b border-b-[#EDF0FB]">
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
