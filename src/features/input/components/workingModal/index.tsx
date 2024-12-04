import useTimeFormatter from "@/hooks/useTimeFormatter";
import useTimerStore from "@/store/useTimerStore";
import useWorkContentStore from "@/store/useWorkContentStore";
import useWorkStore from "@/store/useWorkStore";
import { Button, Container, FocusTrap, Modal, Progress } from "@mantine/core";
import styles from "./index.module.scss";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export const WorkingModal = ({ onClose }: Props): React.ReactNode => {
  const { isWorking } = useWorkStore();
  const { workContent } = useWorkContentStore();
  const { elapsedTime, stopTimer, resumeTimer } = useTimerStore();
  const { formatTime } = useTimeFormatter();
  const [isBreak, setIsBreak] = useState<boolean>(false);

  const handleBreakButtonClick = () => {
    if (!isBreak) {
      stopTimer();
    } else {
      resumeTimer();
    }
    setIsBreak(!isBreak);
  };

  const handleCloseButtonClick = () => {
    onClose();
    setIsBreak(false);
  };

  // ページを離れようとすると警告
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

        <p className={styles.time}>{formatTime(elapsedTime)}</p>

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
