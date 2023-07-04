import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import MobileMenuIcon from "./mobileMenuIcon";
import { useDisclosure } from "@mantine/hooks";
import MobileDrawer from "../mobileDrawer";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";

function HeaderUnauthenticated() {
  const [opened, { open, close }] = useDisclosure(false);
  const user: any = useAtomValue(userDetails);
  return (
    <header className="w-[90%] max-[400px]:w-[95%] mx-auto max-w-[1300px] py-5 flex justify-between items-center">
      <div className="flex items-center gap-4 max-[330px]:gap-2">
        <div
          onClick={open}
          className="w-[45px] h-[45px] hidden max-[500px]:flex max-[330px]:w-[32px] max-[330px]:h-[32px] cursor-pointer rounded-full bg-[#EDF0FB] items-center justify-center"
        >
          <MobileMenuIcon className="w-[25px] max-[330px]:w-[18px] max-[330px]:h-[18px] h-[25px]" />
        </div>
        <Link href="/home">
          <div style={{ height: "clamp(28px, 2.5vw, 49px)" }}>
            <img src="/logo.png" alt="duduzili logo" className="h-full" />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-6 max-[400px]:gap-2">
        <Link href="/login">
          <p
            role="button"
            className="px-5 py-[13px] bg-[#4534B8] rounded-[32px] text-[#fff] text-[18px] leading-[22px] font-semibold"
            style={{
              paddingInline: "clamp(4px, 1.68vw, 20px)",
              paddingBlock: "clamp(2px, 0.98vw, 13px)",
              fontSize: "clamp(12px, 1.55vw, 18px)"
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
              fontSize: "clamp(12px, 1.55vw, 18px)"
            }}
          >
            Sign Up
          </p>
        </Link>
      </div>
      <MobileDrawer opened={opened} close={close} />
    </header>
  );
}

export default HeaderUnauthenticated;
