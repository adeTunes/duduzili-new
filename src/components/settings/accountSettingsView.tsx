import { clsx } from "@mantine/core";
import React from "react";
import SettingsOutlineButton from "./settingsOutlineButton";

function AccountSettingsView(props) {
  const {
    heading,
    headingColor,
    icon,
    subheading,
    buttonText,
    buttonAction,
    buttonColor,
    bg,
  } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            bg ?? "bg-[#F6F5FB]",
            "h-10  flex items-center justify-center w-10 rounded-full"
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={clsx(
              headingColor ?? "text-[#2A2A2A]",
              "text-[12px] font-semibold leading-4"
            )}
          >
            {heading}
          </p>
          <p className="text-[#BDBDBD] text-[11px] leading-4">{subheading}</p>
        </div>
      </div>
      <SettingsOutlineButton
        text={buttonText}
        action={buttonAction}
        color={buttonColor}
      />
    </div>
  );
}

export default AccountSettingsView;
