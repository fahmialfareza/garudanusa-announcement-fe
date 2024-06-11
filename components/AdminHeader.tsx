"use client";

import { useGetEvent } from "@/hooks/useGetEvent";
import { Paper, Skeleton, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

const AdminHeader = () => {
  const { event, isLoading } = useGetEvent(true);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Paper px="lg" py="xs" radius={12} mb={24} mt={isMobile ? 36 : 0}>
      <Skeleton visible={isLoading} radius={12}>
        <Text c="brand.9" size="lg" fw={700} ta="center">
          SISTEM INFORMASI KELOLOSAN GARUDA NUSA <br />{" "}
          {event?.data?.event_name}
        </Text>
      </Skeleton>
    </Paper>
  );
};

export default AdminHeader;
