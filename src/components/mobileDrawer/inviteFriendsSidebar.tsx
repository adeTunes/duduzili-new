import React from "react";
import DownloadApp from "../homepage/sidebar/downloadApp";
import PendingRequests from "../homepage/sidebar/pendingRequests";
import CompanyInfo from "../homepage/sidebar/companyInfo";

function InviteFriendsSidebar() {
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] overflow-auto mx-auto max-w-[400px] flex flex-col gap-6"
    >
      <DownloadApp />
      <PendingRequests />
      <CompanyInfo />
    </aside>
  );
}

export default InviteFriendsSidebar;
