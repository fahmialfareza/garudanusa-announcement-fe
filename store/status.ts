import { AnnouncementResponse } from "@/services/announcement/announcement";
import { create } from "zustand";

interface ResultStatus {
  result: AnnouncementResponse | null;
  setResult: (result: AnnouncementResponse | null) => void;
}

export const useResultStore = create<ResultStatus>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
