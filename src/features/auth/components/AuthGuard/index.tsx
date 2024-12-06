import { useEffect, useState } from "react";
import { auth } from "@/libs/firebase";
import { useNavigate } from "react-router";
import { LoadingOverlay } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <LoadingOverlay visible={true} zIndex={1000} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
