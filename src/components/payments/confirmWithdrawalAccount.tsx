import { amountFormatter } from "@/helpers/amountFormatter";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../button/primaryButton";

function ConfirmWithdrawalAccount({ bank, nextStep, amount }) {
  const [formattedAmount, setFormatedAmount] = useState("");
  useEffect(() => {
    amountFormatter(amount, setFormatedAmount);
  }, [amount]);

  const entries = {
    "Bank name": bank?.bank_name,
    "Account number": bank?.account_number,
    "Account name": bank?.account_name,
    Amount: `N${formattedAmount}`,
  };
  return (
    <>
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="p-6 flex flex-col gap-[25px] rounded-lg"
      >
        {Object.entries(entries).map(([key, value], index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="font-medium leading-6 text-[#bdbdbd]">{key}</p>
            <p className="text-[#2a2a2a] leading-6 font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <PrimaryButton text="Confirm Account" onClick={nextStep} />
    </>
  );
}

export default ConfirmWithdrawalAccount;
