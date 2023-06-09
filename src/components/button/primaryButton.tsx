import React from "react";

function PrimaryButton({
  text,
  className,
  onClick,
  style,
  ...rest
}: {
  text: string | React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  rest?: { [key: string]: any };
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      type="submit"
      className={`py-4 px-6 bg-duduzili-violet rounded-[32px] text-base font-medium leading-[19px] text-white ${className || ""}`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
