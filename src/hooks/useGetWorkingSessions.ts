import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { WorkSession } from "@/types/workSession";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const useWorkingSessions = () => {
  const { currentUser } = useAuth();
  // 作業記録を取得してそれを返す
  const getWorkingSessions = async (): Promise<WorkSession[] | null> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return null;
      }
      const docRef = collection(db, `users/${currentUser.uid}/work_sessions`);
      const q = query(docRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const workSessions: WorkSession[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          content: data.content,
          duration: data.duration,
          createdAt: data.createdAt,
          week: data.week,
        } as WorkSession;
      });
      return workSessions;
    } catch (e) {
      console.error("作業記録の取得中にエラーが発生しました: ", e);
      return null;
    }
  };

  return { getWorkingSessions };
};
