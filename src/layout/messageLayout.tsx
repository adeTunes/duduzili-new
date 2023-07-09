import Header from "@/components/homepage/header";
import { ReactNode } from "react";
import Back from "@/components/back";
import MainContainer from "@/components/main-container";
import dynamic from "next/dynamic";

const MessageBox = dynamic(() => import("./messageBox"), { ssr: false });

const MessageLayout = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { boxType } = props;

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="bg-white">
        <Header />
      </div>
      <div className="flex-1 mx-5 max-[315px]:mx-2 overflow-auto flex justify-center">
        <MainContainer>
          <section className="w-[45%] max-[800px]:min-w-full max-[800px]:max-w-full min-w-[330px] overflow-auto max-w-[506px] flex flex-col gap-[3.5vh]">
            <div className="flex items-center justify-between">
              <Back text="Messages" />
              {/* <HambergerMenu className="cursor-pointer max-[800px]:inline-block hidden" onClick={open} size={24} /> */}
            </div>
            {children}
          </section>
          <MessageBox boxType={boxType} />
        </MainContainer>
      </div>
    </div>
  );
};
export default MessageLayout;
