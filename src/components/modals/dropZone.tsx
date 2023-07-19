import { Icon } from "@iconify/react";
import { clsx, Group, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import React, {
  CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAtom, useSetAtom } from "jotai";

function DropPictureZone({image, setImage}) {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const imageRef = useRef(null);

  function displayImage(file) {
    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setSource(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  const [source, setSource] = useState<string | ArrayBuffer>("");

  useEffect(() => {
    if (typeof image === "object") displayImage(image);
    else setSource(image as any);
  }, [image]);

  return (
    <Dropzone
      onDrop={(files) => setImage(files[0])}
      onReject={(files) => {}}
      // maxSize={100}
      accept={IMAGE_MIME_TYPE}
      openRef={openRef}
      classNames={{
        root: "rounded-lg w-full border border-dashed !border-[#DADADD] !border-opacity-50 !bg-[#ebeefc] !bg-opacity-5",
        inner: clsx(
          image ? "flex flex-col gap-2 justify-center items-center" : ""
        ),
      }}
    >
      {image ? (
        <>
          <img
            src={source as string}
            className="rounded-[11px] w-[175px] h-[175px] object-cover"
            alt=""
          />
          <p className="flex items-center dark:text-[#8F9198] gap-2 text-xds-primary-90%">
            {image?.name}
            <span className="flex dark:text-[#8F9198] text-xds-primary-30% items-center gap-1">
              <Icon icon="bi:dot" />
              {typeof image === "object" &&
                image &&
                (image?.size / 1000000).toFixed(2) + "MB"}
            </span>
          </p>
        </>
      ) : (
        <Group
          position="center"
          spacing="xl"
          style={{
            minHeight: 40,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <Dropzone.Accept>
            <IconUpload
              // size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              // size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <div className="flex gap-2 items-center border-dashed border-xds-eneutral-5">
              <img src="/communities/cloud-cross.png" width={20} />
              <div className="text-[15px] leading-6 text-[#757575]">
                Drop file to attach or{" "}
                <span
                  className=" text-duduzili-blue"
                  onClick={() => openRef.current()}
                >
                  browser
                </span>
              </div>
            </div>
          </Dropzone.Idle>
        </Group>
      )}
    </Dropzone>
  );
}

export default DropPictureZone;
