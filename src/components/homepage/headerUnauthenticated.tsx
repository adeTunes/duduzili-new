import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function HeaderUnauthenticated() {
  return (
    <header className="w-[90%] max-[400px]:w-[95%] mx-auto max-w-[1300px] py-5 flex justify-between items-center">
      <div style={{height: "clamp(35px, 2.5vw, 49px)"}}>
        <img src="/logo.png" alt="duduzili logo" className="h-full" />
      </div>
      <div className="flex items-center gap-6 max-[400px]:gap-2">
        <Link href="/login">
          <p
            role="button"
            className="px-5 py-[13px] bg-[#4534B8] rounded-[32px] text-[#fff] text-[18px] leading-[22px] font-semibold"
            style={{
              paddingInline: "clamp(4px, 1.68vw, 20px)",
              paddingBlock: "clamp(2px, 0.98vw, 13px)",
              fontSize: "clamp(14px, 1.55vw, 18px)"
            }}
          >
            Sign In
          </p>
        </Link>
        <Link href="/sign-up">
          <p
            role="button"
            className="px-5 py-[13px] bg-[#EDF0FB] rounded-[32px] text-duduzili-violet text-[18px] leading-[22px] font-semibold"
            style={{
              paddingInline: "clamp(4px, 1.68vw, 20px)",
              paddingBlock: "clamp(2px, 0.98vw, 13px)",
              fontSize: "clamp(14px, 1.55vw, 18px)"
            }}
          >
            Sign Up
          </p>
        </Link>
      </div>
    </header>
  );
}

export default HeaderUnauthenticated;
