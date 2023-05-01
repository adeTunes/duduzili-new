import React, { use } from "react";
import DownloadApp from "./downloadApp";
import TrendingPosts from "./trendingPosts";
import DiscoverPeople from "./discoverPeople";
import CompanyInfo from "./companyInfo";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import PendingRequests from "./pendingRequests";
import InviteFriends from "./inviteFriends";

function Aside() {
  const user: any = useAtomValue(userDetails);
  return (
    <aside
      id="no-scroll"
      className="w-[30%] overflow-auto pb-[50px] max-w-[325px] flex flex-col gap-6"
    >
      <DownloadApp />
      {user.post && (
        <>
          <PendingRequests />
          <InviteFriends />
          <TrendingPosts />
          <DiscoverPeople />
        </>
      )}
      <CompanyInfo />
    </aside>
  );
}

export default Aside;
