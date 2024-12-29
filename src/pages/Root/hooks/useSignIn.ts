import { useUserSettings } from "@/hooks/useUserSettings";
import { auth, googleProvider } from "@/libs/firebase";
import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const { initUserSettings } = useUserSettings();

  // googleでログイン
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        // 新規登録時の処理
        // TODO 後で消す
        toast.success("初めてのログインです");
        await initUserSettings();
      }

      toast.success("ログインしました");
    } catch (e) {
      toast.error("ログインに失敗しました");
      console.log("error", e);
    }
  };

  // TODO const signInWithGuest = async () => {}

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("ログアウトしました");
    } catch (e) {
      toast.error("ログアウトに失敗しました");
      console.log("error", e);
    }
  };
  return {
    signInWithGoogle,
    logOut,
  };
};
