import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import PersonalInformation from "@/components/profile/personalInformation";
import ProfileActivities from "@/components/profile/profileActivities";
import { userDetails } from "@/store";
import { ArrowLeft } from "iconsax-react";
import { useAtomValue } from "jotai";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import WalletCardAside from "@/components/payments/walletCardAside";

function ProfileActivitiesLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const user: any = useAtomValue(userDetails);

  // const { data } = useFollowings(user?.user?.id);
  // console.log(data);
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1139px] justify-between pt-[3vh] gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[726px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] max-[500px]:text-[18px] leading-[29px] text-[24px] font-bold">
                {`${user?.user?.first_name} ${user?.user?.last_name}`}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <PersonalInformation user={user?.user} />
              <div className="flex flex-col gap-6">
                <ProfileActivities />
                <div className="flex flex-col gap-10 pb-[50px]">{children}</div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden pb-[80px] overflow-auto min-w-[300px] max-w-[400px] flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <p className="text-[#2A2A2A] text-[18px] leading-[22px] font-bold">My Wallet</p>
              <WalletCardAside />
            </div>
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default ProfileActivitiesLayout;
