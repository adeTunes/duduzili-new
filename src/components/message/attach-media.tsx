import { Icon } from "@iconify/react";
import { FileInput, Menu, clsx } from "@mantine/core";
import React, { Fragment, useState } from "react";

function AttachMedia({ setFile, opened, setOpened }) {
  
  const options = [
    {
      element: (
        <label
          className="border-b  border-b-[#DFE5FA] flex items-center text-[#2A2A2A] whitespace-nowrap py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          style={{ paddingInline: "clamp(10px, 0.5vw, 20px)" }}
          htmlFor="image-file"
        >
          <Icon
            icon="ic:outline-image"
            color="#4534b8"
            width={24}
            height={24}
          />
          <span>Image</span>
          <FileInput
            onChange={(value) => {
              setFile(value);
            }}
            hidden
            id="image-file"
            accept="image/png,image/jpeg"
          />
        </label>
      ),
    },
    {
      element: (
        <label
          style={{ paddingInline: "clamp(10px, 0.5vw, 20px)" }}
          className="border-b border-b-[#DFE5FA] flex items-center text-[#2A2A2A] whitespace-nowrap py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          htmlFor="video-file"
        >
          <Icon
            icon="mdi:video-outline"
            color="#4534b8"
            width={24}
            height={24}
          />
          <span>Video</span>
          <FileInput
            onChange={(value) => {
              setFile(value);
            }}
            hidden
            id="video-file"
            accept="video/mp4"
          />
        </label>
      ),
    },
    {
      element: (
        <label
          style={{ paddingInline: "clamp(10px, 0.5vw, 20px)" }}
          className="border-b border-b-[#DFE5FA] flex items-center text-[#2A2A2A] whitespace-nowrap py-5 cursor-pointer leading-[19px] hover:bg-[#f1f3f5] gap-4"
          htmlFor=""
        >
          <Icon
            icon="ant-design:audio-outlined"
            color="#4534b8"
            width={24}
            height={24}
          />
          <span>Audio</span>
        </label>
      ),
    },
  ];
  return (
    <Menu
      shadow="md"
      width={200}
      opened={opened}
      onChange={() => {
        setOpened(!opened);
      }}
      classNames={{
        item: "!p-0",
        dropdown: "!py-0 !rounded-[24px] !w-[auto] !min-w-[20vw]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
          paddingInline: "clamp(5px, 1vw, 24px) !important",
        },
        item: {
          "&[data-hovered]": {
            background: "none",
            cursor: "default",
          },
        },
      }}
    >
      <Menu.Target>
        <Icon
          height={20}
          color="#4534b8"
          width={20}
          icon="clarity:attachment-line"
          className="relative"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <div className="flex flex-col">
          {options.map((item, idx) => (
            <Fragment key={idx}>{item.element}</Fragment>
          ))}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

export default AttachMedia;
