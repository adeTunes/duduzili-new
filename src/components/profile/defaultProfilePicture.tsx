import { clsx } from "@mantine/core";
import React from "react";

function DefaultProfilePicture({firstName, text, lastName, className}: {firstName: string, text: string; lastName: string, className?: string}) {
  return (
    <div className={clsx(className, "w-full flex items-center justify-center bg-[#c9c9c9] h-full rounded-full")}>
      <p className={clsx(text, "text-[#223822] tracking-tighter")}>
        {firstName?.[0]} {lastName?.[0]}
      </p>
    </div>
  );
}

export default DefaultProfilePicture;
