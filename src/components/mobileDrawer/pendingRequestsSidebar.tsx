import React from "react";
import DownloadApp from "../homepage/sidebar/downloadApp";
import InviteFriends from "../homepage/sidebar/inviteFriends";
import CompanyInfo from "../homepage/sidebar/companyInfo";

function PendingRequestsSidebar() {
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] overflow-auto mx-auto max-w-[300px] flex flex-col gap-6"
    >
      <DownloadApp />
      <InviteFriends />
      <CompanyInfo />
    </aside>
  );
}

export default PendingRequestsSidebar;
