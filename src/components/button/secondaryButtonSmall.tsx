import React from "react";

function SecondaryButtonSmall({
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
      className={`py-2 px-4 bg-[#367EE8] rounded-[32px] text-base font-medium leading-[19px] text-white ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default SecondaryButtonSmall;
