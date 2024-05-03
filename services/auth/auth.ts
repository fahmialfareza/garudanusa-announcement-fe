import axiosInstance from "@/services/api";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { toast } from "sonner";

export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  status: string;
  data: Data;
}

interface Data {
  token: string;
}

export interface CurrentUserResponse {
  status: string;
  data: UserData;
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export const login = async ({
  username,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      username,
      password,
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

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get<CurrentUserResponse>("/auth/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      localStorage.clear();
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};
