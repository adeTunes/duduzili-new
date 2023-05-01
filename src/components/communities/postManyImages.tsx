import React from "react";

function PostManyImages() {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-2">
      <div className="h-[156px]">
        <img
          src="/homePage/post-image.png"
          className="h-full w-full object-cover rounded-2xl"
          alt="post image"
        />
      </div>
      <div className="h-[156px]">
        <img
          src="/homePage/post-image.png"
          className="h-full w-full object-cover rounded-2xl"
          alt="post image"
        />
      </div>
      <div className="h-[156px]">
        <img
          src="/homePage/post-image.png"
          className="h-full w-full object-cover rounded-2xl"
          alt="post image"
        />
      </div>
      <div className="relative h-[156px] cursor-pointer">
        <div className="absolute rounded-2xl top-0 left-0 bottom-0 right-0 bg-black opacity-40"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <p className="text-white text-[48px] leading-[58px] z-50">+5</p>
        </div>
        <img
          src="/homePage/post-image.png"
          className="h-full w-full object-cover rounded-2xl"
          alt="post image"
        />
      </div>
    </div>
  );
}

export default PostManyImages;
