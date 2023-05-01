import { clsx } from "@mantine/core";
import React from "react";
import SwithIcon from "./swithIcon";

function NotificationSettingsCard({ icon, heading }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "bg-[#F6F5FB]",
            "h-10  flex items-center justify-center w-10 rounded-full"
          )}
        >
          {icon}
        </div>
        <p
          className={clsx(
            "text-[#2A2A2A]",
            "text-[12px] font-semibold leading-4"
          )}
        >
          {heading}
        </p>
      </div>
      <SwithIcon />
    </div>
  );
}

export default NotificationSettingsCard;
