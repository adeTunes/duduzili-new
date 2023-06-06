import React from "react";

function EmptyComponent({
  text,
  className,
  classNames,
}: {
  text: string;
  className?: string;
  classNames?: { root?: string; imageContainer?: string; textContainer?: string };
}) {
  if (classNames) {
    var { root, imageContainer, textContainer } = classNames;
  }
  return (
    <div className={`flex items-center justify-center ${root}`}>
      <div className={`flex items-center flex-col gap-6 ${imageContainer}`}>
        <img
          src="/profile/private-profile.png"
          className="w-[154px] object-cover"
          alt="private account profile illustration"
        />
        <p
          className={`text-black font-medium leading-6 text-center ${textContainer} ${className}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default EmptyComponent;
