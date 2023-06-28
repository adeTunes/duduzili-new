import DiscoverSuggested from "@/components/discover/discoverSuggested";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import DownloadApp from "@/components/homepage/sidebar/downloadApp";
import TrendingPosts from "@/components/homepage/sidebar/trendingPosts";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFollowings from "../hooks/useFollowings";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import useFollowers from "../hooks/useFollowers";
import { base64encode } from "nodejs-base64";
import Back from "@/components/back";
import MainContainer from "@/components/main-container";
import FollowSkeleton from "@/components/skeletons/followSkeleton";

function Friends() {
  const { back } = useRouter();
  const user: any = useAtomValue(userDetails);
  const { data: followings, isLoading } = useFollowings(user?.user?.id);
  const { data: followers, isLoading: isDataLoading } = useFollowers(
    user?.user?.id
  );
  const { push } = useRouter();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (followers && followings) {
      setFriends([...followers, ...followings]);
    }
  }, [followers, followings]);

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-[790px]:flex-1 max-[450px]:min-w-[250px] min-w-[400px] max-w-[717px] flex flex-col gap-[34px]"
          >
            <Back text={`Friends List (${friends?.length})`} />
            <div
              className="bg-white max-[420px]:p-2 rounded-2xl p-6 flex flex-col gap-6"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex flex-col">
                {isLoading || isDataLoading ? (
                  <>
                    <FollowSkeleton />
                    <FollowSkeleton />
                    <FollowSkeleton />
                    <FollowSkeleton />
                    <FollowSkeleton />
                    <FollowSkeleton />
                    <FollowSkeleton />
                  </>
                ) : (
                  friends?.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-[36px] h-[36px]">
                          <img
                            src={
                              item?.photo_url?.substring(62) ||
                              "/profile-pic-default.png"
                            }
                            className="w-full h-full rounded-full object-cover"
                            alt="profile picture of suggested friend"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="max-[420px]:text-[13px] font-bold leading-[19px] text-[#2A2A2A]">
                            {item?.first_name} {item?.last_name}
                          </p>
                          <p className="max-[420px]:text-[13px] text-[#505050] leading-[19px]">
                            @{item?.username}
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          const friend = JSON.stringify(item);
                          push(
                            `/messages/friends?chat=${base64encode(friend)}`
                          );
                        }}
                        className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]"
                      >
                        Message
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] max-[790px]:hidden pb-[80px] overflow-auto min-w-[300px] max-w-[400px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </MainContainer>
      </div>
    </div>
  );
}

export default Friends;
