import { CardSend, Trash } from "iconsax-react";
import React, {Fragment} from "react";

interface Props {
  details: {
    bankLogo: string;
    options: {
      "Bank Name": string;
      "Account Name": string;
      "Account Number": string;
    };
  };
}

function BankDetailsCard({ details }: Props) {
  return (
    <div
      style={{ boxShadow: "-2px 3px 12px 1px rgba(0, 0, 0, 0.05)" }}
      className="h-[247px] bg-white rounded-[8px] px-5 py-4 flex flex-col justify-between gap-5"
    >
      <span className="w-10 h-10 rounded-full">
        <img
          src={details.bankLogo}
          className="w-full h-full object-cover"
          alt=""
        />
      </span>
      <div className="grid grid-cols-2">
        {Object.entries(details.options).map(([key, value], index) => (
          <Fragment key={index}>
            <p className="border-b border-b-[#EDF0FB] py-2 text-[#4A4C58] leading-[15px] text-xs">
              {key}
            </p>
            <p className="border-b border-b-[#EDF0FB] py-2 text-[#4A4C58] leading-6 text-xs font-semibold">
              {value}
            </p>
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-10">
        <span className="flex items-center gap-2">
          <CardSend size={20} color="#367EE8" />
          <p className="text-sm leading-[18px] text-[#367EE8]">Withdraw</p>
        </span>
        <span className="flex items-center gap-2">
          <Trash size={20} color="#E1261C" />
          <p className="text-sm leading-[18px] text-[#E1261C]">
            Delete Account
          </p>
        </span>
      </div>
    </div>
  );
}

export default BankDetailsCard;
