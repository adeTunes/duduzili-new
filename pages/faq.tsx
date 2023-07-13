import Back from "@/components/back";
import FaqAccordion from "@/components/faq/accordion";
import FixedMessagesButton from "@/components/homepage/fixedMessagesButton";
import Header from "@/components/homepage/header";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import { userDetails } from "@/store";
import { useAtomValue } from "jotai";
import Head from "next/head";

function Faq() {
  const user: any = useAtomValue(userDetails)
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
        <title>Duduzili | Frequently Asked Questions</title>
      </Head>
      <div className="bg-white">
      {user?.token ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <main className="bg-[#FBFBFB] max-[680px]:w-full h-full pb-[50px] relative flex-col max-w-[1131px] max-[1170px]:min-w-[900px] max-[940px]:min-w-full min-w-[1131px] justify-between pt-[3vh] gap-[3vh] flex">
          <Back text="FAQs" />
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
                style={{ fontSize: "clamp(16px, 1.8vw, 32px)" }}
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
