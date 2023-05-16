import React from "react";
import PrimaryButton from "../button/primaryButton";

function SharedStickersModalView({ setActive }) {
  const stickers = [
    {
      name: "Crocs",
      count: 4,
    },
    {
      name: "Butfly",
      count: 5,
    },
    {
      name: "Dragfly",
      count: 3,
    },
    {
      name: "Dragfly",
      count: 2,
    },
    {
      name: "Butfly",
      count: 5,
    },
    {
      name: "Dragfly",
      count: 3,
    },
    {
      name: "Dragfly",
      count: 2,
    },
  ];
  return (
    <>
      <div className="overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {stickers.map((item, idx) => (
            <span
              key={idx}
              className="border border-duduzili-violet px-[10px] py-3 rounded-[32px] text-[10px] text-duduzili-violet leading-3 flex items-center gap-1"
            >
              <small>{item.name}</small>
              <span className="px-1 py-[1px] bg-duduzili-violet rounded-[12px] text-white">
                {item.count}
              </span>
            </span>
          ))}
        </div>
      </div>
      <PrimaryButton
        text="Gift Sticker"
        onClick={() => setActive((v) => v + 1)}
      />
    </>
  );
}

export default SharedStickersModalView;
