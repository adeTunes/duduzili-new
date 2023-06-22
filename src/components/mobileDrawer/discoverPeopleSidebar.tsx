import React from "react";
import DownloadApp from "../homepage/sidebar/downloadApp";
import TrendingPosts from "../homepage/sidebar/trendingPosts";
import CompanyInfo from "../homepage/sidebar/companyInfo";

function DiscoverPeopleSidebar() {
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] mx-auto max-w-[300px] overflow-auto flex flex-col gap-6"
    >
      <DownloadApp />
      <TrendingPosts />
      <CompanyInfo />
    </aside>
  );
}

export default DiscoverPeopleSidebar;
