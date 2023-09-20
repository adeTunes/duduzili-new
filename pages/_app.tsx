import "@/styles/globals.css";
import { AppPropsX } from "../types/next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteProgress from "@/components/route-progress";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsX) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="social media app, duduzili, chat, authentic expression, diverse opinions, censorship-free, connecting people, ideas sharing, dialogue, empowering creators, user-generated content"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <title>Duduzili</title>
      </Head>
      <div style={{ background: "#FBFBFB" }} className={inter.className}>
        <Providers Component={Component}>
          <ToastContainer />
          <RouteProgress />
          <Component {...pageProps} />
        </Providers>
      </div>
    </>
  );
}
