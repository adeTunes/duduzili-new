import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import MainContainer from "@/components/main-container";
import { Icon } from "@iconify/react";
import { Text } from "@mantine/core";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

function AboutUs() {
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] flex-1 flex flex-col gap-[54px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                About Duduzili
              </p>
            </div>
            <div className="flex flex-col gap-[99px]">
              <div className="flex flex-col gap-5 text-[#2A2A2A] text-[20px] leading-8">
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
                <h2 className="text-[#2A2A2A] font-bold leading-7 text-[20px]">
                  Connect with us
                </h2>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <small className="text-[15px] text-[#2A2A2A] leading-6">
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
                    <small className="text-[15px] text-[#2A2A2A] leading-6">
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
                          target="_blank"
                          href="https://twitter.com/dudzili"
                          className="text-[#2A2A2A] text-[20px] leading-7"
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
