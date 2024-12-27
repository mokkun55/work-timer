import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/libs/firebase"; // Firestoreの初期化ファイルを想定
import { useAuth } from "@/providers/AuthProvider";

export const useDeleteData = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  // ユーザの持っているタスクをすべて消す
  const deleteAllTasks = async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const collectionRef = collection(db, `users/${userId}/work_sessions`);
      const snapshot = await getDocs(collectionRef);
      snapshot.forEach((document) => {
        deleteDoc(doc(db, `users/${userId}/work_sessions`, document.id));
      });
    } catch (e) {
      console.error("タスク削除中にエラーが発生しました: ", e);
    }
  };

  // すべてのデータを削除する
  const deleteAllData = async (): Promise<void> => {
    try {
      const collectionRef = collection(db, "users");
      const snapshot = await getDocs(collectionRef);
      snapshot.forEach((document) => {
        deleteDoc(doc(db, "users", document.id));
      });
    } catch (e) {
      console.error("データ削除中にエラーが発生しました: ", e);
    }
  };

  return { deleteAllTasks, deleteAllData };
};
