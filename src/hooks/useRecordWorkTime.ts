import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

export const useRecordWorkTime = () => {
  type RecordTime = {
    content: string;
    duration: number;
    week: string;
  };
  const { currentUser } = useAuth();

  const writeRecordTime = async ({ content, duration, week }: RecordTime) => {
    if (!currentUser) {
      toast.error("ログインしてください");
      return;
    }
    const userId = currentUser.uid;
    try {
      const workSessionsRef = collection(db, `users/${userId}/work_sessions`);
      await addDoc(workSessionsRef, {
        content,
        duration,
        createdAt: new Date(),
        week,
      });
    } catch (e) {
      // こちらも
      console.error("作業記録中にエラーが発生しました: ", e);
    }
  };

  return { writeRecordTime };
};
