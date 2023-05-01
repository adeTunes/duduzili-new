import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import { useRouter } from "next/router";
import AddFriend from "@/components/communities/addFriend";
import InviteFriends from "@/components/homepage/sidebar/inviteFriends";
import PendingRequests from "@/components/homepage/sidebar/pendingRequests";

const InviteFriend: NextPageX = () => {
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto pb-[50px] relative max-w-[1131px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[717px] flex flex-col gap-[34px]"
          >
            <div className="flex items-center gap-10">
              <ArrowLeft
                className="cursor-pointer"
                onClick={back}
                size="32"
                color="#2A2A2A"
                variant="Outline"
              />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Invite Friends
              </p>
            </div>
            <div
              className="bg-white rounded-2xl px-[19px] py-[21px] flex flex-col gap-[18px]"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex flex-col">
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
                <AddFriend />
              </div>
              <p className=" font-semibold leading-[19px] text-[#367EE8] cursor-pointer">
                Show more
              </p>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <PendingRequests />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
};
InviteFriend.Layout = fixedSidebarLayout;
export default InviteFriend;
