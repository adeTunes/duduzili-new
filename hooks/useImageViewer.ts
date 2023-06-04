import React, { useEffect, useState } from "react";

function useImageViewer(post) {
  const [viewerData, setViewerData] = useState([]);

  useEffect(() => {
    setViewerData(
      Object.entries(post?.media).reduce((acc, [key, value]: any, idx) => {
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
        }
        return acc;
      }, [])
    );
  }, []);
  return {viewerData};
}

export default useImageViewer;
