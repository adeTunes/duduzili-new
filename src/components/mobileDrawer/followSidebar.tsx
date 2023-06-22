import React from "react";
import DownloadApp from "../homepage/sidebar/downloadApp";
import TrendingPosts from "../homepage/sidebar/trendingPosts";
import CompanyInfo from "../homepage/sidebar/companyInfo";

function FollowSidebar() {
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] max-w-[300px] mx-auto overflow-auto flex flex-col gap-6"
    >
      <DownloadApp />
      <TrendingPosts />
      <CompanyInfo />
    </aside>
  );
}

export default FollowSidebar;
