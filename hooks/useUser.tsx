import { AxiosErrorResponse } from "@/services/api";
import {
  CurrentUserResponse,
  DeleteUserPayload,
  LoginResponse,
  RegisterPayload,
  UsersResponse,
  deleteUser,
  getCurrentUser,
  getUsers,
  registerUser,
} from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetUser = () => {
  const { setToken } = useAuthStore();
  const { data, isError, isLoading, error, refetch } =
    useQuery<CurrentUserResponse>({
      queryKey: ["getCurrentUser"],
      retry: 0,
      queryFn: getCurrentUser,
      meta: {
        onerror: () => {
          setToken(null);
          localStorage.clear();
        },
      },
    });

  return {
    user: data,
    isError: isError,
    isLoading: isLoading,
    error: error,
    refetch: refetch,
  };
};

export const useGetUsers = () => {
  const { data, isError, isLoading, error, refetch } = useQuery<UsersResponse>({
    queryKey: ["getAllUsers"],
    retry: 0,
    queryFn: getUsers,
  });

  return {
    users: data,
    isError: isError,
    isLoading: isLoading,
    error: error,
    refetch: refetch,
  };
};

export const useRegisterUser = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation<
    LoginResponse,
    AxiosError,
    RegisterPayload
  >({
    mutationFn: registerUser,
    onMutate: () => {
      toast.loading("Adding user ...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Adding user successful");
    },
  });

  return {
    registerUser: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
    isSuccess: isSuccess,
  };
};

export const useDeleteUser = () => {
  const { refetch: refetchUser } = useGetUsers();
  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    AxiosError,
    DeleteUserPayload
  >({
    mutationFn: deleteUser,
    onMutate: () => {
      toast.loading("Deleting user...");
    },
    onSuccess: () => {
      refetchUser();
      toast.dismiss();
      toast.success("User deleted successfully");
    },
  });

  return {
    deleteUser: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};
