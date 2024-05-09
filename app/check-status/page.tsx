"use client";

import { useCheckStatus } from "@/hooks/useCheckStatus";
import { useGetEvent } from "@/hooks/useGetEvent";
import { Link } from "@/libs/router-event";
import { CheckStatusPayload } from "@/services/announcement/announcement";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  em,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function CheckResult() {
  const { event, isPastDate } = useGetEvent();
  const home = event?.data;
  const { checkStatus } = useCheckStatus(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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
        const regex = /^08\d{7,10}$/;
        if (!regex.test(value)) {
          return "Nomor telepon tidak valid";
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
      <Grid>
        <Grid.Col
          span={6}
          h="100vh"
          style={{
            display: `${isMobile ? "none" : "block"}`,
          }}
        >
          {home?.desktop_photo ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE}${home?.desktop_photo}`}
              alt="hero"
              h={"100%"}
            />
          ) : (
            <Box h={"100%"} bg="gray" />
          )}
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 6} px={24} pt={24}>
          <Stack gap={48} justify="center" align="stretch" h={"100%"}>
            <Flex justify="space-between" w="100%" mb={24}>
              <Text size="xl" c="brand.9">
                GARUDA NUSA
              </Text>
              <ActionIcon
                variant="transparent"
                color="brand.9"
                component={Link}
                href="/login"
              >
                <IconUserCircle />
              </ActionIcon>
            </Flex>
            <Flex h={isMobile ? "80%" : "70%"}>
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
                          MASUKKAN NOMOR HP YANG ANDA GUNAKAN SAAT MENGISI
                          FORMULIR PENDAFTARAN
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
                        fullWidth={isMobile}
                        disabled={!isPastDate}
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
            <Center>
              <Text maw={400} ta="center" fw="bold" c="brand.9" tt="uppercase">
                {home?.header_footer_name} © {dayjs().format("YYYY")}
              </Text>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
