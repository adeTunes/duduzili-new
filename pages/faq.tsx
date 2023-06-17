import FaqAccordion from "@/components/faq/accordion";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Faq() {
  const { back } = useRouter();
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] h-full flex flex-col gap-[3vh] overflow-auto relative max-w-[1180px] pt-[3vh]">
          <div
            onClick={back}
            className="flex cursor-pointer items-center gap-[2.5vw] pl-5"
          >
            <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 24px)",
              }}
              className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold"
            >
              FAQs
            </p>
          </div>
          <div className="gap-[46px] flex h-full overflow-auto">
            <section id="no-scroll" className="flex-1 max-[740px]:hidden">
              <div className="h-[378px] max-[900px]:w-full">
                <img
                  src="/faq/faq-icon.png"
                  className="w-full h-full object-cover"
                  alt="FAQ image"
                />
              </div>
            </section>
            <aside
              id="no-scroll"
              className="pb-[80px] flex-1 overflow-auto flex flex-col"
            >
              <p
                style={{ fontSize: "clamp(18px, 1.8vw, 32px)" }}
                className="text-[#2A2A2A] pb-[2.7vw] border-b border-b-[#EDF0FB] font-bold text-[32px] leading-[38px]"
              >
                Frequently Asked Questions
              </p>
              <FaqAccordion />
            </aside>
          </div>
          <FixedMessagesButton />
        </main>
      </div>
    </div>
  );
}

export default Faq;
