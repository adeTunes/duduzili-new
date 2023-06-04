import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import useUserWallet from "../../../hooks/useUserWallet";
import Link from "next/link";
import { amountFormatter } from "@/helpers/amountFormatter";
import { useRouter } from "next/router";

function WalletCardAside() {
  const {data: wallet} = useUserWallet()
  const [amount, setAmount] = useState(null)
  const {push} = useRouter()

  useEffect(() => {
    if(wallet?.data?.available_balance) {
      amountFormatter(wallet?.data?.available_balance?.split(".00").join(""), setAmount)
    }
  }, [wallet])

  return (
    <div
      className="w-full h-[184px] gap-[35px] flex flex-col justify-between pt-[30px] pl-[26px] pr-[38px] rounded-[20px] pb-6"
      style={{
        backgroundImage: "url('/payments/wallet-card.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col">
        <p className="text-[14px] leading-6 text-white opacity-[0.54]">
          Current Balance
        </p>
        <h3 className="text-white font-bold text-[22px] leading-8">
          {amount ? ("₦" + amount + ".00") : "₦0" }
        </h3>
      </div>
      <span
        style={{
          background: "rgba(69, 52, 184, 0.7)",
          border: "2px solid rgba(134, 116, 251, 0.2)",
          backdropFilter: "blur(60px)",
        }}
        className="rounded-[32px] cursor-pointer self-start py-4 px-5"
        onClick={() => push("/payments")}
      >
        <p className="flex items-center gap-2 text-white opacity-90 text-xs tracking-[0.5px] font-medium leading-[15px]">
          View Wallet
          <Icon color="white" icon="tabler:chevron-right" />
        </p>
      </span>
    </div>
  );
}

export default WalletCardAside;
