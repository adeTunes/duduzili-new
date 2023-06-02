import { Eye, EyeSlash } from "iconsax-react";
import React, { useState } from "react";
import useUserWallet from "../../../hooks/useUserWallet";

function WalletCard() {
  const {data: wallet} = useUserWallet()
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="w-full h-[184px] flex flex-col justify-between pt-[30px] pl-[26px] pr-[38px] rounded-[20px] pb-6"
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
        <h3 className="text-white flex items-center gap-2 font-bold text-[22px] leading-8">
          {visible ? (
            <>
              {wallet?.data?.available_balance ? ("N" + wallet?.data?.available_balance) : "N0" }
              <EyeSlash
                className="cursor-pointer"
                onClick={() => setVisible((p) => !p)}
                color="white"
                size={16}
              />
            </>
          ) : (
            <>
              N*****
              <Eye
                className="cursor-pointer"
                onClick={() => setVisible((p) => !p)}
                color="white"
                size={16}
              />
            </>
          )}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white text-xs leading-[15px] font-medium opacity-90">
          Last Transaction
        </p>
        <p className="text-xs text-white font-medium leading-[15px] tracking-[0.5] opacity-90">
          09/25
        </p>
      </div>
    </div>
  );
}

export default WalletCard;
