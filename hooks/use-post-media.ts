import React, { useEffect, useState } from "react";

function usePostMedia(postMedia) {
  const [media, setMedia] = useState<{url: string, type: "video" | "audio" | "photo"}[]>([]);

  useEffect(() => {
    if (postMedia) {
      postMedia?.forEach((obj) => {
        setMedia((prev) => [
          ...prev,
          ...Object.entries(obj).reduce((acc, item: any, idx) => {
            if (item.length) {
              const [key, value] = item;
              if (key === "video") {
                acc.push({
                  url: value,
                  type: "video",
                });
              } else if (key === "photo") {
                value.forEach((item) => {
                  acc.push({
                    url: item,
                    type: "photo",
                  });
                });
              } else if (key === "audio") {
                acc.push({
                  url: value,
                  type: "audio",
                });
              }
            }
            return acc;
          }, [])
        ]);
      });
    }
  }, [postMedia]);

  return { media };
}

export default usePostMedia;
