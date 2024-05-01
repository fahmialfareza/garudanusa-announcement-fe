import { AxiosErrorResponse } from "@/services/api";
import { Login, LoginPayload, LoginResponse } from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const { setToken } = useAuthStore();
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    AxiosError,
    LoginPayload
  >({
    mutationFn: Login,
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Login successful");
      const { token } = data.data;
      setToken(token);
      localStorage.setItem("token", token);

      router.push("/admin/profile");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message || "Login failed");
    },
  });

  return {
    login: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};
