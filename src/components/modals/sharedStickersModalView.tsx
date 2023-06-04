import React, { useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Sticker, TicketStar } from "iconsax-react";

function SharedStickersModalView({ setActive, stickerUsers, sticker }) {
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
        <div className="flex flex-col gap-2">
          {Object.entries(stickerUsers)?.map(([key, value]: any, index) => (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[19px]">
                <div
                  style={{ height: "32px", width: "32px" }}
                >
                  <img
                    src={value?.profile_pic?.substring(62) ?? "/profile-pic-default.png"}
                    className="h-full w-full object-cover rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[14px] font-medium text-[#222222] leading-[22px]">
                    {value?.full_name}
                  </p>
                  <p className="text-[10px] leading-[18px] text-[#367EE8]">
                    @{value?.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center rounded-[32px] border border-duduzili-violet py-2 px-3 gap-1">
                <TicketStar size={20} color="#4534B8" />
                <p className="py-[1px] text-[10px] leading-3 rounded-xl px-1 bg-duduzili-violet text-white">
                  {value?.stickers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <PrimaryButton
        text="Gift Sticker"
        onClick={() => {
          if (!user?.token) return setOpenAuth(true);
          setActive((v) => v + 1);
        }}
      /> */}
      <UnAuthenticaticatedUserModal opened={openAuth} setOpened={setOpenAuth} />
    </>
  );
}

export default SharedStickersModalView;
