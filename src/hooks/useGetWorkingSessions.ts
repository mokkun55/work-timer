import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { WorkSession } from "@/types/workSession";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit as firestoreLimit, // なんか競合起こしているので別名import
} from "firebase/firestore";
import { useWeekNumber } from "./useWeekNumber";

export const useGetWorkingSessions = () => {
  const { currentUser } = useAuth();
  const { getNowWeekNumber } = useWeekNumber();

  // すべての作業記録を取得してそれを返す
  const getAllWorkingSessions = async (
    limit: number = 30
  ): Promise<WorkSession[] | undefined> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return;
      }
      const docRef = collection(db, `users/${currentUser.uid}/work_sessions`);
      const q = query(
        docRef,
        orderBy("createdAt", "desc"),
        firestoreLimit(limit)
      );
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

  // 週番号を取得して、その週の作業記録を返す
  const getWorkingSessionsByWeek = async (
    weekNumber: string
  ): Promise<WorkSession[] | undefined> => {
    try {
      if (!currentUser) {
        console.error("ログインしてください");
        return;
      }
      const docRef = collection(db, `users/${currentUser.uid}/work_sessions`);
      const q = query(
        docRef,
        orderBy("createdAt", "desc"),
        where("week", "==", weekNumber)
      );
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
    }
  };

  // 今週の作業記録を返す
  const getThisWeekWorkingSessions = async (): Promise<
    WorkSession[] | undefined
  > => {
    const thisWeek = getNowWeekNumber();
    return await getWorkingSessionsByWeek(thisWeek);
  };

  // 週を指定して、その週の合計作業時間を計算して返す
  const getWeekTotalDuration = async (weekNumber: string): Promise<number> => {
    const workSessions = await getWorkingSessionsByWeek(weekNumber);
    if (!workSessions) return 0;
    const totalDuration = workSessions.reduce(
      (acc, cur) => acc + cur.duration,
      0
    );
    return totalDuration;
  };

  // 今週の合計作業時間を計算して返す
  const getThisWeekTotalDuration = async (): Promise<number | undefined> => {
    const thisWeek = getNowWeekNumber();
    return await getWeekTotalDuration(thisWeek);
  };

  return {
    getAllWorkingSessions,
    getWorkingSessionsByWeek,
    getThisWeekWorkingSessions,
    getWeekTotalDuration,
    getThisWeekTotalDuration,
  };
};
