import { Button, Tabs } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { BaseInput } from "@/components/baseInput";
import { useState } from "react";
import styles from "./index.module.scss";
import { WorkingModal } from "../workingModal";
import useTimeFormatter from "@/hooks/useTimeFormatter";
import { useRecordWorkTime } from "@/hooks/useRecordWorkTime";
import { useWeekNumber } from "@/hooks/useWeekNumber";
import toast from "react-hot-toast";

export const Form = (): React.ReactNode => {
  const { perseTime } = useTimeFormatter();
  const [inputTime, setInputTime] = useState<string>("");
  const [workContent, setWorkContent] = useState<string>("");
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const { writeRecordTime } = useRecordWorkTime();
  const { getNowWeekNumber } = useWeekNumber();

  // 作業開始処理
  const handleStartButtonClick = () => {
    if (!workContent) {
      toast.error("作業内容を入力してください");
      return;
    }

    setIsWorking(true);
  };

  // フォーム記録の方での記録処理
  const handleSubmitButtonClick = () => {
    if (!workContent) {
      toast.error("作業内容を入力してください");
      return;
    }

    if (!inputTime) {
      toast.error("作業時間を入力してください");
      return;
    }

    writeRecordTime({
      content: workContent,
      duration: perseTime(inputTime),
      week: getNowWeekNumber(),
    });

    toast("作業を記録しました", {
      icon: "🎉",
    });

    setInputTime("");
  };

  return (
    <div className={styles.container}>
      <Tabs variant="outline" defaultValue="oneClick">
        <Tabs.List className={styles.tabList}>
          <Tabs.Tab value="oneClick">作業を始める</Tabs.Tab>
          <Tabs.Tab value="form">後から記録</Tabs.Tab>
        </Tabs.List>

        {/* ワンクリック記録 */}
        <Tabs.Panel value="oneClick">
          <WorkingModal
            onClose={close}
            isWorking={isWorking}
            setIsWorking={setIsWorking}
            workContent={workContent}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartButtonClick();
            }}
          >
            <BaseInput
              label={"作業内容を入力"}
              value={workContent}
              onChange={(e) => setWorkContent(e.target.value)}
              isRequired
            />
            <Button type="submit" className={styles.button}>
              開始
            </Button>
          </form>
        </Tabs.Panel>

        {/* フォーム記録 */}
        <Tabs.Panel value="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitButtonClick();
            }}
          >
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
            <Button type="submit" className={styles.button}>
              記録する
            </Button>
          </form>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
