import { Button, Container, FocusTrap, Modal } from "@mantine/core";
import styles from "./index.module.scss";
import { MdModeEdit } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import useTimeFormatter from "@/hooks/useTimeFormatter";
import { useRecordWorkTime } from "@/hooks/useRecordWorkTime";
import { useWeekNumber } from "@/hooks/useWeekNumber";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  isWorking: boolean;
  setIsWorking: (isWorking: boolean) => void;
  workContent: string;
  setWorkContent: (workContent: string) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkingModal = ({
  onClose,
  isWorking,
  setIsWorking,
  workContent,
  setWorkContent,
  setRefresh,
}: Props): React.ReactNode => {
  const [isBreak, setIsBreak] = useState<boolean>(false);
  // 時間は秒で扱う
  const { formatTime } = useTimeFormatter();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [breakTime, setBreakTime] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const { writeRecordTime } = useRecordWorkTime();
  const { getNowWeekNumber } = useWeekNumber();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isWorking && !isBreak) {
      const currentStartTime = startTime ? startTime : Date.now();
      setStartTime(currentStartTime);
      interval = setInterval(() => {
        if (currentStartTime) {
          setTime(
            Math.floor((Date.now() - currentStartTime) / 1000) + breakTime
          );
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isWorking, isBreak, startTime, breakTime]);

  // 休憩ボタンが押されたとき
  const handleBreakButtonClick = () => {
    if (!isBreak) {
      setBreakTime(time);
    } else {
      setStartTime(Date.now());
    }
    setIsBreak(!isBreak);
  };

  // 終了ボタンが押されたとき
  const handleCloseButtonClick = () => {
    writeRecordTime({
      content: workContent,
      duration: time,
      week: getNowWeekNumber(),
    });

    toast("記録しました", {
      icon: "🎉",
    });

    setTime(0);
    setIsWorking(false);
    setWorkContent("");
    onClose();
    setIsBreak(false);
    setRefresh((prev) => !prev);
  };

  if (isWorking) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = null;
  }

  const formattedTime = useMemo(
    () => formatTime(time, true),
    [time, formatTime]
  );

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
        {/* TODO 暇なときに実装したい */}
        {/* <div className={styles.progressArea}>
          <h2 className={styles.title}>今週の進捗</h2>
          <p className={styles.time}>11h / 16h</p>
        </div>
        <Progress value={40} size="xl" radius="xl" /> */}

        <p className={styles.time}>{formattedTime}</p>

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
