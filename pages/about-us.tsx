import Back from "@/components/back";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import MainContainer from "@/components/main-container";
import { userDetails } from "@/store";
import { Icon } from "@iconify/react";
import { Text } from "@mantine/core";
import { ArrowLeft } from "iconsax-react";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function AboutUs() {
  const { back } = useRouter();
  const user: any = useAtomValue(userDetails);
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
        <title>Duduzili | About Us</title>
      </Head>
      <div className="bg-white">
        {user?.token ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] flex-1 flex flex-col gap-[2vh]"
          >
            <Back text="About Duduzili" />
            <div id="no-scroll" className="flex overflow-auto flex-col gap-[3vh]">
              <div
                style={{
                  fontSize: "clamp(15px, 1.3vw, 24px)",
                }}
                className="flex flex-col gap-5 text-[#2A2A2A] leading-8"
              >
                <p>
                  We are about bringing people together. We are building tools
                  for people with something to say and ideas to share, people
                  who believe in authentic expression and want to control the
                  value for their own creations without fear of censorship.
                </p>
                <p>
                  Because everyone benefits when we have access to more ideas,
                  diverse opinions and dialogue. Join us we are on a mission to
                  bring people together
                </p>
              </div>
              <div className="flex flex-col gap-10">
                <h2
                  style={{
                    fontSize: "clamp(15px, 1.3vw, 24px)",
                  }}
                  className="text-[#2A2A2A] font-bold leading-7 text-[20px]"
                >
                  Connect with us
                </h2>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <small className="text-[15px] max-[500px]:text-xs text-[#2A2A2A] leading-6">
                      Follow us on Facebook
                    </small>
                    <div className="flex items-center max-[380px]:flex-col max-[380px]:items-start gap-4">
                      <div className="bg-[#0052CA] h-10  flex items-center justify-center w-10 rounded-full">
                        <Icon
                          icon="ri:facebook-fill"
                          color="white"
                          height={16}
                          width={16}
                        />
                      </div>
                      <Text lineClamp={1}>
                        <a
                          style={{
                            fontSize: "clamp(15px, 1.3vw, 24px)",
                          }}
                          target="_blank"
                          href="https://facebook.com/dudzili"
                          className="text-[#2A2A2A] text-[20px] leading-7"
                        >
                          https://facebook.com/dudzili
                        </a>
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <small className="text-[15px] max-[500px]:text-xs text-[#2A2A2A] leading-6">
                      Follow us on Twitter
                    </small>
                    <div className="flex items-center max-[380px]:flex-col max-[380px]:items-start gap-4">
                      <div className="bg-[#367EE8] h-10  flex items-center justify-center w-10 rounded-full">
                        <Icon
                          icon="uil:twitter"
                          color="white"
                          width="16"
                          height="16"
                        />
                      </div>
                      <Text lineClamp={1}>
                        <a
                        style={{
                          fontSize: "clamp(15px, 1.3vw, 24px)",
                        }}
                          target="_blank"
                          href="https://twitter.com/dudzili"
                          className="text-[#2A2A2A] leading-7"
                        >
                          https://twitter.com/dudzili
                        </a>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] min-w-[300px] max-w-[400px] max-[790px]:hidden pb-[80px] overflow-auto flex flex-col gap-6"
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

export default AboutUs;
