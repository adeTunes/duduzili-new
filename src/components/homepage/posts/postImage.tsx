import React from "react";

function PostImage() {
  return (
    <div className="h-[300px]">
      <img
        src="/homePage/post-image.png"
        className="h-full w-full object-cover rounded-2xl"
        alt="post image"
      />
    </div>
  );
}

export default PostImage;
