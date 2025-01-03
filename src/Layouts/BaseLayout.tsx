import { Container, Flex } from "@mantine/core";
import { ReactNode } from "react";

export const BaseLayout = ({
  children,
  color,
}: {
  children: ReactNode;
  color?: boolean;
}) => {
  return (
    <Container size={"sm"} h={"100vh"}>
      <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        style={{ backgroundColor: color ? "#f5f" : "" }}
      >
        {children}
      </Flex>
    </Container>
  );
};
