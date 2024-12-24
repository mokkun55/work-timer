import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { WorkSession } from "@/types/workSession";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useWeekNumber } from "./useWeekNumber";

export const useWorkingSessions = () => {
  const { currentUser } = useAuth();
  const { getNowWeekNumber } = useWeekNumber();

  // 作業記録を取得してそれを返す
  const getWorkingSessions = async (): Promise<WorkSession[] | undefined> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return;
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
      return;
    }
  };

  // 今週の合計作業時間を計算して返す
  const getThisWeekTotalDuration = async (): Promise<number | undefined> => {
    const thisWeek = getNowWeekNumber();
    const workSessions = await getWorkingSessions();
    if (!workSessions) return;
    const thisWeekWorkSessions = workSessions.filter(
      (workSession) => workSession.week === thisWeek
    );
    const totalDuration = thisWeekWorkSessions.reduce(
      (acc, cur) => acc + cur.duration,
      0
    );
    return totalDuration;
  };

  return { getWorkingSessions, getThisWeekTotalDuration };
};
