import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";
import { ModalsProvider } from "@mantine/modals";

function Providers({ children, Component }) {
  const GivenLayout = Component.Layout;
  const DefaultLayout = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  const Layout = GivenLayout || DefaultLayout;
  const layoutProps = Component.LayoutProps || {};
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ModalsProvider>
          <Notifications position="top-right" />
          <Layout {...layoutProps}>{children}</Layout>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
