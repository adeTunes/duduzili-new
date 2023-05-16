import React from "react";

function PrimaryButtonSmall({
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
      className={`py-2 px-4 bg-duduzili-violet rounded-[32px] text-base font-medium leading-[19px] text-white ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default PrimaryButtonSmall;
