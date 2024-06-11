"use client";

import AdminHeader from "@/components/AdminHeader";
import { useCheckStatus } from "@/hooks/useCheckStatus";
import { useGetEvent } from "@/hooks/useGetEvent";
import { CheckStatusPayload } from "@/services/announcement/announcement";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDocumentTitle } from "@mantine/hooks";

export default function AdminCheckResult() {
  useDocumentTitle("Admin | Cek Kelolosan");
  const { event } = useGetEvent(true);
  const home = event?.data;
  const { checkStatus, status } = useCheckStatus(false);

  const form = useForm<CheckStatusPayload>({
    mode: "uncontrolled",
    initialValues: {
      numberPhone: "",
    },

    validate: {
      numberPhone: (value) => {
        if (!value.length) {
          return "Nomor telepon tidak boleh kosong";
        }
        return null;
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    checkStatus({ numberPhone: values.numberPhone });
  };

  return (
    <Box h="screen">
      <AdminHeader />
      <Stack gap={48} justify="center" align="stretch" h={"100%"}>
        <Flex h="70%">
          <Card p={28} withBorder w="100%" radius="lg">
            <Stack
              w="100%"
              h="100%"
              justify="center"
              align="center"
              gap={40}
              my={48}
            >
              <Image src="/assets/logo.png" alt="logo" maw={360} />
              <Text c="brand.9" size="xl" fw="bold" ta="center" maw={400}>
                {home?.event_name}
              </Text>

              <Center>
                <Stack justify="center" align="center" gap={40}>
                  <Paper bg="teal.1" p="lg" radius={12}>
                    <Text
                      c="orange.8"
                      size="xl"
                      fw="bolder"
                      ta="center"
                      tt="uppercase"
                    >
                      CEK STATUS KELOLOSAN ANDA SEKARANG!
                    </Text>
                    <Text
                      c="teal.8"
                      size="xl"
                      fw="bolder"
                      ta="center"
                      tt="uppercase"
                    >
                      MASUKKAN NOMOR HP YANG ANDA GUNAKAN SAAT MENGISI FORMULIR
                      PENDAFTARAN
                    </Text>
                    <Text
                      c="orange.8"
                      size="xl"
                      fw="bolder"
                      ta="center"
                      tt="uppercase"
                    >
                      CERMATI PETUNJUK YANG TERTERA!
                    </Text>
                  </Paper>
                  <TextInput
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    placeholder="No Hp:08123456789"
                    error={form.errors.numberPhone}
                    key={form.key("numberPhone")}
                    {...form.getInputProps("numberPhone")}
                  />
                  <Button
                    variant="filled"
                    color="brand.9"
                    size="lg"
                    radius="xl"
                    fullWidth={false}
                    onClick={() => {
                      form.onSubmit(handleSubmit)();
                    }}
                  >
                    CEK STATUS KELOLOSAN
                  </Button>
                </Stack>
              </Center>
            </Stack>
          </Card>
        </Flex>
      </Stack>
    </Box>
  );
}
