import Image from "next/image";
import React from "react";

function DownloadApp() {
  return (
    <div className="p-7 bg-[#4534B8] flex flex-col gap-6 rounded-2xl">
      <p className="text-[#FFFFFF] text-[18px] leading-[22px] text-center">
        Download Duduzili mobile App
      </p>
      <div className="flex justify-between">
        <Image
          className="w-[130px] "
          src="/authentication/play-store.png"
          alt=""
        />
        <Image
          className="w-[130px] "
          src="/authentication/app-store.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default DownloadApp;
