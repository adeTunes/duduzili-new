import { Menu } from "@mantine/core";
import React from "react";
import { Icon } from "@iconify/react";
import { UseFormReturnType } from "@mantine/form";
import dynamic from 'next/dynamic';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

function EmojiContainer({
  form,
  height
}: {
  height?: number
  form: any
}) {
  return (
    <Menu
      closeOnItemClick={false}
      shadow="md"
      width="fit-content"
      classNames={{
        item: "!p-0",
        dropdown: "!p-0 !rounded-[24px] !w-[auto] !z-[9999]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
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
          icon="ph:smiley-bold"
          color="#4534b8"
          className="cursor-pointer h-6 w-6 max-[390px]:w-4 max-[390px]:h-4"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
        <Picker height={height || 500} width="clamp(240px, 24vw, 400px)" onEmojiClick={e => form.setFieldValue("text", form.values.text + e.emoji)} />
          {/* <Picker
          style={{innerWidth: 250}}
            data={data}
            onEmojiSelect={(value) =>
              form.setFieldValue("text", form.values.text + value.native)
            }
          /> */}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default EmojiContainer;
