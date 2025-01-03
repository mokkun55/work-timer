import { Button, Flex } from "@mantine/core";
import { Form } from "@/features/input/components/form";
import { RecodeList } from "@/features/record/list";
import { Progress } from "@/features/progress";
import AuthGuard from "@/features/auth/components/AuthGuard";
import { useNavigate } from "react-router";
import { BaseLayout } from "@/Layouts/BaseLayout";
import { useState } from "react";

export const Home = (): React.ReactNode => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <AuthGuard>
      <BaseLayout>
        <Flex direction="column" justify="center" align="center">
          {/* 現在の進捗 */}
          <Flex direction="row">
            <div>
              <Progress refresh={refresh} />
            </div>

            {/* 最近の記録 */}
            <div>
              <RecodeList refresh={refresh} />
            </div>
          </Flex>
        </Flex>

        {/* 記録フォーム */}
        <div style={{ width: "80%" }}>
          <Form setRefresh={setRefresh} />
        </div>

        {/* 設定画面へ */}
        <div>
          <Flex direction="column" gap="md" justify="center" align="center">
            <Button variant="light" onClick={() => navigate("/setting")}>
              設定画面へ
            </Button>
          </Flex>
        </div>

        {/* 開発画面へ */}
        <div>
          <Flex direction="column" gap="md" justify="center" align="center">
            <Button
              variant="light"
              color="red"
              onClick={() => navigate("/dev")}
            >
              開発画面へ
            </Button>
          </Flex>
        </div>
      </BaseLayout>
    </AuthGuard>
  );
};
