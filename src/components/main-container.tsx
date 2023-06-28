import React from "react";

function MainContainer({ children }) {
  return (
    <main className="bg-[#FBFBFB] max-[500px]:pb-[120px] max-[790px]:w-full h-full overflow-auto relative w-[1131px] justify-between pt-[3vh] gap-[50px] flex">
      {children}
    </main>
  );
}

export default MainContainer;
