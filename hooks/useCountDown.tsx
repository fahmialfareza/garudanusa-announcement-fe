import { useState, useEffect } from "react";
import dayjs from "dayjs";

function useCountdown(targetDateInput?: Date | string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(targetDateInput);
      const difference = target.diff(now);

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = target.diff(now, "day");
        const hours = target.subtract(days, "day").diff(now, "hour");
        const minutes = target
          .subtract(days, "day")
          .subtract(hours, "hour")
          .diff(now, "minute");
        const seconds = target
          .subtract(days, "day")
          .subtract(hours, "hour")
          .subtract(minutes, "minute")
          .diff(now, "second");

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateInput]);

  return timeLeft;
}

export default useCountdown;
