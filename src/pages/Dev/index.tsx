// TODO 開発用 後で消す！

import { Button, Container } from "@mantine/core";
import styles from "./index.module.scss";
import { useAuth } from "@/providers/AuthProvider";

export const Dev = (): React.ReactNode => {
  const { currentUser } = useAuth();
  return (
    <Container size={"sm"} className={styles.container}>
      <h1>開発用ページ</h1>
      <div>
        <h2>ログイン情報</h2>
        {currentUser ? (
          <div>
            <p>ログイン中のユーザー: {currentUser.email}</p>
            <p>ログイン中のユーザーID: {currentUser.uid}</p>
          </div>
        ) : (
          <div>
            <p>ログインしていません</p>
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button className={styles.button}>全初期化</Button>
        <Button className={styles.button}>ログイン中のユーザー全初期化</Button>
        <Button className={styles.button}>タスク全消し</Button>
        <Button className={styles.button}>初期データいれる</Button>
      </div>
    </Container>
  );
};
