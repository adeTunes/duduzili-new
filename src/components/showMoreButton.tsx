import React from "react";

function ShowMoreButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}) {
  return (
    <p
      onClick={onClick}
      role="button"
      className="py-3 rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
    >
      Show more
    </p>
  );
}

export default ShowMoreButton;
