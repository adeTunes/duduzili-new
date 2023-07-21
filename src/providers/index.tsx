import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";
import { ModalsProvider } from "@mantine/modals";
import { CookiesProvider } from "react-cookie";

function Providers({ children, Component }) {
  const GivenLayout = Component.Layout;
  const DefaultLayout = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  const Layout = GivenLayout || DefaultLayout;
  const layoutProps = Component.LayoutProps || {};
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications position="top-right" />
        <CookiesProvider>
          <Layout {...layoutProps}>{children}</Layout>
        </CookiesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default Providers;
