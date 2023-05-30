import React, { useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";

function SharedStickersModalView({ setActive, sticker }) {
  const user: any = useAtomValue(userDetails);
  const stickers = {
    "15000": "Crocs",
    "200": "Butfly",
    "500": "Dragfly",
    "1000": "Turk",
    "1500": "Pcock",
    "2500": "Jagr",
    "3000": "Leop",
    "5000": "Tigr",
    "10000": "Pand",
    "20000": "Drag",
    "50000": "Lyon",
    "100000": "Eleph",
  };

  const [openAuth, setOpenAuth] = useState(false);
  return (
    <>
      <div className="overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {sticker.map((item, idx) => (
            <span
              key={idx}
              className="border border-duduzili-violet px-[10px] py-3 rounded-[32px] text-[10px] text-duduzili-violet leading-3 flex items-center gap-1"
            >
              <small>{stickers[sticker]}</small>
              <span className="px-1 py-[1px] bg-duduzili-violet rounded-[12px] text-white">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
      <PrimaryButton
        text="Gift Sticker"
        onClick={() => {
          if (!user?.token) return setOpenAuth(true);
          setActive((v) => v + 1);
        }}
      />
      <UnAuthenticaticatedUserModal opened={openAuth} setOpened={setOpenAuth} />
    </>
  );
}

export default SharedStickersModalView;
