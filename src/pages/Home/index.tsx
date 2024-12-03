import {
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Input,
  RingProgress,
} from "@mantine/core";

export const Home = (): React.ReactNode => {
  return (
    <Container size="lg" h="100vh" bg="#EAF3FD">
      <Flex direction="column" gap="md" justify="center" align="center">
        <Grid grow>
          {/* 現在の進捗 */}
          <Flex direction="row">
            <Grid.Col span={4}>
              <Flex direction="column" gap="md" justify="center" align="center">
                <h2>今週の進捗</h2>
                {/* TODO アニメーションとかいいかも */}
                <RingProgress
                  size={300}
                  thickness={15}
                  roundCaps
                  sections={[{ value: 40, color: "blue" }]}
                  transitionDuration={700}
                  // taは aligned center
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
              <h2>今週の記録</h2>
              {/* TODO 縦横 はみ出したら... 表示 */}
              <p>11/11(月) : 3h ホームページの制作</p>
              <p>11/12(月) : 2h コードレビュー</p>
              <p>11/13(月) : 0.5h デザインの修正</p>
              <p>11/13(月) : 0.5h デザインの修正</p>
              <p>11/13(月) : 0.5h デザインの修正</p>
              <p>11/13(月) : 0.5h デザインの修正</p>
              <p>11/13(月) : 0.5h デザインの修正</p>
            </Grid.Col>
          </Flex>
        </Grid>

        {/* 記録フォーム */}
        <div>
          <Flex direction="column" gap="md" justify="center" align="center">
            <h2>記録フォーム</h2>
            {/* TODO 仮置き */}
            <Input />
            <Input />
            <Button>完了</Button>
            <Button>過去の記録を見る</Button>
          </Flex>
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
