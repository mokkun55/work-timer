import { LoadingOverlay, Box } from "@mantine/core";

export const Loading = () => {
  return (
    <Box pos="relative" style={{ height: "100vh" }}>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
