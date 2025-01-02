import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const useUserSettings = () => {
  const { currentUser } = useAuth();
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
  return { getGoalTime, updateGoalTime };
};
