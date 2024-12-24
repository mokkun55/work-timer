import { RingProgress } from "@mantine/core";
import styles from "./index.module.scss";
import { useGetUserSettings } from "@/hooks/useGetUserSettings";
import { useEffect, useState } from "react";
import { useWorkingSessions } from "@/hooks/useGetWorkingSessions";

export const Progress = (): React.ReactNode => {
  const { getGoalTime } = useGetUserSettings();
  const [goalTime, setGoalTime] = useState<number>();
  const { getThisWeekTotalDuration } = useWorkingSessions();
  const [completeTime, setCompleteTime] = useState<number>();

  const fetchTimes = async () => {
    const goalTime = await getGoalTime();
    const totalTime = await getThisWeekTotalDuration();
    if (!goalTime || !totalTime) return;
    setGoalTime(goalTime); // 目標時間は時間で保存されている
    setCompleteTime(parseFloat((totalTime / 3600).toFixed(1))); // 完了時間は秒で保存されている <- 時間に変換
  };

  useEffect(() => {
    fetchTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO goalTimeがnullの場合はスケルトンとか表示したい
  if (!goalTime || !completeTime) return null;
  const percent = parseFloat(((completeTime / goalTime) * 100).toFixed(0));
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
            <h1 className={styles.text}>
              {goalTime &&
                `あと${parseFloat((goalTime - completeTime).toFixed(2))}h`}
            </h1>
          </div>
        }
      />
      <h1 className={styles.percent}>{percent}%</h1>
    </div>
  );
};
