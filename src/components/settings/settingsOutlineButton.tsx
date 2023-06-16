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
      style={{ color, paddingInline: "clamp(10px, 1vw, 16px)", border: `1px solid ${color}` }}
      className="whitespace-nowrap max-[400px]:ml-[56px] py-2 rounded-[32px] text-[12px] leading-[15px]"
    >
      {text}
    </div>
  );
}

export default SettingsOutlineButton;
