import React from "react";
import DownloadApp from "../homepage/sidebar/downloadApp";
import PendingRequests from "../homepage/sidebar/pendingRequests";
import InviteFriends from "../homepage/sidebar/inviteFriends";
import CompanyInfo from "../homepage/sidebar/companyInfo";
import { useAtomValue } from "jotai";
import { singleCommunity } from "@/store";

function CommunityDetailsSidebar() {
    const community: any = useAtomValue(singleCommunity)
  return (
    <aside
      id="no-scroll"
      className="w-full overflow-auto mx-auto max-w-[300px] pb-[80px] flex flex-col gap-6"
    >
      <DownloadApp />
      {community?.data?.is_owner ? (
        <>
          <PendingRequests />
          <InviteFriends />
        </>
      ) : null}
      <CompanyInfo />
    </aside>
  );
}

export default CommunityDetailsSidebar;
