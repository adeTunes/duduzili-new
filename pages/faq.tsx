import FaqAccordion from "@/components/faq/accordion";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import { ArrowLeft } from "iconsax-react";
import React from "react";

function Faq() {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="bg-[#FBFBFB] h-full flex flex-col gap-[51px] overflow-auto relative max-w-[1180px] pt-[50px] w-[80%] mx-auto">
          <div className="flex items-center gap-10 pl-5">
            <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
            <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
              FAQs
            </p>
          </div>
          <div className="gap-[46px] flex h-full overflow-auto">
            <section id="no-scroll" className="flex-1">
              <div className="h-[378px]">
                <img
                  src="/faq/faq-icon.png"
                  className="w-full h-full object-cover"
                  alt="FAQ image"
                />
              </div>
            </section>
            <aside
              id="no-scroll"
              className="pb-[50px] flex-1 overflow-auto flex flex-col"
            >
              <p className="text-[#2A2A2A] pb-10 border-b border-b-[#EDF0FB] font-bold text-[32px] leading-[38px]">
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
