import "@/styles/globals.css";
import { AppPropsX } from "../types/next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsX) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          name="keywords"
          content="social media app, duduzili, chat, authentic expression, diverse opinions, censorship-free, connecting people, ideas sharing, dialogue, empowering creators, user-generated content"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
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
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`} />
        <title>Duduzili</title>
      </Head>
      <div style={{ background: "#FBFBFB" }} className={inter.className}>
        <Providers Component={Component}>
          <Component {...pageProps} />
        </Providers>
      </div>
    </>
  );
}
