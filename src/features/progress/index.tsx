import { RingProgress } from "@mantine/core";
import styles from "./index.module.scss";

// TODO モックデータ
const goalTime = 10; // 目標時間 h
const completeTime = 4; // 今まで終わった時間 h
const percent = parseFloat(((completeTime / goalTime) * 100).toFixed(2));

export const Progress = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>今週の進捗</h2>
      <RingProgress
        size={250}
        thickness={12}
        roundCaps
        sections={[{ value: percent, color: "blue" }]}
        transitionDuration={700}
        label={
          <div className={styles.insideRing}>
            <h1 className={styles.text}>
              {completeTime}h / {goalTime}h
            </h1>
            <h1 className={styles.text}>あと11h</h1>
          </div>
        }
      />
      <h1 className={styles.percent}>{percent}%</h1>
    </div>
  );
};
