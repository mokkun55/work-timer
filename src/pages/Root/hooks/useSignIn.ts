import { auth, googleProvider } from "@/libs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const useSignIn = () => {
  // googleでログイン
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("ログインしました");
    } catch (e) {
      toast.error("ログインに失敗しました");
      console.log("error", e);
    }
  };

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
