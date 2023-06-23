import { LoadingOverlay } from "@mantine/core";

export function Loading({ loading }: { loading: boolean }) {
  return (
    <LoadingOverlay
      loaderProps={{ variant: "oval" }}
      overlayOpacity={0.6}
      overlayColor="#d6d3e5"
      visible={loading}
    />
  );
}
