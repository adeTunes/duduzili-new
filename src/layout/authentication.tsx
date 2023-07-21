import { Button, PasswordInput } from "@mantine/core";
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tags = ["Images", "Video", "Audio"];
  const tags2 = ["Text", "Chat"];
  return (
    <main className="flex h-screen">
      <section
        className="h-full max-[600px]:hidden flex-1 py-[10vh] relative"
        style={{
          backgroundImage: 'url("/authentication/login-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(44.43% 84.94% at 52.99% 50%, #7556F4 0%, #4534B8 100%)",
          }}
          className="h-full w-full top-0 absolute opacity-80"
        ></div>
        <div className="h-full relative flex items-center justify-center">
          <div className="w-fit z-[9] mx-auto flex flex-col gap-6">
            <h1
              style={{ fontSize: "clamp(18px, 3.6vw, 48px)" }}
              className="leading-[53px] max-w-[250px] text-white font-bold"
            >
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
          <div className="absolute bottom-0 left-0 right-0 w-fit mx-auto flex gap-4">
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
      <section className="flex-1 flex flex-col h-full py-[7vh]">
        <div className="h-[49px] flex justify-center">
          <img src="/logo.png" className="h-full" alt="" />
        </div>
        {children}
      </section>
    </main>
  );
}
