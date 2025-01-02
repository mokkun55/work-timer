import { auth, db, googleProvider } from "@/libs/firebase";
import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const useSignIn = () => {
  // googleでログイン
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      // 新規登録時の確認
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        // 新規登録時の処理(初期データいれる)
        if (!user) {
          console.error("user is not found");
        }
        const docRef = doc(db, `users/${user.uid}`);
        setDoc(docRef, {
          goalTime: 8,
        });
      }

      toast.success("ログインしました");
    } catch (e) {
      toast.error("ログインに失敗しました");
    }
  };

  // TODO const signInWithGuest = async () => {}

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("ログアウトしました");
    } catch (e) {
      toast.error("ログアウトに失敗しました");
    }
  };
  return {
    signInWithGoogle,
    logOut,
  };
};
