import { Menu } from "@mantine/core";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import React from "react";
import { Icon } from "@iconify/react";
import { UseFormReturnType } from "@mantine/form";

function EmojiContainer({
  form,
}: {
  form: UseFormReturnType<
    {
      text: string;
    },
    (values: { text: string }) => {
      text: string;
    }
  >;
}) {
  return (
    <Menu
      closeOnItemClick={false}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-6 !px-8 !rounded-[24px] !w-[auto] !min-w-[25vw]",
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
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Picker
            data={data}
            onEmojiSelect={(value) =>
              form.setFieldValue("text", form.values.text + value.native)
            }
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default EmojiContainer;
