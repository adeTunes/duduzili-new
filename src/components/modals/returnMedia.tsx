import React, { useState, useEffect, useRef } from "react";
import ImageMedia from "../profile/imageMedia";
import { Icon } from "@iconify/react";

function ReturnMedia({ media, selected, setSelected }) {
  function displayUploaded(file) {
    if (file && file.type.includes("image")) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setSource(e.target.result);
      };

      reader.readAsDataURL(file);
    } else if (file && file.type.includes("video")) {
      setSource(URL.createObjectURL(file));
    }
  }

  const [source, setSource] = useState<string | ArrayBuffer>("");

  useEffect(() => {
    if (typeof media?.value === "object") displayUploaded(media?.value);
    else {
      setSource(media?.value );
    }
  }, [media?.value]);
  return media?.value ? (
    media?.type === "image" ? (
      <div className="relative h-[95px] w-[96px] rounded-[6px]">
        <div className="absolute  top-0 right-0 bottom-0 left-0 rounded-[6px] bg-black opacity-30"></div>
        <div
          onClick={() => setSelected(selected.filter((item) => item.value !== media.value))}
          className="h-[12px] absolute top-[3px] cursor-pointer right-[5px] w-[12px] flex items-center justify-center"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "24px",
          }}
        >
          <Icon height={10} width={10} color="white" icon="ic:outline-close" />
        </div>
        <img
          src={source as string}
          className="w-full h-full object-cover rounded-[6px]"
          alt=""
        />
      </div>
    ) : media?.type === "video" ? (
      <div className="relative h-[95px] w-[96px] rounded-[6px]">
        <div className="absolute  top-0 right-0 bottom-0 left-0 rounded-[6px] bg-black opacity-30"></div>
        <div
          onClick={() => setSelected(selected.filter((item) => item.value !== media.value))}
          className="h-[12px] absolute z-10 top-[3px] cursor-pointer right-[5px] w-[12px] flex items-center justify-center"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "24px",
          }}
        >
          <Icon height={10} width={10} color="white" icon="ic:outline-close" />
        </div>
        <video
          src={source as string}
          className="w-full h-full rounded-[6px] object-cover"
          controls
        ></video>
      </div>
    ) : null
  ) : null;
}

export default ReturnMedia;
