import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

function Back({text}) {
    const {back} = useRouter()
  return (
    <div
      onClick={back}
      className="flex cursor-pointer items-center gap-[2.5vw]"
    >
      <ArrowLeft size="32" color="#2A2A2A" variant="Outline" />
      <p
        style={{
          fontSize: "clamp(15px, 1.3vw, 24px)",
        }}
        className="text-[#2A2A2A] leading-[29px] font-bold"
      >
        {text}
      </p>
    </div>
  );
}

export default Back;
