import { TextInput } from "@mantine/core";
import { ArrowLeft } from "iconsax-react";
import React from "react";
import MessageCard from "./messageCard";
import { Icon } from "@iconify/react";
import { useSetAtom } from "jotai";
import { selectedMessage } from "@/store";
import { useRouter } from "next/router";

function MessagesView({ children }) {
  const { back } = useRouter();
  return (
    <section className="w-[45%] overflow-auto max-w-[506px] flex flex-col gap-[32px]">
      <div className="flex items-center gap-10">
        <ArrowLeft
          className="cursor-pointer"
          onClick={back}
          size="32"
          color="#2A2A2A"
          variant="Outline"
        />
        <p className="text-[#2A2A2A] leading-[29px] text-[24px] font-bold">
          Messages
        </p>
      </div>
      {children}
    </section>
  );
}

export default MessagesView;
