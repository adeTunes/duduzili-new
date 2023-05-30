import { Icon } from "@iconify/react";
import { Profile2User } from "iconsax-react";
import React from "react";
import { Slider } from "../carousel";
import { useAtomValue, useSetAtom } from "jotai";
import { toggleCommunityPreview, userDetails } from "@/store";
import Link from "next/link";

function CommunityPreview() {
  const showCommunityPreview = useSetAtom(toggleCommunityPreview);
  const user = useAtomValue(userDetails);
  return (
    <div
      className="bg-white p-6 pb-[90px] flex flex-col gap-6 rounded-2xl"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[20px] font-bold">
          <Profile2User size="20" variant="Outline" />
          <p>Communities</p>
        </div>
        <Icon
          icon="material-symbols:close"
          className="cursor-pointer"
          onClick={() => showCommunityPreview(false)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/communities/discover" className="self-end">
          <p className=" font-semibold text-duduzili-violet">View All</p>
        </Link>
        <Slider />
      </div>
    </div>
  );
}

export default CommunityPreview;
