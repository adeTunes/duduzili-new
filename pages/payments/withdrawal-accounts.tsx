import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import { Add, ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DiscoverPeople from "@/components/homepage/sidebar/discoverPeople";
import CompanyInfo from "@/components/homepage/sidebar/companyInfo";
import BankDetailsCard from "@/components/bankDetailsCard";
import WalletCardAside from "@/components/payments/walletCardAside";
import UseWithdrawalAccounts from "../../hooks/useWithdrawalAccounts";
import { useDisclosure } from "@mantine/hooks";
import AddBankModal from "@/components/payments/addBankModal";
import AddBankSuccessModal from "@/components/payments/addBankSuccessModal";
import WithdrawalBankModal from "@/components/payments/withdrawalBankModal";
import { Skeleton } from "@mantine/core";

function WithdrawalAccounts() {
  const { back } = useRouter();
  const { data, isLoading } = UseWithdrawalAccounts();
  const [opened, { open, close }] = useDisclosure(false);
  const [successOpened, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    setDetails(
      data?.data?.reduce((acc, item) => {
        acc.push({
          bankLogo: "/payments/default-bank-logo.png",
          options: {
            "Bank Name": item?.bank_name,
            "Account Name": item?.account_name,
            "Account Number": item?.account_number,
          },
        });
        return acc;
      }, [])
    );
  }, [data]);

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
                className="min-h-[247px] bg-white rounded-[8px] flex items-center justify-center"
              >
                <div className="flex flex-col gap-[20px] items-center">
                  <span
                    onClick={open}
                    className="w-[80px] cursor-pointer h-[80px] bg-[#EDF0FB] rounded-[80px] flex items-center justify-center"
                  >
                    <Add color="#4534B8" size={32} />
                  </span>
                  <p className="text-[#757575] font-medium leading-6">
                    Add New Withdrawal Account
                  </p>
                </div>
              </div>
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          boxShadow: "-2px 3px 12px 1px rgba(0, 0, 0, 0.05)",
                        }}
                        className="min-h-[247px] bg-white rounded-[8px] flex items-center justify-center"
                      >
                        <Skeleton height="247px" width="100%" />
                      </div>
                    ))
                : details?.map((item, index) => (
                    <BankDetailsCard details={item} key={index} />
                  ))}
            </div>
          </section>
          <aside
            id="no-scroll"
            className="w-[30%] pb-[80px] overflow-auto max-w-[325px] flex flex-col gap-6"
          >
            <WalletCardAside />
            <DiscoverPeople />
            <CompanyInfo />
          </aside>
          <FixedMessagesButton />
        </main>
      </div>
      {opened ? (
        <AddBankModal opened={opened} close={close} openSuccess={openSuccess} />
      ) : null}
      <AddBankSuccessModal opened={successOpened} close={closeSuccess} />
    </div>
  );
}

export default WithdrawalAccounts;
