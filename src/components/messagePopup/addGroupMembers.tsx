import { Icon } from "@iconify/react";
import { TextInput, clsx } from "@mantine/core";
import { Send2 } from "iconsax-react";
import React, { useState } from "react";

function AddGroupMembers({ setAction }) {
  const [selected, setSelected] = useState([]);
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-auto">
      <div className="flex justify-between max-[345px]:mx-2 mx-[14px]">
        <p className="flex items-center gap-4">
          <Icon
            onClick={() => setAction("friend-list")}
            className="cursor-pointer"
            icon="mdi:arrow-left"
            height={25}
            width={25}
          />
          <span className="text-[#2a2a2a] font-bold max-[345px]:text-base text-[18px] leading-[22px]">
            New Message
          </span>
        </p>
        <div className="flex items-center gap-[20px]">
          {/* <div
            onClick={() => setAction("group-chat-view")}
            className={clsx(
              !selected.length && "opacity-40 pointer-events-none",
              "bg-[#4534B8] cursor-pointer h-12 w-12 max-[345px]:w-8 max-[345px]:h-8 rounded-full flex items-center justify-center"
            )}
          >
            <Send2 size="20" color="#FFFFFF" />
          </div> */}
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="cursor-pointer"
            width={28}
            height={28}
          />
        </div>
      </div>
      <p className="text-[#757575] pb-4 border-b mx-[14px] border-b-[#EDF0FB] text-[15px] leading-6">
        Select one or more friends to start a chat.
      </p>
      <div className="flex flex-col gap-4 max-[345px]:mx-3 mx-[30px] overflow-auto">
        <TextInput
          classNames={{
            input:
              "h-[47px] !pl-[48px] placeholder:text-[#757575] bg-[#F4F4F4] rounded-[24px] border-0",
          }}
          className="rounded-[24px] pl-3 bg-[#F4F4F4]"
          placeholder="Search Friend"
          icon={<Icon height={24} width={24} icon="ri:search-line" />}
        />
        <div
          id="no-scroll"
          className="flex-1 overflow-auto flex flex-col gap-4"
        >
          {Array(10)
            .fill(0)
            .map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-[19px]">
                  <div className="w-[52px] h-[52px] max-[345px]:w-10 max-[345px]:h-10">
                    <img
                      src="/profile-pic-default.png"
                      className="w-full h-full object-cover rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="gap-[]2px flex flex-col">
                    <p className="text-[#2A2A2A] font-semibold leading-6">
                      Jane Smith
                    </p>
                    <p className="text-[#757575] text-xs">@frank_dmuller</p>
                  </div>
                </div>
                <button
                  className="bg-[#DFE5FA] text-duduzili-violet py-2 px-4 text-xs font-medium  rounded-[32px]"
                >
                  Select
                </button>
                {/* <button
                  onClick={() => {
                    if (selected.includes(idx)) {
                      setSelected(selected.filter((item) => item !== idx));
                      return;
                    }
                    setSelected([...selected, idx]);
                  }}
                  className={clsx(
                    selected.includes(idx)
                      ? "bg-[#4534B8] text-white"
                      : "bg-[#DFE5FA] text-duduzili-violet",
                    " py-2 px-4 text-xs font-medium  rounded-[32px]"
                  )}
                >
                  {selected.includes(idx) ? (
                    <p className="flex items-center gap-2">
                      Selected
                      <span className="w-[14px] h-[14px] bg-white rounded-full font-semibold text-[10px] leading-4 flex items-center justify-center text-duduzili-violet">
                        {selected.indexOf(idx) + 1}
                      </span>
                    </p>
                  ) : (
                    "Select"
                  )}
                </button> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddGroupMembers;
