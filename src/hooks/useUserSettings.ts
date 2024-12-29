import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const useUserSettings = () => {
  const { currentUser } = useAuth();

  // 新規登録の処理
  const initUserSettings = async (): Promise<void> => {
    try {
      if (!currentUser?.uid) {
        console.error("てすとログインしてください");
        return;
      }

      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.error("ユーザー設定がすでに存在します");
        return;
      }

      await setDoc(docRef, {
        goalTime: 8,
      });
    } catch (e) {
      console.error("ユーザー設定の初期化中にエラーが発生しました: ", e);
    }
  };

  const getGoalTime = async (): Promise<number | undefined> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return;
      }

      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().goalTime;
      } else {
        console.error("ユーザー設定が見つかりませんでした");
        return;
      }
    } catch (e) {
      console.error("ユーザー設定の取得中にエラーが発生しました: ", e);
      return;
    }
  };

  const updateGoalTime = async (goalTime: number): Promise<void> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return;
      }

      const docRef = doc(db, `users/${currentUser.uid}`);
      await updateDoc(docRef, {
        goalTime,
      });
    } catch (e) {
      console.error("ユーザー設定の更新中にエラーが発生しました: ", e);
    }
  };
  return { initUserSettings, getGoalTime, updateGoalTime };
};
