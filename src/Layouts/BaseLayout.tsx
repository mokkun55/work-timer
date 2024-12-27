import { Container, Flex } from "@mantine/core";
import { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container size={"lg"} h={"100vh"}>
      <Flex direction={"column"} gap={"md"} justify={"center"} align={"center"}>
        {children}
      </Flex>
    </Container>
  );
};
