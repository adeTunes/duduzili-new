import React from "react";

function PrimaryButtonOutlineLarge({
  text,
  className,
  onClick,
  style,
  ...rest
}: {
  text: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  rest?: { [key: string]: any };
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`py-5 px-6 bg-[#EDF0FB] rounded-[32px] text-base font-semibold leading-[19px] text-duduzili-violet ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default PrimaryButtonOutlineLarge;
