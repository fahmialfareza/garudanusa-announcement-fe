import axiosInstance from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

export interface AnnouncementArgs {
  url: string;
  data: {
    countdown: string | any;
    event_name: string;
    header_footer_name: string;
    selection_phase: string;
    desktop_photo?: File;
    mobile_photo?: File;
    note?: string;
  };
}

export const useSubmitAnnouncement = () => {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();
  const submitAnnouncement = async (args: AnnouncementArgs): Promise<void> => {
    const formData = new FormData();
    Object.entries(args.data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        // Convert countdown to ISO string if it's the countdown key
        const formattedValue =
          key === "countdown"
            ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
            : value;
        formData.append(key, formattedValue);
      }
    });

    await axiosInstance.post(args.url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        } else {
          setProgress(0);
        }
      },
    });
  };

  const mutation = useMutation<void, AxiosError, AnnouncementArgs>({
    mutationFn: submitAnnouncement,
    onMutate: () => {
      toast.loading("Submitting announcement...");
      setProgress(0);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Announcement submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["getEvent"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return {
    ...mutation,
    submitAnnouncement: (args: AnnouncementArgs) => mutation.mutate(args),
    progress,
  };
};
