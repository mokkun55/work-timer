import {
  Button,
  Center,
  Container,
  Flex,
  Grid,
  RingProgress,
} from "@mantine/core";
import { Form } from "@/features/input/components/form";
import { RecodeList } from "@/features/record/list";

export const Home = (): React.ReactNode => {
  return (
    <Container size="lg" h="100vh">
      <Flex direction="column" gap="md" justify="center" align="center">
        <Grid grow h="400px">
          {/* 現在の進捗 */}
          <Flex direction="row">
            <Grid.Col span={4}>
              <Flex direction="column" gap="md" justify="center" align="center">
                <h2>今週の進捗</h2>
                <RingProgress
                  size={250}
                  thickness={15}
                  roundCaps
                  sections={[{ value: 40, color: "blue" }]}
                  transitionDuration={700}
                  label={
                    <Center>
                      <div>
                        <h1 style={{ margin: "0" }}>40%</h1>
                        <h1 style={{ margin: "0" }}>5h/16h</h1>
                        <h1 style={{ margin: "0" }}>あと11h</h1>
                      </div>
                    </Center>
                  }
                />
              </Flex>
            </Grid.Col>

            {/* 最近の記録 */}
            <Grid.Col span={8}>
              <RecodeList />
            </Grid.Col>
          </Flex>
        </Grid>

        {/* 記録フォーム */}
        <div>
          <Form />
        </div>

        {/* 設定画面へ */}
        <div>
          <Flex direction="column" gap="md" justify="center" align="center">
            <Button variant="light">設定画面へ</Button>
          </Flex>
        </div>
      </Flex>
    </Container>
  );
};
