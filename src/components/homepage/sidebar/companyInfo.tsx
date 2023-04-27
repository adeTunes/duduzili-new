import React from "react";

function CompanyInfo() {
  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Terms of Services
        </p>
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Privacy Policy
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Cookies Policy
        </p>
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Help & Support
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Duduzilli Inc.
        </p>
      </div>
    </div>
  );
}

export default CompanyInfo;
