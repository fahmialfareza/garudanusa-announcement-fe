"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode; // Correctly type the children prop
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token } = useAuthStore();
  console.log(token);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!isClient || !token) return null;

  return <>{children}</>;
};

export default AuthProvider;
