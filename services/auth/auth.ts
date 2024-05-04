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

export interface UsersResponse {
  status: string;
  data: DataUsers[];
}

export interface DataUsers {
  id: number;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  number: number;
}

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
}

export interface DeleteUserPayload {
  id: number;
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
      // localStorage.clear();
      // window.location.reload();
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get<UsersResponse>("/auth/users");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};

export const registerUser = async ({
  name,
  username,
  password,
}: RegisterPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/register", {
      name,
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

export const deleteUser = async ({
  id,
}: DeleteUserPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.delete<LoginResponse>(
      `/auth/delete/${id}`
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
