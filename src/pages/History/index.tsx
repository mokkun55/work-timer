import AuthGuard from "@/features/auth/components/AuthGuard";
import { useGetWorkingSessions } from "@/hooks/useGetWorkingSessions";
import useTimeFormatter from "@/hooks/useTimeFormatter";
import { BaseLayout } from "@/Layouts/BaseLayout";
import { WorkSession } from "@/types/workSession";
import { Table } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

export const History = (): React.ReactNode => {
  const { getAllWorkingSessions } = useGetWorkingSessions();
  const [data, setData] = useState<WorkSession[]>([]);
  const { formatHour } = useTimeFormatter();

  // 作業記録を取得
  const fetchWorkingSessions = async (): Promise<void> => {
    try {
      const data = await getAllWorkingSessions(15);
      if (!data) {
        return;
      }
      setData(data);
    } catch (e) {
      console.error("作業記録の取得に失敗しました: ", e);
    }
  };

  useEffect(() => {
    fetchWorkingSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <BaseLayout>
        <h1>過去の記録</h1>

        {/* テーブル */}
        <Table highlightOnHover className={styles.table}>
          <Table.Thead>
            {/* ヘッダー */}
            <Table.Tr>
              <Table.Th className={styles.dateAndTime}>日時</Table.Th>
              <Table.Th className={styles.workTime}>時間</Table.Th>
              <Table.Th className={styles.content}>内容</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {/* ボディ */}
          <Table.Tbody>
            {data.map((data) => (
              <Table.Tr key={data.id}>
                <Table.Td>
                  {dayjs(data.createdAt.toDate()).format(
                    "YYYY/MM/DD(dd) HH時mm分"
                  )}
                </Table.Td>
                <Table.Td>{formatHour(data.duration)}h</Table.Td>
                <Table.Td>{data.content}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {/* TODO ページネーション */}
      </BaseLayout>
    </AuthGuard>
  );
};
