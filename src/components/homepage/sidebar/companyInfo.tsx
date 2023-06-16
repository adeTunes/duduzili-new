import Link from "next/link";
import React from "react";

function CompanyInfo() {
  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="">
          <p className="text-[#505050] text-[14px] leading-[17px]">
            Terms of Services
          </p>
        </Link>
        <Link href="/privacy-policy">
          <p className="text-[#505050] text-[14px] leading-[17px]">
            Privacy Policy
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[#505050] text-[14px] leading-[17px]">
          Cookies Policy
        </p>
        <Link href="/support">
          <p className="text-[#505050] text-[14px] leading-[17px]">
            Help & Support
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about-us">
          <p className="text-[#505050] text-[14px] leading-[17px]">
            Duduzilli Inc.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default CompanyInfo;
