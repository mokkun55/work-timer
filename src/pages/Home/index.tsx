import { Button, Container, Flex, Grid } from "@mantine/core";
import { Form } from "@/features/input/components/form";
import { RecodeList } from "@/features/record/list";
import { Progress } from "@/features/progress";
import AuthGuard from "@/features/auth/components/AuthGuard";

export const Home = (): React.ReactNode => {
  return (
    <AuthGuard>
      <Container size="lg" h="100vh">
        <Flex direction="column" gap="md" justify="center" align="center">
          <Grid grow h="400px">
            {/* 現在の進捗 */}
            <Flex direction="row">
              <Grid.Col span={4}>
                <Progress />
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
    </AuthGuard>
  );
};
