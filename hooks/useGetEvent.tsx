import { AxiosErrorResponse } from "@/services/api";
import { EventResponse, getEvent } from "@/services/events/event";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
export const useGetEvent = () => {
  const { data, isError, isLoading } = useQuery<EventResponse>({
    queryKey: ["getEvent"],
    queryFn: getEvent,
    meta: {
      onerror: (error: AxiosError) => {
        const errorMessage = error.response as unknown as AxiosErrorResponse;
        toast.error(errorMessage.message);
      },
    },
  });

  const event = useMemo(() => {
    const dataEvent = data || null;
    return dataEvent;
  }, [data]);

  const isPastDate = dayjs(data?.data?.date).isBefore(dayjs());

  return {
    data: data,
    event,
    isError,
    isLoading,
    isPastDate,
  };
};
