import { clsx } from "@mantine/core";
import { TicketStar } from "iconsax-react";
import React, { useState } from "react";
import PrimaryButtonLarge from "../button/primaryButtonLarge";

function SelectStickerViewModal() {
  const availableStickers = [
    {
      name: "Butfly",
      amount: "₦200",
    },
    {
      name: "Dragfly",
      amount: "₦500",
    },
    {
      name: "Turk",
      amount: "₦1000",
    },
    {
      name: "Pcock",
      amount: "₦1500",
    },
    {
      name: "Hyna",
      amount: "₦2500",
    },
    {
      name: "Leop",
      amount: "₦3000",
    },
    {
      name: "Tigr",
      amount: "₦5000",
    },
    {
      name: "Pand",
      amount: "₦1000",
    },
  ];
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="overflow-auto">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
          }}
          className="grid gap-10"
        >
          {availableStickers.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(idx)}
              className="flex cursor-pointer flex-col gap-1 items-center"
            >
              <div
                className={clsx(
                  selected === idx ? "bg-[#4534B8]" : "bg-[#4534b821]",
                  "rounded-full h-10 w-10 flex items-center justify-center"
                )}
              >
                <TicketStar
                  size="20"
                  color={selected === idx ? "#FFFFFF" : "#4534B8"}
                />
              </div>
              <div className="flex flex-col items-center gap-[5px]">
                <p className="text-[10px] leading-3 text-[#2A2A2A]">
                  {item.name}
                </p>
                <p className="text-duduzili-violet text-[10px] leading-3 font-bold">
                  {item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrimaryButtonLarge
        text="Proceed"
        className={clsx(
          !selected && "opacity-20 pointer-events-none",
          "mt-[30px]"
        )}
        onClick={() => {}}
      />
    </>
  );
}

export default SelectStickerViewModal;
