import { amountFormatter } from "@/helpers/amountFormatter";
import { clsx } from "@mantine/core";
import { TicketStar } from "iconsax-react";
import React, { useEffect, useState } from "react";

function StickersList({selected, setSelected, item}) {
    const [amount, setAmount] = useState("")
    useEffect(() => {
        amountFormatter(item.amount, setAmount)
    }, [])
  return (
    <div
      onClick={() => {
        if (selected.includes(item.amount)) {
          const filtered = selected.filter((el) => el !== item.amount);
          setSelected([...filtered]);
        } else setSelected([...selected, item.amount]);
      }}
      className="flex cursor-pointer flex-col gap-1 items-center"
    >
      <div
        className={clsx(
          selected.includes(item.amount) ? "bg-[#4534B8]" : "bg-[#4534b821]",
          "rounded-full h-10 w-10 flex items-center justify-center"
        )}
      >
        <TicketStar
          size="20"
          color={selected.includes(item.amount) ? "#FFFFFF" : "#4534B8"}
        />
      </div>
      <div className="flex flex-col items-center gap-[5px]">
        <p className="text-[10px] leading-3 text-[#2A2A2A]">{item.name}</p>
        <p className="text-duduzili-violet text-[10px] leading-3 font-bold">
          ₦{amount}
        </p>
      </div>
    </div>
  );
}

export default StickersList;
