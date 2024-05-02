import { EventResponse, getEvent } from "@/services/events/event";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";
export const useGetEvent = () => {
  const { data, isError, isLoading, error } = useQuery<EventResponse>({
    queryKey: ["getEvent"],
    retry: 0,
    queryFn: getEvent,
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
