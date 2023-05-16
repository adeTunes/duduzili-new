import "@/styles/globals.css";
import { AppPropsX } from "../types/next";
import { Inter } from "next/font/google";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsX) {
  return (
    <div style={{ background: "#FBFBFB" }} className={inter.className}>
      <Providers Component={Component}>
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}
