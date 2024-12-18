import { Button } from "@mantine/core";
import { auth, googleProvider } from "@/libs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";

export const Root = (): React.ReactNode => {
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
    await signInWithGoogle();
    navigate("/home");
  };

  const handleSignOutClick = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <h1>ルートページ</h1>
      <div>
        <h2>サービス紹介</h2>
        {/* TODO 内容考える カードとかで紹介 */}
        <div>
          1. 簡単に作業時間を記録
          出勤ボタン、退勤ボタンを押すだけで、あっという間に作業時間が記録される！
          手動で作業内容を入力することもできるから、自由に記録が可能。 <br />
          2. 目標達成をサポート
          今週どれくらい働いたか、あと何時間で目標達成できるか、グラフでサクッとチェック！
          進捗がリアルタイムでわかるから、モチベーションも上がる！ <br />
          3. 勤務中は集中できる
          勤務中はモーダルで作業内容と経過時間を一目で確認。集中できる環境を提供！
          進行中の作業がパッと見てわかるから、余計なことを考えずにスムーズに進められる。
          <br />
          4. 作業記録は自動で保存
          記録した作業時間はすぐに履歴として保存されるから、後で振り返って見返すこともラクラク。
          必要なときにいつでもチェックできて、振り返りが簡単！
          <br /> 5. 視覚的に進捗確認
          リンググラフや進捗バーで目に見えて進捗がわかるから、達成感がアップ！
          直感的に自分の働き具合がわかるから、どんどん頑張れちゃう。
        </div>

        {/* TODO デバック用 */}
        <div
          style={{
            backgroundColor: "lightgray",
            padding: "10px",
            margin: "10px",
          }}
        >
          ログイン中のユーザー: {currentUser?.email || "未ログイン"}
        </div>

        <div>
          {!currentUser && (
            <Button onClick={handleSignClick}>Googleでログイン</Button>
          )}
          {currentUser && (
            <>
              <Button onClick={handleSignOutClick} color="red">
                ログアウト
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
