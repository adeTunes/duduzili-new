import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { AppPropsX } from "../types/next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsX) {
  const GivenLayout = Component.Layout;
  const DefaultLayout = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  const Layout = GivenLayout || DefaultLayout;
  const layoutProps = Component.LayoutProps || {};

  return (
    <div style={{ background: "#FBFBFB" }} className={inter.className}>
      <MantineProvider>
        <Notifications position="top-right" />
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </div>
  );
}
