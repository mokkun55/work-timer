// TODO 開発用 後で消す！

import { Button, Container } from "@mantine/core";
import styles from "./index.module.scss";
import { useAuth } from "@/providers/AuthProvider";
import { useDeleteData } from "./hooks/useDeleteData";
import toast from "react-hot-toast";

export const Dev = (): React.ReactNode => {
  const { currentUser } = useAuth();
  const { deleteAllTasks, deleteAllData } = useDeleteData();

  const handleDeleteAllData = async () => {
    if (confirm("本当に全データを削除しますか？")) {
      try {
        deleteAllData();
        toast.success("全データを削除しました");
      } catch (e) {
        toast.error("エラーが発生しました");
        console.error("データ削除中にエラーが発生しました: ", e);
      }
    }
  };

  const handleDeleteAllTasks = async () => {
    if (confirm("本当に全タスクを削除しますか？")) {
      try {
        deleteAllTasks();
        toast.success("全タスクを削除しました");
      } catch (e) {
        toast.error("エラーが発生しました");
        console.error("タスク削除中にエラーが発生しました: ", e);
      }
    }
  };
  return (
    <Container size={"sm"} className={styles.container}>
      <h1>開発用ページ</h1>
      <div>
        <h2>ログイン情報</h2>
        {currentUser ? (
          <div>
            <p>ログイン中のユーザー: {currentUser.displayName}</p>
            <p>ログイン中のユーザーID: {currentUser.uid}</p>
          </div>
        ) : (
          <div>
            <p>ログインしていません</p>
          </div>
        )}
      </div>

      {currentUser && (
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={handleDeleteAllData}>
            全初期化
          </Button>
          <Button className={styles.button} onClick={handleDeleteAllTasks}>
            自分のタスク全消し
          </Button>
        </div>
      )}
    </Container>
  );
};
