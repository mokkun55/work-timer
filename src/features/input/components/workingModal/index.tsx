import useTimerStore from "@/store/useTimerStore";
import useWorkContentStore from "@/store/useWorkContentStore";
import useWorkStore from "@/store/useWorkStore";
import { Modal } from "@mantine/core";

type Props = {
  onClose: () => void;
};

export const WorkingModal = ({ onClose }: Props): React.ReactNode => {
  const { isWorking } = useWorkStore();
  const { workContent } = useWorkContentStore();
  const { elapsedTime } = useTimerStore();

  // ページを離れようとすると警告
  if (isWorking) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = null;
  }

  const formatTime = (time: number): string => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    return `${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}`;
  };

  return (
    <Modal
      opened={isWorking}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
    >
      <div>
        <h1>作業中</h1>
        <p>作業内容: {workContent}</p>
        <p>作業時間: {formatTime(elapsedTime)}</p>
        {/* TODO デバック用後で消す */}
        <p>{elapsedTime}</p>
        <button onClick={onClose}>終了</button>
      </div>
    </Modal>
  );
};
