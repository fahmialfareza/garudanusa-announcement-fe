import { EventResponse, getEvent } from "@/services/events/event";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useGetEvent = (convertDate?: boolean) => {
  const { data, isError, isLoading, error } = useQuery<EventResponse>({
    queryKey: ["getEvent"],
    retry: 0,
    queryFn: getEvent,
  });

  const event = useMemo(() => {
    const dataEvent = data || null;
    if (dataEvent && convertDate) {
      dataEvent.data.date = convertToUTC(dataEvent.data.date.toString());
    }

    return dataEvent;
  }, [convertDate, data]);

  const isPastDate = dayjs(data?.data?.date).isBefore(dayjs());

  return {
    data: data,
    event,
    isError,
    isLoading,
    isPastDate,
  };
};

function convertToUTC(date: string): Date {
  // Regular expression to check if the date string is in GMT+7
  const gmt7Regex = /GMT\+0700/;

  // If the date string matches the GMT+7 format, return it as is
  if (gmt7Regex.test(date)) {
    return new Date(date);
  }

  // Parse the date string to a Date object assuming the input is in GMT+7
  const localDate = new Date(date + " GMT+0700");
  return localDate;
}
