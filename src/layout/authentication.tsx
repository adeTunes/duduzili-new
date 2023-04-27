import { Button, PasswordInput } from "@mantine/core";
import { ReactNode } from "react";

export default function AuthenticationLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const tags = ["Images", "Video", "Audio"];
  const tags2 = ["Text", "Chat"];
  return (
    <main className="flex h-screen">
      <section className="flex-1 flex flex-col h-full py-[100px]">
        <div className="h-[49px] flex justify-center">
          <img src="/logo.png" className="h-full" alt="" />
        </div>
        {children}
      </section>
      <section
        className="h-full flex-1 py-[100px] relative"
        style={{
          backgroundImage: 'url("/authentication/login-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full top-0 absolute bg-[#7060CF] opacity-50"></div>
        <div className="h-full relative flex items-center">
          <div className="w-[52%] z-[9] mx-auto flex flex-col gap-6">
            <h1 className=" text-[48px] leading-[53px] text-white font-bold">
              Enjoy a community-driven space for sharing
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {tags.map((item, id) => (
                  <span
                    key={id}
                    className="rounded-[48px] py-2 px-5 text-white"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {tags2.map((item, id) => (
                  <span
                    key={id}
                    className="rounded-[48px] py-2 px-5 text-white"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 w-[52%] mx-auto flex gap-4">
            <img
              className="w-[130px] "
              src="/authentication/play-store.png"
              alt=""
            />
            <img
              className="w-[130px] "
              src="/authentication/app-store.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </main>
  );
}
