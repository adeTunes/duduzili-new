import { clsx } from "@mantine/core";
import React, { useState } from "react";

function PostSectionTags() {
  const [selected, setSelected] = useState(0);
  const tags = ["Top", "People I follow", "Based on my interest"];
  return (
    <div className="flex gap-4">
      {tags.map((item, idx) => (
        <p
          key={idx}
          onClick={() => setSelected(idx)}
          className={clsx(
            selected === idx
              ? " bg-duduzili-violet text-white"
              : "text-[#787878]",
            "py-3 px-6 rounded-[32px] cursor-pointer"
          )}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default PostSectionTags;
