import React from "react";
import { Paper, Text, Button, Input, Center, Stack } from "@mantine/core";

const CheckStatus = () => {
  return (
    <Center>
      <Stack justify="center" align="center" gap={40}>
        <Paper bg="teal.1" p="lg" radius={12}>
          <Text c="orange.8" size="xl" fw="bolder" ta="center" tt="uppercase">
            CEK STATUS KELOLOSAN ANDA SEKARANG!
          </Text>
          <Text c="teal.8" size="xl" fw="bolder" ta="center" tt="uppercase">
            MASUKKAN NOMOR HP YANG ANDA GUNAKAN SAAT MENGISI FORMULIR
            PENDAFTARAN
          </Text>
          <Text c="orange.8" size="xl" fw="bolder" ta="center" tt="uppercase">
            CERMATI PETUNJUK YANG TERTERA!
          </Text>
        </Paper>
        <Input
          radius="xl"
          variant="filled"
          w="100%"
          size="xl"
          placeholder="No Hp:08123456789"
        />
        <Button
          variant="filled"
          color="brand.9"
          size="lg"
          radius="xl"
          fullWidth={false}
        >
          CEK STATUS KELOLOSAN
        </Button>
      </Stack>
    </Center>
  );
};

export default CheckStatus;
