"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <>{children}</>;
};

export default AuthProvider;
