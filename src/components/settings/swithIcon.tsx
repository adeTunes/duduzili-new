import { clsx } from "@mantine/core";
import React from "react";

function SwithIcon({
  onClick,
  active,
}: {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  active: boolean;
}) {
  return (
    <span
      onClick={onClick}
      className=" flex items-end justify-center cursor-pointer"
    >
      <div
        className={clsx("bg-[#C1C2C6]", "h-6 rounded-[30px]  w-11 relative")}
      >
        <div
          className={clsx(
            active ? "bg-[#076D3A] left-[unset]" : "bg-white left-0",
            " absolute m-[2px] right-0 h-5 w-5 rounded-full"
          )}
        ></div>
      </div>
    </span>
  );
}

export default SwithIcon;
