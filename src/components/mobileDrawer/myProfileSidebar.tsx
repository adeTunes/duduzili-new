import React from "react";
import WalletCardAside from "../payments/walletCardAside";
import DiscoverPeople from "../homepage/sidebar/discoverPeople";
import CompanyInfo from "../homepage/sidebar/companyInfo";

function MyProfileSidebar() {
  return (
    <aside
      id="no-scroll"
      className="w-full pb-[80px] overflow-auto mx-auto max-w-[400px] flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <p className="text-[#2A2A2A] text-[16px] leading-[22px] font-bold">
          My Wallet
        </p>
        <WalletCardAside />
      </div>
      <DiscoverPeople />
      <CompanyInfo />
    </aside>
  );
}

export default MyProfileSidebar;
