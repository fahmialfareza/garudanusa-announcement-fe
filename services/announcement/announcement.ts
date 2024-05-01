import axiosInstance from "@/services/api";
import axios from "axios";

export interface AnnouncementResponse {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  phone: string;
  city_of_birth: string;
  date_of_birth: string;
  address_from: string;
  school: string;
  status_id: string;
  total_score: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  status: string;
  message: string;
  color: string;
}

export interface CheckStatusPayload {
  numberPhone: string;
}

export const CheckStatus = async ({
  numberPhone,
}: CheckStatusPayload): Promise<AnnouncementResponse> => {
  try {
    const response = await axiosInstance.get<AnnouncementResponse>(
      `/announcement/phone/${numberPhone}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
