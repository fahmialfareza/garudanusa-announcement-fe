import axiosInstance from "@/services/api";
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

export const Login = async ({
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
