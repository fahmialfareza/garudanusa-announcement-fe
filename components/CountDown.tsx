"use client";

import useCountdown from "@/hooks/useCountDown";
import { Divider, Group, Paper, Text } from "@mantine/core";
import React from "react";

const CountDown = () => {
  const targetDate = "2024-07-31T23:59:59" as unknown as Date; // Set your target date here
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <Paper bg="teal.1" p="lg" radius={12}>
      <Text c="teal.8" size="xl" fw="bolder" ta="center" mb={16}>
        WAKTU PENGUMUMAN KELOLOSAN
      </Text>
      <Group>
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
        <Divider size="sm" orientation="vertical" color="teal.8" />
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
        <Divider size="sm" orientation="vertical" color="teal.8" />
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
        <Divider size="sm" orientation="vertical" color="teal.8" />
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
      </Group>
    </Paper>
  );
};

export default CountDown;
