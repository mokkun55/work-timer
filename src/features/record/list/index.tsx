import { Button } from "@mantine/core";
import styles from "./index.module.scss";

export const RecodeList = (): React.ReactNode => {
  // TODO dbからデータを取ってくる
  // 今はモック
  const mockData = [
    { date: "11/11(月)", hours: 3, task: "ホームページの制作" },
    { date: "11/12(月)", hours: 2, task: "コードレビュー" },
    { date: "11/13(月)", hours: 0.5, task: "デザインの修正" },
    { date: "11/14(月)", hours: 1, task: "ミーティング" },
    {
      date: "11/15(月)",
      hours: 4,
      task: "新機能の実装をしたよおおおおおおおおおおおおおおおおおおおおおおおお",
    },
    { date: "11/15(月)", hours: 4, task: "新機能の実装" },
    { date: "11/15(月)", hours: 4, task: "新機能の実装" },
    { date: "11/15(月)", hours: 4, task: "新機能の実装" },
    { date: "11/15(月)", hours: 4, task: "新機能の実装" },
    { date: "11/15(月)", hours: 4, task: "新機能の実装" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>今週の記録</h2>
      <div className={styles.itemList}>
        {/* TODO キーは後々uidとかにする */}
        {mockData.map((item, index) => (
          <p className={styles.item} key={index}>
            {/* TODO hoursは二桁にしたい */}
            {item.date} {item.hours >= 1 ? item.hours + ".0" : item.hours}
            h&nbsp;{item.task}
          </p>
        ))}
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
