import React from "react";

function MessageBox({ boxType }) {
  if (window.innerWidth <= 800) {
    return <></>;
  }
  return (
    <aside className="w-[55%] max-[800px]:hidden overflow-auto max-w-[557px] flex flex-col gap-6">
      <div className="flex overflow-auto h-full flex-col gap-6">
        {/* <div className="max-[800px]:hidden justify-between flex">
        {tabs.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <p
              role="button"
              className={clsx(
                pathname.includes(item.href)
                  ? "bg-duduzili-violet text-white font-semibold"
                  : "bg-[#EDF0FB] text-[#2A2A2A]",
                "px-[4vw] max-[400px]:text-[14px] whitespace-nowrap py-2 rounded-[40px] leading-6"
              )}
              style={{ paddingInline: "clamp(12px, 3vw, 50px)" }}
            >
              {item.text}
            </p>
          </Link>
        ))}
      </div> */}
        {boxType}
      </div>
    </aside>
  );
}

export default MessageBox;
