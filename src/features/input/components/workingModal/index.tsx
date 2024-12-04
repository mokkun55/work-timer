import useTimeFormatter from "@/hooks/useTimeFormatter";
import useTimerStore from "@/store/useTimerStore";
import useWorkContentStore from "@/store/useWorkContentStore";
import useWorkStore from "@/store/useWorkStore";
import { Button, Container, Modal, Progress } from "@mantine/core";
import styles from "./index.module.scss";
import { MdModeEdit } from "react-icons/md";

type Props = {
  onClose: () => void;
};

export const WorkingModal = ({ onClose }: Props): React.ReactNode => {
  const { isWorking } = useWorkStore();
  const { workContent } = useWorkContentStore();
  const { elapsedTime } = useTimerStore();
  const { formatTime } = useTimeFormatter();

  // ページを離れようとすると警告
  if (isWorking) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = null;
  }

  return (
    <Modal
      opened={isWorking}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
    >
      <Container size="lg" className={styles.container}>
        <div className={styles.working}>
          作業中:
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
        <Button color="red" onClick={onClose}>
          作業を終了する
        </Button>
      </Container>
    </Modal>
  );
};
