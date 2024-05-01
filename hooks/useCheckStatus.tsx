import {
  AnnouncementResponse,
  CheckStatus,
  CheckStatusPayload,
} from "@/services/announcement/announcement";
import { AxiosErrorResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCheckStatus = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error, data } = useMutation<
    AnnouncementResponse,
    AxiosError,
    CheckStatusPayload
  >({
    mutationFn: CheckStatus,
    onMutate: () => {
      toast.loading("Getting data ...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Data ditemukan");

      //   router.push("/admin/profile");
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
