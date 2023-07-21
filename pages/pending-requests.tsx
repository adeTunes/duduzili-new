import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../types/next";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import InviteFriends from "@/components/homepage/sidebar/inviteFriends";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import JoinRequest from "@/components/communities/joinRequest";
import useCommunityPendingRequests from "../hooks/useCommunityPendingRequests";
import { useEffect, useState } from "react";
import MainContainer from "@/components/main-container";
import Head from "next/head";

const PendingRequestPage: NextPageX = () => {
  const { back, query } = useRouter();
  const { data } = useCommunityPendingRequests(query.community);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (data && query.community) {
      setRequests(
        data?.filter(
          (item) => item?.community?.code === String(query.community)
        )
      );
    }
  }, [data, query.community]);

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
        <title>Duduzili | Community Pending Requests</title>
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[717px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-[2.5vw]"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p
                style={{
                  fontSize: "clamp(15px, 1.3vw, 24px)",
                }}
                className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold"
              >
                Pending Requests ({requests.length})
              </p>
            </div>
            {requests?.length ? (
              <div
                className="bg-white max-[420px]:p-2 rounded-2xl px-[19px] py-[21px] flex flex-col gap-[18px]"
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex flex-col">
                  {requests?.map((item, idx) => (
                    <JoinRequest key={idx} data={item} />
                  ))}
                </div>
                {/* <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p> */}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <img
                    className="w-[200px]"
                    src="/empty-states/pending-requests.png"
                    alt="community list empty"
                  />
                  <p className="text-[#2a2a2a] text-[20px] leading-7 font-bold">
                    Your have no pending request
                  </p>
                </div>
              </div>
            )}
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto min-w-[300px] max-w-[400px] max-[790px]:hidden flex flex-col gap-6"
          >
            <DownloadApp />
            <InviteFriends />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
};
export default PendingRequestPage;
