import { CurrentUserResponse, getCurrentUser } from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";

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
