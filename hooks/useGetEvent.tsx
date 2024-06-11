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
      dataEvent.data.date = convertToUTC(dataEvent.data.date);
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

function convertToUTC(dateString: any): Date | string {
  // Regular expression to check if the date string is in ISO 8601 format
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;

  // If the date string matches the ISO 8601 format, return it as is
  if (dateString) {
    if (isoRegex.test(dateString)) {
      return dateString;
    }
  }

  // Parse the date string to a Date object assuming the input is in GMT+7
  const localDate = new Date(dateString + " GMT+0700");

  // Get the UTC date string
  const utcDate = localDate.toISOString();

  return utcDate;
}
