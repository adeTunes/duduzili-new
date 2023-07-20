import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import MainContainer from "@/components/main-container";
import SupportCard from "@/components/support/supportCard";
import { Icon } from "@iconify/react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { ArrowLeft, Location, Sms } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
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
  const {back} = useRouter()
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
      <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`} />
        <title>Duduzili | Support</title>
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[726px] flex flex-col gap-[34px]"
          >
            <div onClick={back} className="flex cursor-pointer items-center gap-[2.5vw]">
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p style={{
                fontSize: "clamp(15px, 1.3vw, 24px)"
              }} className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Help & Support
              </p>
            </div>
            <div className="p-2 flex flex-col gap-10 pb-[80px]">
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
            className="w-[30%] pb-[80px] overflow-auto min-w-[300px] max-w-[400px] max-[790px]:hidden flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
}

export default Support;
