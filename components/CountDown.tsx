"use client";

import useCountdown from "@/hooks/useCountDown";
import { Divider, Group, Paper, Skeleton, Text } from "@mantine/core";
import React from "react";

import dayjs from "dayjs";

const CountDown = ({
  targetDate,
  isLoading,
  isMobile,
}: {
  targetDate?: Date | string;
  isLoading?: boolean;
  isMobile?: boolean;
}) => {
  const { days, hours, minutes, seconds } = useCountdown(
    targetDate ?? dayjs().toDate()
  );
  return (
    <Paper bg="teal.1" p="lg" radius={12}>
      <Text
        c="teal.8"
        size={isMobile ? "md" : "xl"}
        fw="bolder"
        ta="center"
        mb={16}
      >
        WAKTU PENGUMUMAN KELOLOSAN (WIB)
      </Text>
      <Group justify="center">
        <Skeleton radius="lg" w={80} h={36} visible={isLoading}>
          <Text
            c="teal.8"
            size="xl"
            fw="bolder"
            ta="center"
            w={80}
            tt="uppercase"
          >
            {days} Hari
          </Text>
        </Skeleton>

        <Divider
          size="sm"
          hidden={isMobile}
          orientation="vertical"
          color="teal.8"
        />

        <Skeleton radius="lg" w={80} h={36} visible={isLoading}>
          <Text
            c="teal.8"
            size="xl"
            fw="bolder"
            ta="center"
            w={80}
            tt="uppercase"
          >
            {hours} Jam
          </Text>
        </Skeleton>

        <Divider
          size="sm"
          hidden={isMobile}
          orientation="vertical"
          color="teal.8"
        />

        <Skeleton radius="lg" w={98} h={36} visible={isLoading}>
          <Text
            c="teal.8"
            size="xl"
            fw="bolder"
            ta="center"
            w={98}
            tt="uppercase"
          >
            {minutes} Menit
          </Text>
        </Skeleton>

        <Divider
          size="sm"
          hidden={isMobile}
          orientation="vertical"
          color="teal.8"
        />
        <Skeleton radius="lg" w={98} h={36} visible={isLoading}>
          <Text
            c="teal.8"
            size="xl"
            fw="bolder"
            ta="center"
            w={98}
            tt="uppercase"
          >
            {seconds} Detik
          </Text>
        </Skeleton>
      </Group>
    </Paper>
  );
};

export default CountDown;
