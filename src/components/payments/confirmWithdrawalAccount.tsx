import React, { Fragment } from "react";

function ConfirmWithdrawalAccount() {
  const entries = {
    "Bank name": "Wema Bank",
    "Account number": "0243913808",
    "Account name": "Ayodele Davies",
    Amount: "N4,000",
  };
  return (
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
  );
}

export default ConfirmWithdrawalAccount;
