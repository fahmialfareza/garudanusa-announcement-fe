import { AxiosErrorResponse } from "@/services/api";
import {
  CreateStatusPayload,
  DeleteStatusPayload,
  StatusResponse,
  UpdateStatusPayload,
  createStatus,
  deleteStatus,
  getStatus,
  updateStatus,
} from "@/services/status/status";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetStatus = () => {
  const { data, isError, isLoading, error, refetch } = useQuery<StatusResponse>(
    {
      queryKey: ["getStatus"],
      retry: 0,
      queryFn: getStatus,
    }
  );

  return {
    status: data,
    isError: isError,
    isLoading: isLoading,
    error: error,
    refetch: refetch,
  };
};

export const useCreateStatus = () => {
  const { refetch: refetchStatus } = useGetStatus();
  const { mutate, isPending, isError, error } = useMutation<
    StatusResponse,
    AxiosError,
    CreateStatusPayload
  >({
    mutationFn: createStatus,
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (data) => {
      refetchStatus();
      toast.dismiss();
      toast.success("Status created successfully");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message || "Failed to create status");
    },
  });

  return {
    createStatus: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};

export const useUpdateStatus = () => {
  const { refetch: refetchStatus } = useGetStatus();
  const { mutate, isPending, isError, error } = useMutation<
    StatusResponse,
    AxiosError,
    UpdateStatusPayload
  >({
    mutationFn: updateStatus,
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (data) => {
      refetchStatus();
      toast.dismiss();
      toast.success("Status updated successfully");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message || "Failed to update status");
    },
  });

  return {
    updateStatus: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};

export const useDeleteStatus = () => {
  const { refetch: refetchStatus } = useGetStatus();
  const { mutate, isPending, isError, error } = useMutation<
    StatusResponse,
    AxiosError,
    DeleteStatusPayload
  >({
    mutationFn: deleteStatus,
    onMutate: () => {
      toast.loading("Deleting...");
    },
    onSuccess: () => {
      refetchStatus();
      toast.dismiss();
      toast.success("Status deleted successfully");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message || "Failed to delete status");
    },
  });

  return {
    deleteStatus: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};
