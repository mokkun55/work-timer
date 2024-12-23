import { db } from "@/libs/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { addDoc, collection } from "firebase/firestore";

export const useRecordWorkTime = () => {
  type RecordTime = {
    content: string;
    duration: number;
    week: string;
  };
  const { currentUser } = useAuth();

  const writeRecordTime = async ({ content, duration, week }: RecordTime) => {
    if (!currentUser) {
      // TODO 後でトーストにしたい
      console.error("ログインしていません");
      return;
    }
    const userId = currentUser.uid;
    try {
      const workSessionsRef = collection(db, `users/${userId}/work_sessions`);
      const docRef = await addDoc(workSessionsRef, {
        content,
        duration,
        createdAt: new Date(),
        week,
      });
      // TODO 後でトーストにしたい
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // こちらも
      console.error("Error adding document: ", e);
    }
  };

  return { writeRecordTime };
};
