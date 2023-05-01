import React from "react";
import NotificationSettingsCard from "./notificationSettingsCard";

function NotificationSettingsBox({ settingsArr, boxHeading }) {
  return (
    <>
      <p className="p-[10px] text-[11px] leading-4 opacity-80 text-[#2A2A2A]">
        {boxHeading}
      </p>
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="flex flex-col gap-[25px] px-4 py-6 rounded-lg bg-white"
      >
        {settingsArr.map(({ heading, icon }, idx) => (
          <NotificationSettingsCard key={idx} heading={heading} icon={icon} />
        ))}
      </div>
    </>
  );
}

export default NotificationSettingsBox;
