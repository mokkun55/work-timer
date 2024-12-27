import AuthGuard from "@/features/auth/components/AuthGuard";
import { useUserSettings } from "@/hooks/useUserSettings";
import { BaseLayout } from "@/Layouts/BaseLayout";
import { Button, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Setting = (): React.ReactNode => {
  const [goalTime, setGoalTime] = useState<number>();
  const { updateGoalTime, getGoalTime } = useUserSettings();

  const fetchGoalTime = async () => {
    const goalTime = await getGoalTime();
    if (!goalTime) return;
    setGoalTime(goalTime);
  };

  useEffect(() => {
    fetchGoalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveButtonClick = async () => {
    // 保存処理
    try {
      // 保存処理
      if (goalTime !== undefined) {
        updateGoalTime(goalTime);
      } else {
        toast.error("目標時間を入力してください");
      }
      toast.success("保存しました");
    } catch (error) {
      toast.error("エラーが発生しました");
      console.error(error);
    }
  };

  return (
    <AuthGuard>
      <BaseLayout>
        <h1>設定画面</h1>

        {/* 目標時間設定 */}
        <div>
          <h2>目標時間</h2>
          <p>1週間の目標時間を設定することができます。</p>
          <NumberInput
            mt="md"
            label="目標時間"
            placeholder="例: 5"
            suffix=" 時間"
            min={1}
            value={goalTime || 0}
            onChange={(value) => {
              setGoalTime(Number(value));
            }}
          />
        </div>

        {/* 保存ボタン */}
        <Button mt="md" onClick={handleSaveButtonClick}>
          保存
        </Button>
      </BaseLayout>
    </AuthGuard>
  );
};
