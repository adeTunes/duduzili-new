import fixedSidebarLayout from "@/layout/fixedSidebar";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import { NextPageX } from "../../types/next";
import Aside from "@/components/homepage/sidebar";
import CommunityView from "@/components/communities/communityView";
import { Slider } from "@/components/carousel";
import { useRouter } from "next/router";
import useCommunityDetails from "../../hooks/useCommunityDetails";
import { Loading } from "@/components/loading";
import useCommunityList from "../../hooks/useCommunityList";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import InviteFriends from "@/components/homepage/sidebar/inviteFriends";
import PendingRequests from "@/components/homepage/sidebar/pendingRequests";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { singleCommunity } from "@/store";
import { useEffect } from "react";
import Back from "@/components/back";

const Community: NextPageX = () => {
  const { query, back } = useRouter();
  const { data, isLoading } = useCommunityDetails(query.id);
  const { data: communities } = useCommunityList("");
  const setSingleCommunity: any = useSetAtom(singleCommunity)

  useEffect(() => {
    if(data) {
      setSingleCommunity(data)
    }
  }, [data])


  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between pt-[3vh] gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] max-[450px]:min-w-[250px] max-[790px]:flex-1 min-w-[400px] max-w-[690px] overflow-auto flex flex-col gap-[56px]"
          >
            <div className="flex flex-col gap-[27px]">
              <Back text={data?.data?.name} />
              <div className="flex flex-col gap-[36px]">
                <CommunityView community={data} />
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <p className="text-[24px] leading-[29px] font-semibold">
                Discover Communities
              </p>
              <div
                className="bg-[#EDF0FB] p-6 pb-[90px] flex flex-col gap-6 rounded-2xl"
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[18px] leading-[22px] font-semibold">
                    Communities
                  </p>
                  <Link href="/communities/discover">
                  <p className=" font-semibold self-end text-duduzili-violet">
                    View All
                  </p>
                  </Link>
                </div>
                <Slider community={communities?.results} color="#EDF0FB" />
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden overflow-auto pb-[80px] min-w-[300px] max-w-[400px] flex flex-col gap-6"
          >
            <DownloadApp />
            {data?.data?.is_owner ? (
              <>
                <PendingRequests />
                <InviteFriends />
              </>
            ) : null}
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
      <Loading loading={isLoading} />
    </div>
  );
};
Community.Layout = fixedSidebarLayout;
export default Community;
