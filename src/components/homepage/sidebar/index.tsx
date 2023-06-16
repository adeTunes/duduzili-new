import React, { use } from "react";
import DownloadApp from "./downloadApp";
import TrendingPosts from "./trendingPosts";
import DiscoverPeople from "./discoverPeople";
import CompanyInfo from "./companyInfo";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";

function Aside() {
  const user: any = useAtomValue(userDetails);
  return (
    <aside
      id="no-scroll"
      className="w-[30%] max-[790px]:hidden overflow-auto pb-[80px] min-w-[300px] max-w-[400px] flex flex-col gap-6"
    >
      <DownloadApp />
      {user?.token && (
        <>
          {/* <PendingRequests />
          <InviteFriends /> */}
          <TrendingPosts />
          <DiscoverPeople />
        </>
      )}
      <CompanyInfo />
    </aside>
  );
}

export default Aside;
