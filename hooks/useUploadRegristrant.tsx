import axiosInstance from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface Args {
  url: string;
  file: File;
  fieldName: string;
}

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  const uploadFile = async (args: Args): Promise<void> => {
    const formData = new FormData();
    formData.append(args.fieldName, args.file);

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

  const mutation = useMutation<void, AxiosError, Args>({
    mutationFn: uploadFile,
    onMutate: () => {
      toast.loading(`Uploading file...`);
      setProgress(0);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("File uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["getAnnouncement"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return {
    ...mutation,
    uploadFile: (args: Args) => mutation.mutate(args),
    progress,
  };
};
