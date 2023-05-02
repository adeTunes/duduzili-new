import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import SupportCard from "@/components/support/supportCard";
import { Icon } from "@iconify/react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { ArrowLeft, Location, Sms } from "iconsax-react";
import React from "react";

function Support() {
  const supportInfo = [
    {
      text: "Email Address",
      subText: "support@duduzili.com",
      icon: <Sms size="20" variant="Outline" color="#4534B8" />,
    },
    {
      text: "Phone number",
      subText: "+2348106545067",
      icon: (
        <Icon
          icon="ic:baseline-phone-iphone"
          color="#4534b8"
          width="20"
          height="20"
        />
      ),
    },
    {
      text: "Address",
      subText:
        "2nd Floor, Ajoke Christiana House, Idi-Ape, Iwo road, Ibadan, Nigeria",
      icon: <Location size="20" color="#4534B8" variant="Bold" />,
    },
  ];
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1139px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[726px] flex flex-col gap-[34px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Help & Support
              </p>
            </div>
            <div className="p-2 flex flex-col gap-10 pb-[50px]">
              <div className="flex flex-col gap-[10px]">
                <p className="p-[10px] text-[#2A2A2A] font-medium opacity-80 leading-6">
                  Contact Info
                </p>
                <div
                  className="rounded-lg bg-white py-6 px-4 flex flex-col gap-6"
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
                >
                  {supportInfo.map((item, idx) => (
                    <SupportCard key={idx} {...item} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="p-[10px] text-[#2A2A2A] font-medium opacity-80 leading-6">
                  Send a message
                </p>
                <div
                  className="rounded-lg bg-white py-6 px-4 flex flex-col gap-8"
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
                >
                  <div className="flex flex-col gap-4">
                    <TextInput
                      classNames={{
                        label: "text-[#2A2A2A] font-medium leading-6",
                        root: "flex flex-col gap-2",
                        input: "h-12 border border-[#C8C8C8] rounded-lg",
                      }}
                      label="Name"
                      placeholder="Enter name"
                    />
                    <TextInput
                      label="Your Email"
                      placeholder="yourname@email.com"
                      classNames={{
                        label: "text-[#2A2A2A] font-medium leading-6",
                        root: "flex flex-col gap-2",
                        input: "h-12 border border-[#C8C8C8] rounded-lg",
                      }}
                    />
                    <TextInput
                      label="Subject"
                      placeholder="Enter subject"
                      classNames={{
                        label: "text-[#2A2A2A] font-medium leading-6",
                        root: "flex flex-col gap-2",
                        input: "h-12 border border-[#C8C8C8] rounded-lg",
                      }}
                    />
                    <Textarea
                      label="Message"
                      placeholder="Enter message"
                      minRows={6}
                      maxRows={6}
                      classNames={{
                        label: "text-[#2A2A2A] font-medium leading-6",
                        root: "flex flex-col gap-2",
                        input: "border border-[#C8C8C8] rounded-lg",
                      }}
                    />
                  </div>
                  <Button className="bg-[#4534B8] hover:bg-[#4534B8] h-[64px] !rounded-[32px] text-white font-semibold leading-6 cursor-pointer">
                    Send Mesage
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[50px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default Support;
