// import useTimeFormatter from "@/hooks/useTimeFormatter";
import { Button, Container, FocusTrap, Modal, Progress } from "@mantine/core";
import styles from "./index.module.scss";
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import useTimeFormatter from "@/hooks/useTimeFormatter";
import { useRecordWorkTime } from "@/hooks/useRecordWorkTime";
import { useWeekNumber } from "@/hooks/useWeekNumber";

type Props = {
  onClose: () => void;
  isWorking: boolean;
  setIsWorking: (isWorking: boolean) => void;
  workContent: string;
};

export const WorkingModal = ({
  onClose,
  isWorking,
  setIsWorking,
  workContent,
}: Props): React.ReactNode => {
  const [isBreak, setIsBreak] = useState<boolean>(false);
  // 時間は秒で扱う
  const { formatTime } = useTimeFormatter();
  const [time, setTime] = useState<number>(0);
  const { writeRecordTime } = useRecordWorkTime();
  const { getNowWeekNumber } = useWeekNumber();

  useEffect(() => {
    if (isWorking && !isBreak) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isWorking, isBreak]);

  // 休憩ボタンが押されたとき
  const handleBreakButtonClick = () => {
    setIsBreak(!isBreak);
  };

  const handleCloseButtonClick = () => {
    // TODO DBに時間を記録 -> hooksとかで共通化
    writeRecordTime({
      content: workContent,
      duration: time,
      week: getNowWeekNumber(),
    });

    // TODO トーストで完了みたいな表示がほしい

    setTime(0);
    setIsWorking(false);
    onClose();
    setIsBreak(false);
  };

  // TODO ページを離れようとすると警告
  if (isWorking) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = null;
  }

  // TODO レンダリング最適化する！！ 毎秒再レンダリング走ってる!!
  return (
    <Modal
      opened={isWorking}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
      autoFocus={false}
    >
      <FocusTrap.InitialFocus />
      <Container
        size="lg"
        className={styles.container}
        bg={isBreak ? "#FFF9CC" : "#D9EAFB"}
      >
        <div className={styles.working}>
          {isBreak ? "休憩中" : "作業中"}:
          <div className={styles.inputArea}>
            <input type="text" value={workContent} className={styles.input} />
            <MdModeEdit className={styles.icon} />
          </div>
        </div>
        {/* TODO 円の中今はモック */}
        <div className={styles.progressArea}>
          <h2 className={styles.title}>今週の進捗</h2>
          <p className={styles.time}>11h / 16h</p>
        </div>
        <Progress value={40} size="xl" radius="xl" />

        <p className={styles.time}>{formatTime(time, true)}</p>

        <div className={styles.buttonArea}>
          <Button
            color={!isBreak ? "orange" : "blue"}
            onClick={handleBreakButtonClick}
            className={styles.button}
          >
            {!isBreak ? "休憩する" : "再開する"}
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleCloseButtonClick();
            }}
            className={styles.button}
          >
            作業を終了する
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
