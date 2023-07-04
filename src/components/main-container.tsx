import { userDetails } from "@/store";
import { clsx } from "@mantine/core";
import { useAtomValue } from "jotai";
import React from "react";

function MainContainer({ children }) {
  const user: any = useAtomValue(userDetails);
  return (
    <main
      className={clsx(
        user?.token && "max-[500px]:pb-[120px]",
        "bg-[#FBFBFB] max-[790px]:w-full h-full overflow-auto relative w-[1131px] justify-between pt-[3vh] gap-[50px] flex"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
