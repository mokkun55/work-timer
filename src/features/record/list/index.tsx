import { Button } from "@mantine/core";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useGetWorkingSessions } from "@/hooks/useGetWorkingSessions";
import { WorkSession } from "@/types/workSession";
import dayjs from "dayjs";

import { useNavigate } from "react-router";
import useTimeFormatter from "@/hooks/useTimeFormatter";

export const RecodeList = (): React.ReactNode => {
  const navigate = useNavigate();

  const { getThisWeekWorkingSessions } = useGetWorkingSessions();
  const [workSessions, setWorkSessions] = useState<WorkSession[] | null>(null);
  const { formatHour } = useTimeFormatter();

  const fetchSessions = async () => {
    const sessions = await getThisWeekWorkingSessions();
    if (!sessions) return;
    setWorkSessions(sessions);
  };
  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO スケルトンとかいれたいねー
  if (!workSessions) {
    return;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>今週の記録</h2>
      {/* TODO クリックで /work/[id] に飛んで詳細画面 */}
      <div className={styles.itemList}>
        {workSessions.length !== 0 ? (
          workSessions.map((item: WorkSession) => (
            <p className={styles.item} key={item.id}>
              {dayjs(item.createdAt.toDate()).format("YYYY/MM/DD")}&nbsp;
              {formatHour(item.duration)}h&nbsp;{item.content}
            </p>
          ))
        ) : (
          <div>おっと！今週の記録がゼロです😳</div>
        )}
      </div>
      <Button
        fullWidth
        className={styles.button}
        onClick={() => {
          navigate("/history");
        }}
      >
        過去の記録一覧
      </Button>
    </div>
  );
};
