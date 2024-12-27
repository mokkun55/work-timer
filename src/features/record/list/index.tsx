import { Button } from "@mantine/core";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useWorkingSessions } from "@/hooks/useGetWorkingSessions";
import { WorkSession } from "@/types/workSession";
import dayjs from "dayjs";
// TODO 全体でdayjs 日本語にしたい
import "dayjs/locale/ja";
dayjs.locale("ja");

export const RecodeList = (): React.ReactNode => {
  const { getThisWeekWorkingSessions } = useWorkingSessions();
  const [workSessions, setWorkSessions] = useState<WorkSession[] | null>(null);

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
              {(item.duration / 3600).toFixed(1)}
              h&nbsp;{item.content}
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
          // TODO 記録一覧へ移動
        }}
      >
        過去の記録一覧
      </Button>
    </div>
  );
};
