import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import PersonalInformation from "@/components/profile/personalInformation";
import ProfileActivities from "@/components/profile/profileActivities";
import {
  currentUserDetails,
  userDetails,
  userFollowers,
  userFollowings,
} from "@/store";
import { ArrowLeft } from "iconsax-react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import WalletCardAside from "@/components/payments/walletCardAside";
import Back from "@/components/back";
import SinglePostSkeleton from "@/components/skeletons/singlePostSkeleton";
import MainContainer from "@/components/main-container";
import { base64decode } from "nodejs-base64";
import useOfflineUser from "../../hooks/use-offline-user";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import FriendProfileInformation from "@/components/profile/friendProfileInformation";
import FriendProfileActivities from "@/components/profile/friendProfileActivities";

interface IUserInfo {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  get_cover_image: string;
  is_online: boolean;
  bio: string;
  town: string;
  country: string;
  is_private: boolean;
  is_following: boolean;
  location: string;
}

function ProfileActivitiesLayout({ children }: { children: ReactNode }) {
  const user: any = useAtomValue(userDetails);
  const { query } = useRouter();
  // const { data, isLoading } = useUserActivities(user?.user?.id);
  const { data, isLoading } = useOfflineUser(base64decode(String(query?.user)));
  const setFollowings = useSetAtom(userFollowings);
  const setFollowers = useSetAtom(userFollowers);
  const setUserDetails = useSetAtom(currentUserDetails);

  useEffect(() => {
    if (data) {
      setFollowers(data?.followers);
      setFollowings(data?.followings);
      setUserDetails(data);
    }
  }, [data]);

  const [openAuthModal, setOpenAuth] = useState(false);

  // const { data } = useFollowings(user?.user?.id);
  // console.log(data);

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        {!user?.token ? <HeaderUnauthenticated /> : <Header />}
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%]  overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] min-[1200px]:min-w-[600px] min-[900px]:min-w-[500px] max-w-[726px] flex flex-col gap-[34px]"
          >
            {!user?.token ? null : (
              <Back
                text={`${data?.user?.first_name || ""} ${
                  data?.user?.last_name || ""
                }`}
              />
            )}
            <div className="flex flex-col gap-8">
              {user?.user?.id === data?.user?.id ? (
                <PersonalInformation
                  setOpenAuth={setOpenAuth}
                  user={data?.user}
                />
              ) : (
                <FriendProfileInformation friendDetails={data} />
              )}

              <div className="flex flex-col gap-6">
                {user?.token && user?.user?.id === data?.user?.id ? (
                  <ProfileActivities />
                ) : (
                  <FriendProfileActivities />
                )}
                <div className="flex flex-col gap-10 pb-[50px]">
                  {isLoading ? (
                    <>
                      <SinglePostSkeleton />
                      <SinglePostSkeleton />
                      <SinglePostSkeleton />
                    </>
                  ) : (
                    children
                  )}
                </div>
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden pb-[80px] overflow-auto min-w-[300px] max-w-[400px] flex flex-col gap-6"
          >
            {/* <div className="flex flex-col gap-4">
              <p className="text-[#2A2A2A] text-[18px] leading-[22px] font-bold">
                My Wallet
              </p>
              <WalletCardAside />
            </div> */}
            {!user?.token ? null : (
              <>
                <DiscoverPeople />
              </>
            )}
            <CompanyInfo />
          </aside>
          {!user?.token ? null : <FixedMessagesButton />}
        </MainContainer>
        <UnAuthenticaticatedUserModal
          opened={openAuthModal}
          setOpened={setOpenAuth}
        />
      </div>
    </div>
  );
}

export default ProfileActivitiesLayout;
