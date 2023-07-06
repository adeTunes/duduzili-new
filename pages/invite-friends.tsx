import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../types/next";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import AddFriend from "@/components/communities/addFriend";
import PendingRequests from "@/components/homepage/sidebar/pendingRequests";
import useDiscoverPeople from "../hooks/useDiscoverPeople";
import MainContainer from "@/components/main-container";

const InviteFriend: NextPageX = () => {
  const { back } = useRouter();
  const { data } = useDiscoverPeople();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] pb-[60px] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[717px] flex flex-col gap-[34px]"
          >
            <div onClick={back} className="flex cursor-pointer items-center gap-[2.7vw]">
              <ArrowLeft
                className="cursor-pointer"
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p style={{
                fontSize: "clamp(15px, 1.3vw, 24px)"
              }} className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Invite Friends
              </p>
            </div>
            <div
              className="bg-white max-[420px]:p-2 rounded-2xl px-[19px] py-[21px] flex flex-col gap-[18px]"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex flex-col">
                {data?.users?.map((item, idx) => (
                  <AddFriend user={item} key={idx} />
                ))}
              </div>
              {/* <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p> */}
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden pb-[80px] overflow-auto min-w-[300px] max-w-[400px] flex flex-col gap-6"
          >
            <DownloadApp />
            <PendingRequests />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
};
InviteFriend.Layout = fixedSidebarLayout;
export default InviteFriend;
