import { Button, Tabs } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { WorkingModal } from "../workingModal";
import { BaseInput } from "@/components/baseInput";
import useWorkStore from "@/store/useWorkStore";
import useWorkContentStore from "@/store/useWorkContentStore";
import useTimerStore from "@/store/useTimerStore";
import { useState } from "react";
import useTimeFormatter from "@/hooks/useTimeFormatter";

export const Form = (): React.ReactNode => {
  const { startWork, endWork } = useWorkStore();
  const { workContent, setWorkContent } = useWorkContentStore();
  const { startTimer, resetTimer, elapsedTime } = useTimerStore();
  const { perseTime } = useTimeFormatter();

  const [inputTime, setInputTime] = useState<string>("");

  // 作業開始処理
  const handleStartButtonClick = () => {
    // TODO 後々トーストにしたい
    if (!workContent) {
      alert("作業内容を入力してください");
      return;
    }
    startWork();
    startTimer();
  };

  // 作業終了処理
  const handleEndWorkButtonClick = () => {
    endWork();
    // TODO DBに時間を記録 -> hooksとかで共通化
    console.log(
      `作業内容 "${workContent}" で、"${elapsedTime}" 秒 作業しました！`
    );
    resetTimer();
    setWorkContent("");
  };

  // フォーム記録の方での記録処理
  const handleSubmitButtonClick = () => {
    const time = perseTime(inputTime);
    // TODO DBに時間を記録 -> hooksとかで共通化
    console.log(`作業内容 "${workContent}" で、"${time}" 秒 作業しました！`);
    setWorkContent("");
    setInputTime("");
  };

  return (
    <div>
      <Tabs variant="outline" defaultValue="oneClick">
        <Tabs.List>
          <Tabs.Tab value="oneClick">作業を始める</Tabs.Tab>
          <Tabs.Tab value="form">後から記録</Tabs.Tab>
        </Tabs.List>

        {/* ワンクリック記録 */}
        <Tabs.Panel value="oneClick">
          <WorkingModal onClose={handleEndWorkButtonClick} />
          <div>
            <BaseInput
              label={"作業内容を入力"}
              value={workContent}
              onChange={(e) => setWorkContent(e.target.value)}
              isRequired
            />
            <Button onClick={handleStartButtonClick}>開始</Button>
          </div>
        </Tabs.Panel>

        {/* フォーム記録 */}
        <Tabs.Panel value="form">
          <div>
            <BaseInput
              label="作業内容を入力"
              value={workContent}
              onChange={(e) => setWorkContent(e.target.value)}
              isRequired
            />
            <TimeInput
              label="作業時間を入力"
              withAsterisk
              value={inputTime}
              onChange={(e) => setInputTime(e.currentTarget.value)}
            />
            <Button onClick={handleSubmitButtonClick}>記録する</Button>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
