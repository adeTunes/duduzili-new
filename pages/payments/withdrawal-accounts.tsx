import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import { Add, ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import BankDetailsCard from "@/components/bankDetailsCard";
import WalletCardAside from "@/components/payments/walletCardAside";
import UseWithdrawalAccounts from "../../hooks/useWithdrawalAccounts";

function WithdrawalAccounts() {
  const { back } = useRouter();
  const {data} = UseWithdrawalAccounts()
  console.log(data)

  const details = [
    {
      bankLogo: "/payments/wema-bank.png",
      options: {
        "Bank Name": "First City Monument bank",
        "Account Name": "Davies Ayodele",
        "Account Number": "23142546738",
      },
    },
    {
      bankLogo: "/payments/first-bank.png",
      options: {
        "Bank Name": "First Bank of Nigeria",
        "Account Name": "Davies Ayodele",
        "Account Number": "23142546738",
      },
    },
    {
      bankLogo: "/payments/default-bank-logo.png",
      options: {
        "Bank Name": "Opay Digital Bank",
        "Account Name": "Davies Ayodele",
        "Account Number": "23142546738",
      },
    },
  ];
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full overflow-auto relative max-w-[1139px] justify-between pt-[50px] w-[80%] mx-auto gap-[50px] flex">
          <section
            id="no-scroll"
            className="w-[70%] overflow-auto max-w-[726px] flex flex-col gap-[34px]"
          >
            <div
              onClick={back}
              className="flex cursor-pointer items-center gap-10"
            >
              <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
              <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
                Withdrawal Accounts
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div
                style={{ boxShadow: "-2px 3px 12px 1px rgba(0, 0, 0, 0.05)" }}
                className="h-[247px] bg-white rounded-[8px] flex items-center justify-center"
              >
                <div className="flex flex-col gap-[20px] items-center">
                  <span className="w-[80px] cursor-pointer h-[80px] bg-[#EDF0FB] rounded-[80px] flex items-center justify-center">
                    <Add color="#4534B8" size={32} />
                  </span>
                  <p className="text-[#757575] font-medium leading-6">
                    Add New Withdrawal Account
                  </p>
                </div>
              </div>
              {details.map((item, index) => (
                <BankDetailsCard details={item} key={index} />
              ))}
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[50px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <WalletCardAside />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default WithdrawalAccounts;
