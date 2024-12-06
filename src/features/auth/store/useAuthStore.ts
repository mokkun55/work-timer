import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/libs/firebase";

// Zustand ストアの型定義
type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// ユーザー状態を管理するストア
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// 認証状態を監視して Zustand に反映
const initializeAuthListener = () => {
  const { setUser } = useAuthStore.getState();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};

export { useAuthStore, initializeAuthListener };
