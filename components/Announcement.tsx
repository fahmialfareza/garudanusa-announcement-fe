"use client";

import React from "react";
import { Paper, Text, Button } from "@mantine/core";
import { Link } from "@/libs/router-event";

const Announcement = () => {
  return (
    <>
      <Paper bg="teal.1" p="lg" radius={12}>
        <Text c="teal.8" size="xl" fw="bolder" ta="center">
          CEK STATUS KELOLOSAN <br /> TELAH DIBUKA! <br /> SEMOGA MENDAPATKAN
          HASIL TERBAIK!
        </Text>
      </Paper>
      <Button
        variant="filled"
        color="brand.9"
        size="lg"
        radius="xl"
        component={Link}
        href="/check-status"
      >
        CEK KELOLOSAN SEKARANG!
      </Button>
    </>
  );
};

export default Announcement;
