import React from "react";

function SettingsOutlineButton({
  color,
  text,
  action,
}: {
  color: string;
  text: string;
  action?: any;
}) {
  return (
    <div
      role="button"
      onClick={action}
      style={{ color, border: `1px solid ${color}` }}
      className="px-4 py-2 rounded-[32px] text-[12px] leading-[15px]"
    >
      {text}
    </div>
  );
}

export default SettingsOutlineButton;
