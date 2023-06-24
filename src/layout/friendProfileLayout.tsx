import Back from "@/components/back";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import FriendProfileActivities from "@/components/profile/friendProfileActivities";
import FriendProfileInformation from "@/components/profile/friendProfileInformation";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";
import { friendPersonalDetails } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useUserActivities from "../../hooks/useUserDrafts";
import MainContainer from "@/components/main-container";

function FriendProfileLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const friendDetails: any = useAtomValue(friendPersonalDetails);
  const { query } = useRouter();
  const { data } = useUserActivities(query.id);
  const setFriendDetails = useSetAtom(friendPersonalDetails);

  useEffect(() => {
    if (data) {
      setFriendDetails(data);
    }
  }, [data]);
  
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[726px] flex flex-col gap-[2.8vh]"
          >
            <Back text={friendDetails?.user?.first_name ? `${friendDetails?.user?.first_name} ${friendDetails?.user?.last_name}` : null} />
            {friendDetails?.user ? (
              <div className="p-2 flex flex-col gap-8">
                <FriendProfileInformation friendDetails={friendDetails} />
                <div className="flex flex-col gap-6">
                  <FriendProfileActivities />
                  <div className="flex flex-col gap-10 pb-[50px]">
                    {children}
                  </div>
                </div>
              </div>
            ) : (
              <ProfileSkeleton />
            )}
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] min-w-[300px] max-w-[400px] max-[790px]:hidden overflow-auto flex flex-col gap-6"
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

export default FriendProfileLayout;
