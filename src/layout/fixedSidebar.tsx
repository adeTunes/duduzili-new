import React, { ReactNode } from "react";

function fixedSidebarLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return <>{children}</>;
}

export default fixedSidebarLayout;
