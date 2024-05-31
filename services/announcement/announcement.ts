import axiosInstance from "@/services/api";
import { DataStatus } from "@/services/status/status";
import axios from "axios";
import { toast } from "sonner";

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
  status: DataStatus;
}

export interface CheckStatusPayload {
  numberPhone: string;
}

export interface GetAnnouncementResponse {
  status: string;
  data: DataAnnouncement[];
}

export interface DataAnnouncement {
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
  number: number;
  status: DataStatus;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
export interface GetAnnouncementParams {
  page: number;
  search?: string;
  limit?: number;
}

export interface UpdateAnnouncementPayload {
  id: number | undefined | string;
  name: string;
  phone: string;
  city_of_birth: string;
  date_of_birth: string;
  address_from: string;
  school: string;
  status_id: number | undefined | string;
  total_score: number | undefined | string;
}

export const checkStatus = async ({
  numberPhone,
}: CheckStatusPayload): Promise<AnnouncementResponse> => {
  try {
    const response = await axiosInstance.get<AnnouncementResponse>(
      `/announcement/phone/${numberPhone}`
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

export const getAnnouncement = async (): Promise<GetAnnouncementResponse> => {
  try {
    const response = await axiosInstance.get<GetAnnouncementResponse>(
      "/announcement"
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

export const updateAnnouncement = async ({
  id,
  name,
  phone,
  city_of_birth,
  date_of_birth,
  address_from,
  school,
  status_id,
  total_score,
}: UpdateAnnouncementPayload): Promise<AnnouncementResponse> => {
  try {
    const response = await axiosInstance.put<AnnouncementResponse>(
      `announcement/update/${id}`,
      {
        id,
        name,
        phone,
        city_of_birth,
        date_of_birth,
        address_from,
        school,
        status_id,
        total_score,
      }
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

export const deleteAnnouncement = async (): Promise<any> => {
  try {
    const response = await axiosInstance.delete("announcement/delete");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
