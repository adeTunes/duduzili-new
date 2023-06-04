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

function Friends() {
  const { back } = useRouter();
  const user: any = useAtomValue(userDetails);
  const { data: followings } = useFollowings(user?.user?.id);
  const { data: followers } = useFollowers(user?.user?.id);

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
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto py-[50px] relative max-w-[1131px] justify-between w-[80%] mx-auto gap-[50px] flex">
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
                Friends List ({friends?.length})
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-6 flex flex-col gap-6"
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex flex-col">
                {friends?.map((item, idx) => (
                  <div className="px-2 py-4 flex items-center justify-between border-b border-b-[#EDF0FB]">
                    <div className="flex gap-3 items-center">
                      <div className="w-[36px] h-[36px]">
                        <img
                          src={item?.photo_url?.substring(62) || "/profile-pic-default.png"}
                          className="w-full h-full rounded-full object-cover"
                          alt="profile picture of suggested friend"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className=" font-bold leading-[19px] text-[#2A2A2A]">
                          {item?.first_name} {item?.last_name}
                        </p>
                        <p className="text-[#505050] leading-[19px]">@{item?.username}</p>
                      </div>
                    </div>
                    <p className="cursor-pointer text-white leading-[15px] text-[12px] px-4 py-2 bg-[#4534B8] rounded-[32px]">
                      Message
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <DownloadApp />
            <TrendingPosts />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default Friends;
