import {
  AnnouncementResponse,
  CheckStatusPayload,
  checkStatus,
} from "@/services/announcement/announcement";
import { AxiosErrorResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCheckStatus = (isParams: boolean) => {
  const router = useRouter();
  const { mutate, isPending, isError, error, data } = useMutation<
    AnnouncementResponse,
    AxiosError,
    CheckStatusPayload
  >({
    mutationFn: checkStatus,
    onMutate: () => {
      if (!isParams) {
        toast.loading("Checking data ...");
      }
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (!isParams) {
        toast.success("Data ditemukan");
      }
      router.push("/result/" + data.data.phone);
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message || "Data tidak ditemukan");
    },
  });

  return {
    checkStatus: mutate,
    status: data,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};
