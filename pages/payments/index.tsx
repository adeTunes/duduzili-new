import PrimaryButton from "@/components/button/primaryButton";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import TransactionHistory from "@/components/transactionHistory";
import { clsx } from "@mantine/core";
import { ArrowDown, ArrowLeft, ArrowRight2, ArrowUp } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WalletCard from "../../src/components/payments/walletCard";
import WithdrawModal from "@/components/payments/withdrawModal";
import { useDisclosure } from "@mantine/hooks";
import WithdrawSuccessModal from "@/components/payments/withdrawSuccess";
import DepositModal from "@/components/payments/depositModal";
import DepositSuccessModal from "@/components/payments/depositModalSuccess";
import useIncomeAndOutcome from "../../hooks/useIncomeAndOutcome";
import { amountFormatter } from "@/helpers/amountFormatter";
import Back from "@/components/back";
import Head from "next/head";

function Payments() {
  const { back } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [depositOpened, { open: openDeposit, close: closeDeposit }] =
    useDisclosure(false);
  const [successOpened, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);
  const [
    depositSuccessOpened,
    { open: openDepositSuccess, close: closeDepositSuccess },
  ] = useDisclosure(false);
  const availableStickers = [
    {
      name: "Butfly",
      amount: "₦200",
      image: "/payments/butfly.png",
    },
    {
      name: "Dragfly",
      amount: "₦500",
      image: "/payments/dragfly.png",
    },
    {
      name: "Turk",
      amount: "₦1,000",
      image: "/payments/turk.png",
    },
    {
      name: "Pcock",
      amount: "₦1,500",
      image: "/payments/pcock.png",
    },
    {
      name: "Jagr",
      amount: "₦2,500",
      image: "/payments/jagr.png",
    },
    {
      name: "Leop",
      amount: "₦3,000",
      image: "/payments/leop.png",
    },
    {
      name: "Tigr",
      amount: "₦5,000",
      image: "/payments/tigr.png",
    },
    {
      name: "Pand",
      amount: "₦10,000",
      image: "/payments/pand.png",
    },
    {
      name: "Crocs",
      amount: "₦15,000",
      image: "/payments/crocs.png",
    },
    {
      name: "Drag",
      amount: "₦20,000",
      image: "/payments/drag.png",
    },
    {
      name: "Lyon",
      amount: "₦5,000",
      image: "/payments/lyon.png",
    },
    {
      name: "Eleph",
      amount: "₦100,000",
      image: "/payments/eleph.png",
    },
  ];
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);

  const { query } = useRouter();
  const { data } = useIncomeAndOutcome();

  useEffect(() => {
    if (data?.data?.income) {
      amountFormatter(String(data?.data?.income), setIncome);
    } else setIncome(data?.data?.income);
  }, [data]);

  useEffect(() => {
    if (data?.data?.outcome) {
      amountFormatter(String(data?.data?.outcome), setOutcome);
    } else setOutcome(data?.data?.outcome);
  }, [data]);

  useEffect(() => {
    if (query.deposit) {
      openDepositSuccess();
    }
  }, [query.deposit]);

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
        <title>Duduzili | Accounts</title>
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] w-[80vw] min-w-[795px] max-[500px]:pb-[130px] max-[835px]:min-w-full h-full overflow-auto py-[50px] relative max-w-[1130px] grid grid-rows-[auto_1fr] gap-8">
          <div className="flex items-center justify-between">
            <Back text="Sticker & Payment" />
            <Link href="/payments/withdrawal-accounts">
              <p className="cursor-pointer max-[500px]:text-xs text-duduzili-violet font-semibold leading-6 flex items-center gap-1">
                <span className="max-[420px]:inline-block hidden">
                  Accounts{" "}
                </span>
                <span className="max-[420px]:hidden">
                  View Withdrawal Accounts{" "}
                </span>
                <ArrowRight2 size="16" color="#4534B8" />
              </p>
            </Link>
          </div>
          <div id="no-scroll" className="overflow-auto flex flex-col gap-8">
            <div className="flex max-[640px]:flex-col gap-6">
              <div
                className="bg-white max-[400px]:px-3 max-[400px]:py-2 max-[640px]:min-w-[90%] max-[430px]:min-w-full max-[640px]:mx-auto w-[40%] min-w-[300px] rounded-[20px] px-7 py-5 flex flex-col gap-[22px]"
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex flex-col gap-6">
                  <h3
                    style={{
                      fontSize: "clamp(15px, 1.3vw, 24px)",
                    }}
                    className="text-[#2a2a2a] font-semibold text-[20px] leading-6"
                  >
                    My Wallet
                  </h3>
                  <p className="text-[#757575] max-[500px]:text-[13px]">
                    Deposit funds, withdraw funds and gift stickers using your
                    wallet.
                  </p>
                </div>
                <div className="flex flex-col gap-8">
                  <WalletCard />
                  <div className="grid max-[1139px]:grid-cols-1 grid-cols-2 gap-4">
                    <PrimaryButton
                      text="Deposit Fund"
                      className="!font-semibold whitespace-nowrap max-[640px]:min-w-fit"
                      onClick={openDeposit}
                    />
                    <button
                      onClick={open}
                      className={`py-4 px-6 bg-transparent border max-[640px]:min-w-fit border-[#4534B8] rounded-[32px] text-base font-semibold leading-[19px] text-duduzili-violet`}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <div className="grid grid-cols-2 gap-[26px]">
                  <div
                    style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
                    className="h-[126px] py-2 max-[760px]:flex-col max-[760px]:gap-[10px] px-4 bg-white rounded-[20px] flex gap-[23px] items-center justify-center"
                  >
                    <span className="bg-[#367EE8] max-[400px]:p-[6px] p-[10px] rounded-[10px] justify-center gap-[23px] flex items-center">
                      <ArrowDown
                        size={24}
                        className=" rotate-45"
                        color="white"
                      />
                    </span>
                    <span className="flex flex-col">
                      <p className="text-[#757575] max-[400px]:text-xs whitespace-nowrap leading-6 text-sm">
                        Total Income
                      </p>
                      <p className="flex items-center gap-[13px]">
                        <span className="text-[#2a2a2a] max-[400px]:text-base text-center font-bold text-[22px] leading-8">
                          ₦{income || 0}
                        </span>
                        {/* <span
                          style={{ background: "rgba(2, 177, 90, 0.15)" }}
                          className="text-[#44BC66] text-xs leading-[15px] h-6 w-[63px] flex items-center justify-center rounded-[32px]"
                        >
                          +129%
                        </span> */}
                      </p>
                    </span>
                  </div>
                  <div
                    style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
                    className="h-[126px] max-[760px]:flex-col max-[760px]:gap-[10px] py-2 px-4 bg-white rounded-[20px] flex gap-[23px] items-center justify-center"
                  >
                    <span className="bg-[#4534B8] max-[400px]:p-[6px] p-[10px] rounded-[10px] justify-center gap-[23px] flex items-center">
                      <ArrowUp size={24} className=" rotate-45" color="white" />
                    </span>
                    <span className="flex flex-col">
                      <p className="text-[#757575] max-[400px]:text-xs whitespace-nowrap leading-6 text-sm">
                        Total Outcome
                      </p>
                      <p className="flex items-center gap-[13px]">
                        <span className="text-[#2a2a2a] max-[400px]:text-base text-center font-bold text-[22px] leading-8">
                          ₦{outcome || 0}
                        </span>
                        {/* <span
                          style={{ background: "#F4B9B9" }}
                          className="text-[#D40000] text-xs leading-[15px] h-6 w-[63px] flex items-center justify-center rounded-[32px]"
                        >
                          +129%
                        </span> */}
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-col bg-white max-[680px]:px-3 max-[680px]:py-[10px] gap-6 px-[27px] py-5 rounded-[20px]"
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
                >
                  <p className="text-[#2A2A2A] font-semibold text-[20px] leading-6">
                    Stickers
                  </p>
                  <div className="overflow-auto">
                    <div
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(50px, 1fr))",
                      }}
                      className="grid gap-10 max-[740px]:gap-5"
                    >
                      {availableStickers.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex cursor-pointer flex-col gap-1 items-center"
                        >
                          <div
                            className={clsx(
                              "bg-[#4534b821]",
                              "rounded-full h-10 w-10 flex items-center justify-center"
                            )}
                          >
                            <img
                              src={item.image}
                              className="h-5 w-5 object-cover"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col items-center gap-[5px]">
                            <p className="text-[10px] leading-3 text-[#2A2A2A]">
                              {item.name}
                            </p>
                            <p className="text-duduzili-violet text-[10px] leading-3 font-bold">
                              {item.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TransactionHistory />
          </div>
          <FixedMessagesButton />
        </main>
      </div>
      {/* <Loading loading={isLoading} /> */}
      <WithdrawModal opened={opened} close={close} openSuccess={openSuccess} />
      <DepositModal opened={depositOpened} close={closeDeposit} />
      <WithdrawSuccessModal opened={successOpened} close={closeSuccess} />
      <DepositSuccessModal
        opened={depositSuccessOpened}
        close={closeDepositSuccess}
      />
    </div>
  );
}

export default Payments;
