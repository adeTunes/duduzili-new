import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function HeaderUnauthenticated() {
  return (
    <header className="w-[90%] mx-auto max-w-[1500px] py-5 flex justify-between items-center">
      <div className="h-[49px]">
        <Image src="/logo.png" alt="duduzili logo" className="h-full" />
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login">
          <p
            role="button"
            className="px-5 py-[13px] bg-[#4534B8] rounded-[32px] text-[#fff] text-[18px] leading-[22px] font-semibold"
          >
            Sign In
          </p>
        </Link>
        <Link href="/sign-up">
          <p
            role="button"
            className="px-5 py-[13px] bg-[#EDF0FB] rounded-[32px] text-duduzili-violet text-[18px] leading-[22px] font-semibold"
          >
            Sign Up
          </p>
        </Link>
      </div>
    </header>
  );
}

export default HeaderUnauthenticated;
