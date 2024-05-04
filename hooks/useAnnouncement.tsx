import {
  AnnouncementResponse,
  GetAnnouncementParams,
  GetAnnouncementResponse,
  UpdateAnnouncementPayload,
  getAnnouncement,
  updateAnnouncement,
} from "@/services/announcement/announcement";
import { AxiosErrorResponse } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetAnnouncement = () => {
  const { data, isError, isLoading, error, refetch } =
    useQuery<GetAnnouncementResponse>({
      queryKey: ["getAnnouncement"],
      retry: 0,
      queryFn: () => getAnnouncement(),
    });

  return {
    announcement: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation<
    AnnouncementResponse,
    AxiosError,
    UpdateAnnouncementPayload
  >({
    mutationFn: updateAnnouncement,
    onMutate: async () => {
      toast.loading("Updating...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getAnnouncement"] });
      toast.dismiss();
      toast.success("Announcement updated successfully");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response?.data as AxiosErrorResponse; // Handling potential undefined response
      toast.error(dataError?.message || "Failed to update announcement");
    },
  });

  return {
    updateAnnouncement: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
    isSuccess: isSuccess,
  };
};
