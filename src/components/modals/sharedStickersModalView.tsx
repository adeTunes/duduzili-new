import React, { useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { useAtomValue } from "jotai";
import { userDetails } from "@/store";
import { UnAuthenticaticatedUserModal } from "@/components/modals/unAuthenticatedUserModal";
import UserAvatarWithName from "../profile/userAvatarWithName";
import { Sticker, TicketStar } from "iconsax-react";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

function SharedStickersModalView({ setActive, stickerUsers, sticker }) {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <>
      <div className="overflow-auto">
        <div className="flex flex-col gap-2">
          {Object.entries(stickerUsers)?.map(([key, value]: any, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-[19px]">
                <div style={{ height: "32px", width: "32px" }}>
                  {value?.profile_pic ? (
                    <img
                      src={value?.profile_pic?.substring(62)}
                      className="h-full w-full object-cover rounded-full"
                      alt=""
                    />
                  ) : (
                    <DefaultProfilePicture
                      text="text-[80%]"
                      firstName={value?.full_name?.split(" ")?.[0]}
                      lastName={value?.full_name?.split(" ")?.[1]}
                    />
                  )}
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
