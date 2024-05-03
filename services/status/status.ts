import axiosInstance from "@/services/api";
import axios from "axios";
import { toast } from "sonner";

export interface StatusResponse {
  status: string;
  data: DataStatus[];
}

export interface DataStatus {
  id: number;
  status: string;
  message: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStatusPayload {
  status: string;
  message: string;
  color: string;
}

export interface UpdateStatusPayload {
  id: number | null;
  status?: string;
  message?: string;
  color?: string;
}

export interface DeleteStatusPayload {
  id: number;
}

export const getStatus = async (): Promise<StatusResponse> => {
  try {
    const response = await axiosInstance.get<StatusResponse>("/status");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};

export const createStatus = async ({
  status,
  message,
  color,
}: CreateStatusPayload): Promise<StatusResponse> => {
  try {
    const response = await axiosInstance.post<StatusResponse>("/status", {
      status,
      message,
      color,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateStatus = async ({
  id,
  status,
  message,
  color,
}: UpdateStatusPayload): Promise<StatusResponse> => {
  try {
    const response = await axiosInstance.put<StatusResponse>(`/status/${id}`, {
      status,
      message,
      color,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};

export const deleteStatus = async ({
  id,
}: DeleteStatusPayload): Promise<StatusResponse> => {
  try {
    const response = await axiosInstance.delete<StatusResponse>(
      `/status/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};
