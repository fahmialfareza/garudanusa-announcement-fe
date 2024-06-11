"use client";

import HomeFooter from "@/components/HomeFooter";
import { useCheckStatus } from "@/hooks/useCheckStatus";
import { useGetEvent } from "@/hooks/useGetEvent";
import { Link } from "@/libs/router-event";
import { CheckStatusPayload } from "@/services/announcement/announcement";
import {
  ActionIcon,
  Affix,
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
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandWhatsapp, IconUserCircle } from "@tabler/icons-react";

export default function CheckResult() {
  const { event, isPastDate } = useGetEvent(true);
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
        return null;
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    checkStatus({ numberPhone: values.numberPhone });
  };

  return (
    <Grid p={0} m={0}>
      <Grid.Col
        span={6}
        py={0}
        my={0}
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
      <Grid.Col span={isMobile ? 12 : 6} maw="100vh" px={rem(24)} py={0} my={0}>
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            variant="filled"
            color="green.5"
            radius="xl"
            size={60}
            component={Link}
            href="https://wa.me/+6285815330595"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp size={48} />
          </ActionIcon>
        </Affix>
        <Stack justify="space-around" align="stretch">
          <Flex justify="space-between" w="100%" mb={rem(24)} mt={rem(24)}>
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
          <Flex h="88%">
            <Card p={28} withBorder w="100%" radius="lg">
              <Stack
                w="100%"
                h="100%"
                justify="space-between"
                align="center"
                gap={rem(40)}
              >
                <Flex justify="space-between" w="100%">
                  <Image
                    src="/assets/logo.png"
                    alt="logo"
                    maw={isMobile ? 150 : 200}
                    fit="contain"
                  />
                  {home?.mobile_photo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE}${home?.mobile_photo}`}
                      alt="Logo Kegiatan"
                      maw={isMobile ? 120 : 200}
                      fit="contain"
                    />
                  ) : (
                    <Box h={"100%"} maw={100} bg="gray" />
                  )}
                </Flex>
                <Text c="brand.9" size="xl" fw="bold" ta="center" maw={400}>
                  {home?.event_name}
                </Text>

                <Center>
                  <Stack justify="center" align="center" gap={rem(40)}>
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
                <HomeFooter headerFooterName={home?.header_footer_name} />
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
