import { FileInput, Menu } from "@mantine/core";
import { AudioSquare, Microphone2 } from "iconsax-react";
import React from "react";

function AudioOptions({ opened, setRecordedAudio, setOpened, setAudio, setStart }) {
  return (
    <Menu
      opened={opened}
      onChange={() => {
        setOpened(!opened);
      }}
      shadow="md"
      width={200}
      classNames={{
        item: "!p-0",
        dropdown: "!py-0 !rounded-[24px] !w-[auto] !min-w-fit",
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
        <div className="px-4 py-2 max-[390px]:px-2 max-[390px]:py-1 cursor-pointer rounded-[34px] bg-[#EDF0FB]">
          <AudioSquare
            className="w-6 h-6 max-[390px]:w-4 max-[390px]:h-4"
            color="#4534b8"
            variant="Outline"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <label
            htmlFor="audio-file"
            className="px-4 py-5 max-[390px]:px-2 flex gap-3 items-center cursor-pointer"
          >
            <AudioSquare
              className="w-6 h-6 max-[390px]:w-4 max-[390px]:h-4"
              color="#4534b8"
              variant="Outline"
            />
            <FileInput
              hidden
              className="hidden"
              id="audio-file"
              accept="audio/mp3,audio/wav,audio/ogg,audio/aac,audio/m4a"
              onChange={(value) => {
                setRecordedAudio(null)
                setAudio(value);
              }}
            />
            <p>Upload Audio</p>
          </label>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={() => {
              setAudio(null)
              setRecordedAudio(null)
              setStart(true);
            }}
            type="button"
            id="buttonStart"
            className="px-4 pb-5 max-[390px]:px-2 flex gap-3 items-center cursor-pointer"
          >
            <Microphone2
              className="w-6 h-6 max-[390px]:w-4 max-[390px]:h-4"
              color="#4534b8"
              variant="Outline"
            />
            <p>Record Audio</p>
          </button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default AudioOptions;
