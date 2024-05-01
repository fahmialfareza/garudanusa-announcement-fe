import axiosInstance from "@/services/api";
import axios from "axios";

export interface EventResponse {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  event_name: string;
  desktop_photo: string;
  mobile_photo: string;
  header_footer_name: string;
  selection_phase: string;
  date: Date;
  note: string;
  created_at: Date;
  updated_at: Date;
}

export const getEvent = async (): Promise<EventResponse> => {
  try {
    const response = await axiosInstance.get<EventResponse>("/event");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};
