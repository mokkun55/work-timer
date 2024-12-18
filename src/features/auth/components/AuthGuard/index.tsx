// AuthGuard は認証されているかどうかをチェックし、認証されていない場合はリダイレクトします。
// AuthGuard をつけるには<AuthGuard>タグで囲む

import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Navigate } from "react-router";

type AuthGuardProps = {
  children: React.ReactNode;
  fallback?: string; // リダイレクト先のパス (デフォルトはルート)
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback = "/" }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // ローディング中の状態を表示
    // TODO 後でローディング用のページ作る
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    // 認証されていない場合にリダイレクト（React Router を使用）
    return <Navigate to={fallback} />;
  }

  // 認証されている場合は子要素をレンダリング
  return <>{children}</>;
};

export default AuthGuard;
