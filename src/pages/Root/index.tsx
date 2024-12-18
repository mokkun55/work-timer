import { Button, Container, SimpleGrid } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./index.module.scss";
import { ServiceCard } from "./components/serviceCard";
import { MdModeEdit } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { MdAutoGraph } from "react-icons/md";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "@/providers/AuthProvider";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/libs/firebase";

export const Root = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log("error", e);
    }

  };
  const handleSignClick = async () => {
    if (currentUser) {
      navigate("/home");
      return;
    }
    await signInWithGoogle();
    navigate("/home");
  };
  
  return (
    <div>
      {/* ヘッダー */}
      <div className={styles.header}>
        <h1 className={styles.title}>WorkTime</h1>
        {!currentUser ? (
          <Button variant="outline" onClick={handleSignClick}>
            ログイン
          </Button>
        ) : (
          <Button variant="outline" color="red" onClick={() => signOut(auth)}>
            ログアウト
          </Button>
        )}
      </div>

      <Container size="md" py="xl" className={styles.container}>
        {/* 上のテキスト */}
        <div className={styles.topText}>
          <h1 className={styles.title}>作業時間を効率よく記録</h1>
          <p className={styles.description}>
            ワンクリックで作業時間を簡単に記録し、振り返れる！
            <br />
            目標達成までの進捗が一目でわかり、モチベーションもアップ！
          </p>
        </div>

        {/* ボタン */}
        <div className={styles.buttons}>
          <Button rightSection={<FaArrowRight />} onClick={handleSignClick}>
            今すぐ始める
          </Button>
          {/* TODO 後でどっかに飛ばす？？ */}
          <Button variant="outline">詳しく見る</Button>
        </div>

        <h1 className={styles.service}>サービスの紹介</h1>

        {/* サービスの紹介 */}
        <div className={styles.serviceList}>
          <SimpleGrid
            cols={{ base: 1, lg: 3 }}
            spacing={{ base: "lg", lg: "xl" }}
          >
            <ServiceCard
              icon={<MdModeEdit size={32} />}
              title="簡単に時間を記録"
              description="出勤ボタン、退勤ボタンを押すだけで、あっという間に作業時間が記録される！"
            />
            <ServiceCard
              icon={<MdSave size={32} />}
              title="作業記録は自動保存"
              description="記録した作業時間はすぐに履歴として保存されるから、後で振り返って見返すこともラクラク。"
            />
            <ServiceCard
              icon={<MdAutoGraph size={32} />}
              title="視覚的に進捗確認"
              description="リンググラフや進捗バーで目に見えて進捗がわかるから、達成感がアップ！"
            />
            <ServiceCard
              icon={<BsFileEarmarkBarGraph size={32} />}
              title="目標達成をサポート"
              description="今週どれくらい働いたか、あと何時間で目標達成できるか、グラフでサクッとチェック！"
            />
            <ServiceCard
              icon={<FaRegLightbulb size={32} />}
              title="勤務中は集中できる"
              description="勤務中はモーダルで作業内容と経過時間を一目で確認。集中できる環境を提供！"
            />
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
};
